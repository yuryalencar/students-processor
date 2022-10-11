const amqplib = require('amqplib');
const { AMQP_URL } = require('../../environment');

const publish = async ({ exchange, queue, routingKey, message }) => {
  let isPublished = true;

  const connection = await amqplib.connect(AMQP_URL, 'heartbeat=60');
  const channel = await connection.createChannel();
  try {
    await channel.assertExchange(exchange, 'direct', { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);

    isPublished = await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
  } catch (error) {
    isPublished = false;
    console.error('Error in publishing message', error);
  } finally {
    await channel.close();
    await connection.close();
  }

  return isPublished;
}

module.exports = publish;
