const calculateRetryAfter = (resetTime) => {
  const now = Date.now();
  const retryAfter = Math.ceil((resetTime - now) / 60000);
  return retryAfter > 0 ? retryAfter : 1;
};

module.exports = { calculateRetryAfter };
