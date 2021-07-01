export const db = {
  counter: {
    get: () => 8,
  },
};
export const ports = {
  db,
};
export type Ports = typeof ports;
