<script>
import { db } from "@/includes/firebase"
import { Database } from "@/services/Database"
import SongItem from "@/components/SongItem.vue"
import { mapActions, mapState } from "pinia"
import { useSongsStore } from "@/stores/songs"
import { IconSecondaryDirective } from '@/directives/iconSecondary'

export default {
  name: "HomeView",
  components: { SongItem },
  directives: {
    'icon-secondary': IconSecondaryDirective
  },
  data() {
    return {
      database: new Database(db),
      maxPerPage: 5,
      pendingRequest: false,
      lastResultWasEmpty: false
    }
  },
  computed: {
    ...mapState(useSongsStore, ["songs"])
  },
  async created() {
    this.clearSongs()
    await this.getSongs()

    window.addEventListener("scroll", _ => {
      this.handleScroll()
    })
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll)
  },
  methods: {
    ...mapActions(useSongsStore, ["clearSongs", "addSong", "getLastSong"]),
    async handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement
      const { innerHeight } = window

      const reachedBottom = (Math.round(scrollTop) + innerHeight) === offsetHeight

      if (!reachedBottom) {
        return
      }

      this.getSongs()
    },
    async getSongs() {
      // Verifica se está em request ou se o anterior não retornou
      if (this.pendingRequest || this.lastResultWasEmpty) {
        return
      }

      // Altera para em request
      this.pendingRequest = true

      // Captura a última música
      const lastSong = this.getLastSong()

      // Captura o id da última música
      const lastId = lastSong?.docID ?? null

      // Busca as novas músicas
      const songs = await this.database.listAllSongs(this.maxPerPage, lastId)

      // Altera a variável com a quantidade de registros
      this.lastResultWasEmpty = songs.docs.length <= 0

      // Adiciona as músicas na request
      songs.forEach(song => this.addSong({ docID: song.id, ...song.data() }))

      // Altera o status de em request
      this.pendingRequest = false
    }
  }
}
</script>

<template>
  <main>

    <section class="mb-8 py-20 text-white text-center relative">
      <div class="absolute inset-0 w-full h-full bg-contain introduction-bg"
        style="background-image: url(assets/img/header.png)"></div>
      <div class="container mx-auto">
        <div class="text-white main-header-content">
          <h1 class="font-bold text-5xl mb-5">Listen to Great Music!</h1>
          <p class="w-full md:w-8/12 mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            et dolor mollis, congue augue non, venenatis elit. Nunc justo eros,
            suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna
            pulvinar, fringilla lorem eget, ullamcorper urna.
          </p>
        </div>
      </div>

      <img class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full" src="/assets/img/introduction-music.png" />
    </section>
    <!-- Main Content -->
    <section class="container mx-auto">
      <div class="bg-white rounded border border-gray-200 relative flex flex-col">
        <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200"
          v-icon-secondary="{ icon: 'headphones-alt', right: true }">
          <span class="card-title">Songs</span>
        </div>
        <!-- Playlist -->
        <ol id="playlist">
          <song-item v-for="song in songs" :key="song.docID" :song="song" />
        </ol>
        <!-- .. end Playlist -->
      </div>
    </section>
  </main>
</template>
