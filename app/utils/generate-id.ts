let nextId = 1;

export const generateId = () => {
  return String(nextId++);
};
