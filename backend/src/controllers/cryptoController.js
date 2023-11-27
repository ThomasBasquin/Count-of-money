import cryptoService from '../services/cryptoService.js';

const cryptoController = {
  getList: async (req, res) => {
    try {
      const cryptos = await cryptoService.getCryptos(req.query.cmids);
      res.status(200).json(cryptos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getCryptoById: async (req, res) => {
    try {
      const crypto = await cryptoService.getCryptoById(req.params.cmid);
      res.status(200).json(crypto);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getCryptoHistory: async (req, res) => {
    try {
      const crypto = await cryptoService.getCryptoHistory(
        req.params.cmid,
        req.query.period
      );
      res.status(200).json(crypto);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  addCrypto: async (req, res) => {
    try {
      const crypto = await cryptoService.addCrypto(req.body);
      res.status(201).json(crypto);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  deleteCrypto: async (req, res) => {
    try {
      const crypto = await cryptoService.deleteCrypto(req.params.cmid);
      res.status(200).json(crypto);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default cryptoController;
