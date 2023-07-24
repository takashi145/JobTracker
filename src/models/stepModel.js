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
  deadline: Date,
  status: Number,
  description: String,
});


const model = mongoose.models.steps || mongoose.model("steps", stepSchema);

export default model;