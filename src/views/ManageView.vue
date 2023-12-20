<script>
import Upload from "@/components/Upload.vue"
import MySongs from "@/components/MySongs.vue"
import { useUploadProgressStore } from "@/stores/uploadProgress"

export default {
  name: "ManageView",
  components: { MySongs, Upload },
  beforeRouteLeave: (to, from, next) => {
    const uploadProgressStore = useUploadProgressStore()
    uploadProgressStore.cancelUploads()
    return next()
  },
  beforeRouteEnter: (to, from, next) => {
    const uploadProgressStore = useUploadProgressStore()
    //   const store = useUserStore()
    //   if (!store.userLoggedIn) {
    //     return next({ name: "home" })
    //   }
    uploadProgressStore.resetProgress()
    next()
  }
}
</script>

<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <upload></upload>
      </div>
      <div class="col-span-2">
        <my-songs></my-songs>
      </div>
    </div>
  </section>

  <!-- Player -->
  <div class="fixed bottom-0 left-0 bg-white px-4 py-2 w-full">
    <!-- Track Info -->
    <div class="text-center">
      <span class="song-title font-bold">Song Title</span> by
      <span class="song-artist">Artist</span>
    </div>
    <div class="flex flex-nowrap gap-4 items-center">
      <!-- Play/Pause Button -->
      <button type="button">
        <i class="fa fa-play text-gray-500 text-xl"></i>
      </button>
      <!-- Current Position -->
      <div class="player-currenttime">00:00</div>
      <!-- Scrub Container  -->
      <div class="w-full h-2 rounded bg-gray-200 relative cursor-pointer">
        <!-- Player Ball -->
        <span
          class="absolute -top-2.5 -ml-2.5 text-gray-800 text-lg"
          style="left: 50%"
        >
            <i class="fas fa-circle"></i>
          </span>
        <!-- Player Progress Bar-->
        <span
          class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
          style="width: 50%"
        ></span>
      </div>
      <!-- Duration -->
      <div class="player-duration">03:06</div>
    </div>
  </div>
</template>

<style scoped>

</style>
