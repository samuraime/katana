export const noop = () => {};

export const delay = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
