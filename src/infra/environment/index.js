require('dotenv').config()

const env = {
  PORT: process.env.PORT ?? 3000,
  AMQP_URL: process.env.AMQP_URL ?? 'amqp://localhost:5673'
}

module.exports = env;