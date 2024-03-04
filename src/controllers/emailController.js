const emailService = require('../services/emailService');

const scheduleEmail = async (req, res) => {
  try {
    const emailData = req.body;
    const scheduledEmail = await emailService.scheduleEmail(emailData);
    res.status(201).json(scheduledEmail);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

const listScheduledEmails = async (req, res) => {
  try {
    console.log("list all data")
    const scheduledEmails = await emailService.listScheduledEmails();
    res.status(200).json(scheduledEmails);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

const getUserData = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const scheduledEmails = await emailService.getScheduledEmail(id);
    res.status(200).json(scheduledEmails);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

const getFailedData = async (req, res) => {
  try {
    console.log("getFailedData");
    const getFailedscheduledEmails = await emailService.getFailedScheduledEmail();
    res.status(200).json(getFailedscheduledEmails);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};
const rescheduleEmail = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    console.log("controller", id);
    const newCronExpression = req.body.newCronExpression;
    const updatedEmail = await emailService.rescheduleEmail(id, newCronExpression);
    res.status(200).json(updatedEmail);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

const unscheduleEmail = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    await emailService.unscheduleEmail(id);
    console.log("deleted")
    res.status(204).json({
      message: "Scheduled user has been removed"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error'
    });
  }
};

module.exports = {
  scheduleEmail,
  listScheduledEmails,
  getUserData,
  getFailedData,
  rescheduleEmail,
  unscheduleEmail,
};