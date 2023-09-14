import dbConnect from './db'
import createError from 'http-errors'
import express, { Request, Response, NextFunction } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import jwt, { VerifyErrors } from 'jsonwebtoken'

interface CustomError extends Error {
    status?: number
}

import indexRouter from './routes/index'
import usersRouter from './routes/users'
import menuListRouter from './routes/menu'
import rrwebEvents from './routes/rrwebEvents'
import rrwebProjects from './routes/rrwebProjects'

// var User = require('./db/Model/user')
import User from './db/Model/user'

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
    const cookies = req.cookies as Record<string, string>
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
    } catch (err: any) {
        if (err.name === 'TokenExpiredError') {
            //过期解析不出来
            // console.log("decoded"+ decoded)
            console.log('decoded err' + err)
            const user = await User.findOne({ username: cookies.username })
            if (user) {
                const { username, password, id } = user
                const newToken = jwt.sign({ username, password, id }, 'gigibo', { expiresIn: 60 * 60 * 24 * 7 })
                res.cookie('access_token', newToken)
            }
            next()
        } else {
            console.log(err)
            throw new Error(err)
        }
    }
})

app.use('/', indexRouter)
app.use('/user', usersRouter)
app.use('/menuList', menuListRouter)
app.use('/rrweb', rrwebEvents)
app.use('/rrwebProjects', rrwebProjects)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err: CustomError, req: Request, res: Response, next: NextFunction): void {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

async function main() {
    await dbConnect()
    const PORT = 3001
    app.listen(PORT, () => {
        console.log('server is running on port ', PORT)
    })
}

main()

module.exports = app
