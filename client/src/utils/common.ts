export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const range = (size: number) =>
  Array.from({ length: size }, (x, i) => i);

export const randBetween = (a: number, b: number) =>
  Math.floor(Math.random() * b) + a;
