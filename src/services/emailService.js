const cron = require('node-cron')
const nodemailer = require('nodemailer')
const config = require('../../config')
const cronUtils = require('../utils/cronUtils')
const Email = require('../models/Email')

// Create a new transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: config.email.smtp.host,
  port: config.email.smtp.port,
  secure: false,
  auth: {
    user: config.email.smtp.username,
    pass: config.email.smtp.password
  }
})

// Set up the email options
const sendEmail = async (options, userId) => {
  try {
    const info = await transporter.sendMail(options)
    console.log('Email sent with info', info)
  } catch (error) {
    console.error('Error sending email:', error)
    // Handle the error, e.g., mark the email as failed in the database
    const newEmail = await Email.findByIdAndUpdate(
      {
        _id: userId
      },
      {
        status: 'failed'
      }
    )
    await newEmail.save()
    throw new Error('Error sending email')
  }
}

const url_taskMap = {}

const scheduleEmail = async emailData => {
  const newEmail = new Email(emailData)
  newEmail.cronExpression = cronUtils.validateAndTransformCronExpression(
    emailData.cronExpression
  )
  await newEmail.save()
  // Schedule the email
  const task = cron.schedule(newEmail.cronExpression, async () => {
    const emailOptions = {
      from: config.email.sender,
      to: newEmail.to,
      subject: newEmail.subject,
      text: newEmail.body
    }
    console.log('task', task)
    url_taskMap['url'] = task
    await sendEmail(emailOptions, newEmail._id)
  })

  return newEmail
}

const listScheduledEmails = async () => {
  const scheduledEmails = await Email.find()
  if (!scheduledEmails) {
    throw new Error('data not found')
  }
  return scheduledEmails
}

const getScheduledEmail = async id => {
  const userData = await Email.findById({
    _id: id
  })
  if (!userData) {
    throw new Error('data not found')
  }
  return userData
}

const getFailedScheduledEmail = async () => {
  const userData = await Email.find({
    status: 'failed'
  })
  if (!userData) {
    throw new Error('data not found')
  }
  return userData
}

const rescheduleEmail = async (id, newCronExpression) => {
  const data = await Email.findById({
    _id: id
  })
  if (!data) {
    throw new Error('data not found')
  }
  // Unschedule the previous cron job
  let my_job = url_taskMap['url']
  my_job.stop()

  // Update the cron expression and reschedule the email
  data.cronExpression =
    cronUtils.validateAndTransformCronExpression(newCronExpression)
  const task = cron.schedule(data.cronExpression, async () => {
    const emailOptions = {
      from: config.email.smtp.sender,
      to: data.to,
      subject: data.subject,
      text: data.body
    }
    url_taskMap['url'] = task
    await sendEmail(emailOptions, data._id)
  })
  // save the updated data in database
  await data.save()
  return data
}

//Delete data
const unscheduleEmail = async id => {
  const data = await Email.findById({
    _id: id
  })
  if (!data) {
    throw new Error('data not found')
  }
  // Unschedule the cron job
  let my_job = url_taskMap['url']
  my_job.stop()
  const del = await Email.findByIdAndDelete({
    _id: id
  })
  console.log(del)
}

module.exports = {
  scheduleEmail,
  listScheduledEmails,
  getScheduledEmail,
  getFailedScheduledEmail,
  rescheduleEmail,
  unscheduleEmail
}
