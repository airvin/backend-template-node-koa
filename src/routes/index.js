import KoaRouter from 'koa-router'
import koaJwt from 'koa-jwt'
import jwt from '../auth/jwt'

// unsecured router
export const router = async (app) => {
    const router = new KoaRouter()

    router.get('/', async (ctx) => {
        let name = ctx.request.query.name || "World"
        ctx.body = { message: `Hello ${name}!` }
    })

    router.get('/register', async (ctx) => {
        ctx.body = { message: "Please enter your details" }
    })

    router.post('/register', async (ctx) => {
        const firstname = ctx.request.body.firstname
        const lastname = ctx.request.body.lastname
        const email = ctx.request.body.email
        const hash = ctx.request.body.hash

        const dbUser = await app.users.find({ "email": email }).toArray()

        if (dbUser.length === 0) {
            app.users.insertOne({ "firstname": firstname, "lastname": lastname, "email": email, "hash": hash })
            ctx.body = { message: `Email ${email} successfully registered` }
        } else {
            ctx.status = 409
            ctx.body = { error: "Email already registered" }
        }
    })

    router.get('/login', async (ctx) => {
        ctx.body = { message: "Please enter your username and password" }
    })

    router.post('/login', async (ctx) => {
        let email = ctx.request.body.email
        let hash = ctx.request.body.hash
        const dbUser = await app.users.find({ "email": email }).toArray()
        console.log(dbUser[0].hash)
        console.log(hash)
        if (dbUser[0] && dbUser[0].hash === hash) {
            ctx.body = {
                token: jwt.issueJwtToken({
                    user: "user",
                    role: "admin"
                })
            }
        } else {
            ctx.status = 401
            ctx.body = { error: "Invalid username and password" }
        }
    })

    app.use(router.routes(), router.allowedMethods())
}

// router secured by jwt
export const securedRouter = (app) => {
    const securedRouter = new KoaRouter()

    securedRouter.use(jwt.errorHandler()).use(jwt.jwt())

    securedRouter.get('/hello', async (ctx) => {
        let name = ctx.request.query.name || "World"
        ctx.body = { message: `Hello ${name}!` }
    })

    securedRouter.post("/", async (ctx) => {
        let name = ctx.request.body.name || "World"
        ctx.body = { message: `Hello ${name}!` }
    })

    app.use(securedRouter.routes(), securedRouter.allowedMethods())
}