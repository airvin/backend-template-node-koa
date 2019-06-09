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

securedRouter.get('/hello', async (ctx) => {
    let name = ctx.request.query.name || "World"
    ctx.body = { message: `Hello ${name}!` }
})

securedRouter.post("/", async (ctx) => {
    let name = ctx.request.body.name || "World"
    ctx.body = { message: `Hello ${name}!` }
})
