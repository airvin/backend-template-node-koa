import mongoose from 'mongoose'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

//load environment variables
dotenv.config()
const secret = process.env.SECRET

const UserSchema = new mongoose.Schema({
    username: {type: String, lowercase: true, match: [/^[a-zA-Z0-9]+$/, 'Username is invalid'], index: true},
    firstname: {type: String, match: [/^[a-zA-Z]+$/, 'Firstname is invalid'], index: true},
    lastname: {type: String, match: [/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*+$/, 'Lastname is invalid'], index: true},
    email: {type: String, required: [true, "Email can't be blank"], match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email is invalid'], index: true},
    bio: String, 
    image: String, 
    hash: {type: String, required: [true, "Password hash can't be blank"], match: [/^[a-fA-F0-9-]+$/, 'Hash is invalid'], index: true},
    salt: {type: String, required: [true, "Salt can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'Salt is invalid'], index: true},
}, {timestamps: true})

UserSchema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')

}

UserSchema.methods.generateJWT = () => {
    let today = new Date()
    let exp = new Date(today)
    exp.setDate(today.getDate() + 60)

    return jwt.sign({
        id: this._id,
        email: this.email,
        exp: partseInt(exp.getTime()/1000)
    }, secret)
}

UserSchema.methods.toAuthJSON = () => {
    return {
        username: this.username,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        token: this.generateJWT(),
        bio: this.bio,
        image: this.image
    }
}
mongoose.model('User', UserSchema)