import { createRouter, createWebHistory } from "vue-router"
import { useUserStore } from "@/stores/users"

const HomeView = () => import('@/views/HomeView.vue')
const AboutView = () =>  import("@/views/AboutView.vue")
const ManageView = () =>  import("@/views/ManageView.vue")
const SongView = () =>  import("@/views/SongView.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
      name: "home",
    },
    {
      path: "/about",
      component: AboutView,
      name: "about"
    },
    {
      path: "/manage-music",
      name: "manage",
      component: ManageView,
      // alias: ["/manage"],
      // beforeEnter: (to, from, next) => {
      //   console.log("manage route guard")
      //   next()
      // },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/manage",
      redirect: {
        name: "manage"
      }
    },
    {
      name: "song",
      path: "/song/:id",
      component: SongView
    },
    {
      path: "/:catchAll(.*)*",
      redirect: {
        name: "home"
      }
    }
  ],
  linkExactActiveClass: "text-yellow-500"
})

router.beforeEach(
  (to, from, next) => {
    if (!to.meta.requiresAuth) {
      return next()
    }

    const store = useUserStore()
    if (!store.userLoggedIn) {
      return this.$router.push({ name: "home" })
    }
    return next()
  }
)

export default router
