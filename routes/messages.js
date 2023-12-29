const express = require('express');
const router = express.Router();

// Maximum number of messages to keep
const MAX_MESSAGES = 30;

// Store messages in memory (replace with a database in a real application)
let messages = [];

router.get('/', (req, res) => {
  res.render('messages', { messages: addTimestampsAndNames(messages) });
});

router.post('/send', (req, res) => {
  const { message } = req.body;
  const timestampedMessage = `${getCurrentTime()} - Anonymous: ${message}`;

  // Add the new message
  messages.push(timestampedMessage);

  // Check if the number of messages exceeds the maximum
  if (messages.length > MAX_MESSAGES) {
    // Trim the array to the maximum allowed
    messages = messages.slice(-MAX_MESSAGES);
  }

  res.redirect('/messages');
});

function addTimestampsAndNames(messages) {
  return messages.map(message => {
    const timestamp = message.split(' - ')[0];
    const restOfMessage = message.split(' - ').slice(1).join(' - ');
    if (!timestamp) {
      return `${getCurrentTime()} - ${restOfMessage}`;
    }
    return message;
  });
}

function getCurrentTime() {
  const now = new Date();
  const date = now.toLocaleDateString('en-US');
  const time = now.toLocaleTimeString('en-US', { hour12: false });
  return `${date} ${time}`;
}

module.exports = router;
