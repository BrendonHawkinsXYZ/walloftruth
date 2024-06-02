const router = require("express").Router();
const rateLimit = require("express-rate-limit");
const MessagesController = require("../controllers/message.controller");
const { calculateRetryAfter } = require("../utils/time");

const apiRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1,
  handler: (req, res) => {
    const resetTime = req.rateLimit.resetTime.getTime();
    const retryAfter = calculateRetryAfter(resetTime);
    res.status(429).json({
      message: `Please try again after ${retryAfter} minutes`,
    });
  },
  keyGenerator: (req) => {
    return req.ip;
  },
});

router.route("/getMessages").get(MessagesController.getMessages);
router
  .route("/submitMessage")
  .post(apiRateLimit, MessagesController.submitMessage);

module.exports = router;
