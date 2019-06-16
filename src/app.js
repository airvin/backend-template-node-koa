'use strict';
import Koa from 'koa'
import koaBodyparser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import { router, securedRouter } from './routes/index'
import dotenv from 'dotenv'
import mongo from './db/mongo'
import passport from 'koa-passport'
import session from 'koa-session'

// Get port from environment or set to default
dotenv.config()
const PORT = process.env.PORT || '3000'

// set up koa
const app = new Koa()

// connect MongoDB (MongoDB must be running before attempting to connect)
mongo(app)

// body parser
app.use(koaBodyparser())

// logger
app.use(koaLogger())

// sessions
app.keys = [process.env.SECRET]
app.use(session(app))

// authentication
app.use(passport.initialize())
app.use(passport.session())

// set up routes
router(app)
securedRouter(app)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
