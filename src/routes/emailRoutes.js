const express = require('express');
const router = express.Router();
const {
    scheduleEmail,
    listScheduledEmails,
    rescheduleEmail,
    unscheduleEmail,
    getUserData,
    getFailedData
} = require('../controllers/emailController.js');

// Define routes
router.post('/', scheduleEmail);
router.get('/', listScheduledEmails);
router.get('/failed', getFailedData);
router.get('/:id', getUserData);
router.put('/:id', rescheduleEmail);
router.delete('/:id', unscheduleEmail);

module.exports = router;