export const generateRequestId = () => {
  return Math.random().toString(36).slice(2);
};
