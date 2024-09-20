import { ParticipantsCollection } from '../db/models/participants.js';

export const createParticipants = async (payload) => {
  const participant = await ParticipantsCollection.create(payload);
  return participant;
};

export const getParticipants = async (eventId) => {
  const participants = await ParticipantsCollection.find({ event_id: eventId });
  //   const filterParticipant = participants.filter(
  //     (participant) => participant.event_id === eventId,
  //   );
  console.log(participants);
  return participants;
};
