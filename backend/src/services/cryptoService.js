const Crypto = require('../models/crypto.model');

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

  getCryptoHistory: async (cmid, period) => {},

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

module.exports = cryptoService;
