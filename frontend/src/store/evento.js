export const createEvent = (type, payload) => {
  return { type, ...payload };
};
