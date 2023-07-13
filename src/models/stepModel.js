import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'users',
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'events',
  },
  name: String,
  order: Number,
  deadline: Date,
  status: String,
  description: String,
});


export default mongoose.models.stepSchema || mongoose.model('steps', stepSchema);
