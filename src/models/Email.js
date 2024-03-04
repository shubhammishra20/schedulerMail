const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  cronExpression: {
    type: String,
    required: true,
  },
  cronJob: {
    type: mongoose.Schema.Types.Mixed, // Use Mixed type to store any type of data
    default: null, // Default value is null
  },
  status: {
    type: String
  }
});

const Email = mongoose.model('Schedulemail', emailSchema);

module.exports = Email;

// {
//   "to": "shubhcoradius@gmail.com",
//   "subject": "Test Email Subject",
//   "body": "Hello, this is the content of the email. It can include plain text or HTML.",
//   "cronExpression": "55 10 * * *"
// },


// {
//   "newCronExpression": "08 12 * * *"
// }