import KoaRouter from 'koa-router'

const router = new KoaRouter()

router.get('/', async (ctx) => {
    let name = ctx.request.query.name || "World"
    ctx.body = { message: `Hello ${name}!` }
})

router.post("/", async (ctx) => {
    let name = ctx.request.body.name || "World"
    ctx.body = { message: `Hello ${name}!` }
})

export default router