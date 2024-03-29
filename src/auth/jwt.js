import jwt from 'koa-jwt'
import jsonwebtoken from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const SECRET = process.env.SECRET
const jwtInstance = jwt({ secret: SECRET })

function JWTErrorHandler(ctx, next) {
    return next().catch((err) => {
        if (err.status == 401) {
            ctx.status = 401
            ctx.body = {
                "error": "Not authorized"
            }
        } else {
            throw err
        }
    })
}

module.exports.jwt = () => jwtInstance
module.exports.errorHandler = () => JWTErrorHandler
module.exports.issueJwtToken = (payload) => {
    return jsonwebtoken.sign(payload, SECRET)
}