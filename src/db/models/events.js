import { model, Schema } from 'mongoose';

const eventsSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  event_date: {
    type: Date,
    require: true,
  },
  organizer: {
    type: String,
    require: true,
  },
});

export const EventsCollection = model('events', eventsSchema);
