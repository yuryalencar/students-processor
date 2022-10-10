const errorNotFile = JSON.stringify({ error: "You not send a file" });
const errorSendQueue = JSON.stringify({ error: "An problem has ocurred to send file to queue" });
const errorNotStudentKey = JSON.stringify({ error: "You file not is sended using students name" });

module.exports = {
  errorNotFile,
  errorNotStudentKey,
  errorSendQueue
};