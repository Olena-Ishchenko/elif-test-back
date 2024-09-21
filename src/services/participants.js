import { ParticipantsCollection } from '../db/models/participants.js';

export const createParticipants = async (payload) => {
  const participant = await ParticipantsCollection.create(payload);
  return participant;
};

export const getParticipants = async (eventId) => {
  const participants = await ParticipantsCollection.find({ event_id: eventId });

  return participants;
};
