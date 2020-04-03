export const sleep = (timeout = 1000) =>
  new Promise(resolve => setTimeout(resolve, timeout));
