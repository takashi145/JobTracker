import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  steps: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'steps',
  }]
});

export default mongoose.models.eventSchema || mongoose.model('events', eventSchema);
