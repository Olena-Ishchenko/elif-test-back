import { EventsCollection } from '../db/models/events.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllEvents = async ({ page = 1, perPage = 12 }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const eventsQuery = EventsCollection.find();

  const eventsCount = await EventsCollection.find()
    .merge(eventsQuery)
    .countDocuments();

  const events = await eventsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(eventsCount, perPage, page);

  return {
    data: events,
    ...paginationData,
  };
};

export const getEventById = async (eventId) => {
  const event = await EventsCollection.findById(eventId);
  return event;
};
