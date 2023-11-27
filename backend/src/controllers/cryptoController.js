import cryptoService from '../services/cryptoService';

const cryptoController = {
  getCryptos: async (req, res) => {
    try {
      const cryptos = await cryptoService.getCryptos(req.query.cmids);
      res.status(200).json(cryptos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default cryptoController;
