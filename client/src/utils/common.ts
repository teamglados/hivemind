export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const range = (size: number) =>
  Array.from({ length: size }, (x, i) => i);

export const randBetween = (a: number, b: number) =>
  Math.floor(Math.random() * b) + a;

export const truncate = (str: string, len: number) => {
  if (str.length > len) return `${str.substring(0, len - 3)}...`;
  return str;
};
