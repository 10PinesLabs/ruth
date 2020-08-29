import { publishEventType } from '../epics/Evento';

export const createEvent = (type, payload) => ({
  type: publishEventType,
  payload: { type, ...payload },
});
