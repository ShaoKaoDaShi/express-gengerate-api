require('./db/index')
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var jwt = require('jsonwebtoken')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var loginRouter = require('./routes/login')
var menuListRouter = require('./routes/menu')
var rrwebEvents = require('./routes/rrwebEvents.js')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
  if (req.url === '/user/register' || req.url === '/user/login') {
    return next()
  }
  const token = req.headers.authorization
  console.log(token)
  jwt.verify(token, 'gigibo', function (err, decoded) {
    if (err) {
      /*
        err = {
          name: 'TokenExpiredError',
          message: 'jwt expired',
          expiredAt: 1408621000
        }
      */
      if (err.name === 'TokenExpiredError') {
        const newToken = jwt.sign(decoded, 'gigibo', { expiresIn: '1h' })
        res.cookie('Authorization', newToken).cookie('access_token', newToken)
        next()
      } else {
        console.log(err)
        throw new Error(err)
      }
    }
    next()
  })
})

app.use('/', indexRouter)
app.use('/user', usersRouter)
app.use('/login', loginRouter)
app.use('/menuList', menuListRouter)
app.use('/rrweb', rrwebEvents)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})
app.listen(3001)

module.exports = app
