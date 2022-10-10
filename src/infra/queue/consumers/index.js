const amqplib = require('amqplib');
const { AMQP_URL } = require('../../environment');

const options = { noAck: false, consumerTag: 'student_processor' };

const run = async (queue, processor) => {
  const connection = await amqplib.connect(AMQP_URL, "heartbeat=60");
  const channel = await connection.createChannel();
  channel.prefetch(10);

  process.once('SIGINT', async () => {
    await channel.close();
    await connection.close();
    process.exit(0);
  });

  await channel.assertQueue(queue, { durable: true });
  await channel.consume(queue, async (message) => {
    await processor(message);
    await channel.ack(message);
  }, options);

  console.log(" [*] Waiting for messages. To exit press CTRL+C");
};

module.exports = { run };
