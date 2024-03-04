const cronValidator = require('cron-validator');

function convetTimeIST(cronExpression) {
  const utcTimestamp = cronExpression;

  // Create a Date object from the UTC timestamp
  const utcDate = new Date(utcTimestamp);

  // Convert to IST (Indian Standard Time)
  utcDate.setMinutes(utcDate.getMinutes() + 330); // UTC to IST offset is 5 hours and 30 minutes

  // Extract components of the IST date
  const month = utcDate.getUTCMonth() + 1;
  const day = utcDate.getUTCDate();
  const hour = utcDate.getUTCHours();
  const minute = utcDate.getUTCMinutes();

  // Format the cron expression
  cronExpression = `${minute} ${hour} ${day} ${month} *`;
  console.log("cronExpression", cronExpression);
  return cronExpression
}

const validateAndTransformCronExpression = (cronExpression) => {
  cronExpression = convetTimeIST(cronExpression);
  if (!cronValidator.isValidCron(cronExpression)) {
    throw new Error('Invalid cron expression');
  }

  return cronExpression;
};

module.exports = {
  validateAndTransformCronExpression,
};