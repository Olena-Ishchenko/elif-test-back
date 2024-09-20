import { model, Schema } from 'mongoose';

const participantsSchema = new Schema({
  event_id: {
    type: Schema.Types.ObjectId,
    ref: 'events',
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateofbirth: {
    type: Date,
    required: true,
  },
  radio: {
    type: String,
    required: true,
  },
});

export const ParticipantsCollection = model('participants', participantsSchema);
