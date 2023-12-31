import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import AboutView from "@/views/AboutView.vue"
import ManageView from "@/views/ManageView.vue"
import { useUserStore } from "@/stores/users"

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
