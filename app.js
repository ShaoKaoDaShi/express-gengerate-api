require('./db/index')
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var jwt = require('jsonwebtoken')
const cookie = require('cookie')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var loginRouter = require('./routes/login')
var menuListRouter = require('./routes/menu')
var rrwebEvents = require('./routes/rrwebEvents.js')

var User = require('./db/Model/user')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(async function (req, res, next) {
  if (req.url === '/user/register' || req.url === '/user/login') {
    return next()
  }
  const cookies = cookie.parse(req.headers.cookie)
  console.log(`cookies["access_token"]: ${cookies['access_token']}`)
  try {
    await new Promise((resolve, reject) => {
      jwt.verify(cookies['access_token'], 'gigibo', function (err, decoded) {
        if (err) {
          reject(err)
          /*
            err = {
              name: 'TokenExpiredError',
              message: 'jwt expired',
              expiredAt: 1408621000
            }
          */
        }
        resolve(decoded)
      })
    })
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      //过期解析不出来
      // console.log("decoded"+ decoded)
      console.log('decoded err' + err)
      const users = await User.find({ username: cookies.username })
      const { username, password, id } = users[0]
      const newToken = jwt.sign({ username, password, id }, 'gigibo', { expiresIn: 6 })
      res.cookie('access_token', newToken)
      next()
    } else {
      console.log(err)
      throw new Error(err)
    }
  }
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
