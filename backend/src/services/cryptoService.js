import Crypto from '../models/crypto.model.js';
import CryptoHistory from '../models/cryptoHistory.model.js';
import axios from 'axios';
import moment from 'moment';

const processData = data => {
  let prices = data.prices;
  if (!prices || prices.length === 0) {
    throw new Error('Aucune donnée de prix disponible');
  }

  let opening = prices[0][1];
  let closing = prices[prices.length - 1][1];
  let highest = opening;
  let lowest = opening;

  prices.forEach(([_, price]) => {
    if (price > highest) highest = price;
    if (price < lowest) lowest = price;
  });

  return {
    opening,
    highest,
    lowest,
    closing,
  };
};

const cryptoService = {
  getCryptos: async cmids => {
    let query = {};
    if (cmids) {
      query.cmid = { $in: cmids.split(',') };
    }
    const cryptos = await Crypto.find(query);
    return cryptos;
  },

  getCryptoById: async cmid => {
    const crypto = await Crypto.findOne({ cmid: cmid });
    return crypto;
  },

  getCryptoHistory: async (cmid, period) => {
    let from,
      to = moment().unix();
    switch (period) {
      case 'daily':
        from = moment().subtract(90, 'days').unix();
        break;
      case 'hourly':
        from = moment().subtract(48, 'hours').unix();
        break;
      case 'minute':
        from = moment().subtract(2, 'hours').unix();
        break;
      default:
        throw new Error('Période spécifiée invalide');
    }

    const history = await CryptoHistory.findOne({ cmid, period });
    const currentTime = new Date();

    const elapsedTime = history ? currentTime - history.lastUpdated : Infinity;
    const maxDuration = period === 'minute' ? 5 * 60000 : 60 * 60000;

    if (history && elapsedTime < maxDuration) {
      console.log('Récupération des données depuis la base de données');
      return history.data;
    }

    const url = `https://api.coingecko.com/api/v3/coins/${cmid}/market_chart/range?vs_currency=eur&from=${from}&to=${to}`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      const processedData = processData(data);

      await CryptoHistory.findOneAndUpdate(
        { cmid, period },
        { data: processedData, lastUpdated: new Date() },
        { upsert: true }
      );

      return processedData;
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des données historiques:',
        error
      );
      throw error;
    }
  },

  addCrypto: async cryptoData => {
    const crypto = new Crypto(cryptoData);
    await crypto.save();
    return crypto;
  },

  deleteCrypto: async cmid => {
    const crypto = await Crypto.findOneAndDelete({ cmid: cmid });
    return crypto;
  },
};

export default cryptoService;
