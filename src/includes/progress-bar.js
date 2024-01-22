import nprogress from "nprogress"

export default (router) => {
    router.beforeEach((to, from, next) => {
        nprogress.start()
        next()
    })
    router.afterEach(nprogress.done)
}