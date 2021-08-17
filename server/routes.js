const router = require('express').Router();
const controller = require('./controllers');

// Connects request received by server to the controller
router.get('/reviews', controller.reviews.get);
router.get('/reviews/meta', controller.meta.get);
