'use strict';
import Koa from 'koa'
import koaBodyparser from 'koa-bodyparser'
import koaLogger from 'koa-logger'
import mongoose from 'mongoose'
import { router, securedRouter } from './routes/index'

// Get port from environment or set to default
var port = process.env.PORT || '3000'

//connect to mongo
mongoose.Promise = global.Promise
const mongoDB = 'mongodb://127.0.0.1/my_database'
mongoose.connect(mongoDB, { useNewUrlParser: true }, err => {
    if (!err) {
        console.log("MongoDB connected!");
    }
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// Close the mongo connection on kill app signal
process.on('SIGINT', function () {
    console.log("Closing MongoDB connection...");
    mongoose.connection.close();
    console.log("MongoDB disconnected on app termination");
    process.exit(0);
});

// set up koa router
const app = new Koa()

app.use(koaBodyparser())
app.use(koaLogger())

app.use(router.routes(), router.allowedMethods())
app.use(securedRouter.routes(), securedRouter.allowedMethods())

app.listen(port, () => console.log(`Listening on port ${port}`))
