import schedule from 'node-schedule';
import axios from 'axios';
import Crypto from '../models/crypto.model.js';
import dotenv from 'dotenv';

dotenv.config();

const fetchCryptoData = async () => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/markets?x_cg_demo_api_key=${process.env.COINGECKO_API_KEY}&vs_currency=eur&order=market_cap_desc&per_page=150&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d&locale=fr&precision=3`
    );
    const cryptos = response.data;
    for (const crypto of cryptos) {
      await Crypto.findOneAndUpdate(
        { cmid: crypto.symbol },
        {
          cmid: crypto.symbol,
          name: crypto.name,
          marketCap: crypto.market_cap,
          marketCapRank: crypto.market_cap_rank,
          currentPrice: crypto.current_price,
          highestPriceOfDay: crypto.high_24h,
          lowestPriceOfDay: crypto.low_24h,
          priceChangePercentage1h:
            crypto.price_change_percentage_1h_in_currency,
          priceChangePercentage24h:
            crypto.price_change_percentage_24h_in_currency,
          priceChangePercentage7d:
            crypto.price_change_percentage_7d_in_currency,
          priceChangePercentage30d:
            crypto.price_change_percentage_30d_in_currency,
          ath: crypto.ath,
          imageUrl: crypto.image,
        },
        { upsert: true }
      );
    }
    console.log('Crypto data fetched');
  } catch (error) {
    console.error(error);
  }
};

schedule.scheduleJob('*/15 * * * *', fetchCryptoData);

export default fetchCryptoData;
