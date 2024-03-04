const config = {
    server: {
      port: process.env.PORT || 3000,
    },
    database: {
      url: process.env.DATABASE_URL,
    },
    email: {
      sender: process.env.EMAIL_SENDER,
      smtp: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        username: process.env.USER_NAME,
        password: process.env.APP_PASSWORD,
      },
    },
  };
  
  module.exports = config;
  