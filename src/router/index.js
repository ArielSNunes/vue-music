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
      path: "/manage",
      name: "manage",
      component: ManageView
    }
  ]
})

export default router
