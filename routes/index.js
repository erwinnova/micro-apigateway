const usersRouter = require('./users');
const coursesRouter = require('./courses');
const mediaRouter = require('./media');
const ordersRouter = require('./orders');
const paymentsRouter = require('./payments');
const refreshTokensRouter = require('./refreshTokens')

module.exports = {
  usersRouter,
  coursesRouter,
  mediaRouter,
  ordersRouter,
  paymentsRouter,
  refreshTokensRouter
};
