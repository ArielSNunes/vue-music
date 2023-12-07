import { createRouter, createWebHistory } from "vue-router"
import HomeView from "@/views/HomeView.vue"
import AboutView from "@/views/AboutView.vue"
import ManageView from "@/views/ManageView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: HomeView,
      name: "home"
    },
    {
      path: "/about",
      component: AboutView,
      name: "about"
    },
    {
      path: "/manage-music",
      name: "manage",
      component: ManageView
    },
    {
      path: "/manage",
      redirect: { name: 'manage' }
    }
  ],
  linkExactActiveClass: "text-yellow-500"
})

export default router
