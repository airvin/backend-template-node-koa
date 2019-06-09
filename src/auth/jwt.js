import jwt from 'koa-jwt'

const SECRET = "$UPER$3CRET"
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
