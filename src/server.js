import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllEvents, getEventById } from './services/events.js';
import {
  createParticipants,
  getParticipants,
} from './services/participants.js';
import { parsePaginationParams } from './utils/parsePaginationParams.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/events', async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);

    const events = await getAllEvents({ page, perPage });
    res.status(200).json({ data: events });
  });

  app.get('/events/:eventId', async (req, res) => {
    const { eventId } = req.params;
    const event = await getEventById(eventId);
    if (!event) {
      res.status(404).json({ message: 'event not found' });
      return;
    }
    res.status(200).json({ data: event });
  });

  app.post('/participants', async (req, res) => {
    const participant = await createParticipants(req.body);
    res.status(201).json({
      status: 201,
      message: `Successfully created a participant!`,
      data: participant,
    });
  });

  app.get('/participants', async (req, res) => {
    const { eventId } = req.query;
    const eventParticipants = await getParticipants(eventId);
    if (!eventParticipants) {
      res.status(404).json({ message: 'participants not found' });
      return;
    }
    res.status(200).json({ data: eventParticipants });
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on  ${PORT}`);
  });
};
