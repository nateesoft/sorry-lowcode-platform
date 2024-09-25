export const env = () => {
  const { REACT_APP_DEBUG: DEBUG = 'false', NODE_ENV } = process.env;
  return { NODE_ENV, DEBUG };
};
