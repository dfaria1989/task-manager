export const configuration = () => {
  return {
    environment: process.env.NODE_ENV,
    port: process.env.PORT,
    jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtAccessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    database: {
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      name: process.env.DB_DATABASE,
    },
  };
};
