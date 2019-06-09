import KoaRouter from 'koa-router'
import koaJwt from 'koa-jwt'
import jwt from '../auth/jwt'

export const router = new KoaRouter()
export const securedRouter = new KoaRouter()

securedRouter.use(jwt.errorHandler()).use(jwt.jwt())

router.get('/', async (ctx) => {
    let name = ctx.request.query.name || "World"
    ctx.body = { message: `Hello ${name}!` }
})

router.get('/login', async (ctx) => {
    ctx.body = { message: "Please enter your username and password" }
    console.log("enter username and password")
})

router.post('/login', async (ctx) => {
    let username = ctx.request.body.username
    let password = ctx.request.body.password

    if (username === "user" && password === "pwd") {
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

securedRouter.get('/hello', async (ctx) => {
    let name = ctx.request.query.name || "World"
    ctx.body = { message: `Hello ${name}!` }
})

securedRouter.post("/", async (ctx) => {
    let name = ctx.request.body.name || "World"
    ctx.body = { message: `Hello ${name}!` }
})
