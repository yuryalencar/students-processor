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

    await channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
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

// publish({
//   exchange: 'students.exchange',
//   queue: 'students.save',
//   routingKey: 'save_student',
//   message: { 'id': Math.floor(Math.random() * 1000), 'email': 'user@domail.com', name: 'firstname lastname' }
// }).then(result => console.log(result))