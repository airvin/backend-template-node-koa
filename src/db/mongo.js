
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const mongo = async (app) => {
    // Load the environment variables into process.env
    dotenv.config()

    //connect to mongo
    mongoose.Promise = global.Promise
    const mongoDB = process.env.MONGODB_URL
    mongoose.connect(mongoDB, { useNewUrlParser: true }, err => {
        if (!err) {
            console.log("MongoDB connected!");
        }
    })
    const db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))

    app.users = await db.collection("users")

    // await app.users.insertOne({ "name": "jake" })
    // const users = await app.users.find().toArray()
    // console.log(`Users: ${users[0].name}`)

    // Close the mongo connection on kill app signal
    process.on('SIGINT', function () {
        console.log("Closing MongoDB connection...");
        mongoose.connection.close();
        console.log("MongoDB disconnected on app termination");
        process.exit(0);
    });
}

export default mongo