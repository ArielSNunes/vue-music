<script>
import AppHeader from "@/components/AppHeader.vue"
import AppAuth from "@/components/AppAuth.vue"
import AppPlayer from "./components/AppPlayer.vue"
import { mapWritableState } from "pinia"
import { useUserStore } from "@/stores/users"
import { auth } from "@/includes/firebase"

export default {
  name: "App",
  components: {
    AppHeader,
    AppAuth,
    AppPlayer
  },
  computed: {
    ...mapWritableState(useUserStore, ["userLoggedIn"])
  },
  created() {
    if (auth.currentUser) {
      this.userLoggedIn = true
    }
  }
}
</script>

<template>
  <app-header></app-header>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
  <app-player></app-player>
  <app-auth></app-auth>
</template>

<style scoped></style>
