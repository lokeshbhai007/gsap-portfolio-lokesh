import mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number, 
      required: true
    },
    accuracy: {
      type: Number,
      required: true
    },
    timestamp: {
      type: Number,
      required: true
    },
    user: {
      type: String,
      required: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 900 // 15 minutes expiry
  }
});

export default mongoose.models.Location || mongoose.model('Location', LocationSchema);