const parseEventId = (eventId) => {
  const isString = typeof eventId === 'string';
  if (!isString) return;
  else {
    return eventId;
  }
};

export const parseFilterParams = (query) => {
  const { eventId } = query;

  const parsedEventId = parseEventId(eventId);

  return {
    eventId: parsedEventId,
  };
};
