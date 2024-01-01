import mongoose from 'mongoose';

const cryptoHistorySchema = new mongoose.Schema({
  cmid: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
    enum: ['minute', 'hourly', 'daily'],
  },
  data: {
    type: Object,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const CryptoHistory = mongoose.model('CryptoHistory', cryptoHistorySchema);

export default CryptoHistory;
