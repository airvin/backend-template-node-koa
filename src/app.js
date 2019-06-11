'use strict';
import Koa from 'koa'
import koaBodyparser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import { router, securedRouter } from './routes/index'
import dotenv from 'dotenv'
import mongo from './db/mongo'

// Get port from environment or set to default
dotenv.config()
const PORT = process.env.PORT || '3000'

// set up koa
const app = new Koa()

// connect MongoDB (MongoDB must be running before attempting to connect)
mongo(app)

app.use(koaBodyparser())
app.use(koaLogger())

app.use(router.routes(), router.allowedMethods())
app.use(securedRouter.routes(), securedRouter.allowedMethods())

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
