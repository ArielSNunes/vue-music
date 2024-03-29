<script>
import { FileHandler } from "@/services/FileHandler"
import { auth, db as database, storage as firebaseStorage } from "@/includes/firebase"
import { FileStorage } from "@/services/FileStorage"
import { useUploadProgressStore } from "@/stores/uploadProgress"
import { mapActions, mapState } from "pinia"
import { Database } from "@/services/Database"
import { useSongsStore } from "@/stores/songs"

export default {
  name: "Upload",
  data() {
    return {
      isDragover: false
    }
  },
  computed: {
    ...mapState(useUploadProgressStore, ["uploads", "progress"])
  },
  mounted() {
    // Ao entrar na página, reseta o state de uploads
    this.resetProgress()
  },
  methods: {
    ...mapActions(useUploadProgressStore, ["resetProgress"]),
    removeDrag(e) {
      this.isDragover = false
    },
    addDrag(e) {
      this.isDragover = true
    },
    async upload(e) {
      // Usa a store de progresso
      const uploadProgressStore = useUploadProgressStore()

      const songsStore = useSongsStore()

      // Cria o storage
      const storage = new FileStorage(firebaseStorage)

      // Cria o DB
      const db = new Database(database)

      // Cria o gerenciamento de arquivos
      const fileHandler = new FileHandler({
        storage,
        uploadProgressStore,
        db,
        auth,
        songsStore
      })

      // Captura os arquivos
      const files = fileHandler.handleDragUpload(e)

      if (!navigator.onLine) {
        files.forEach(file => {
          uploadProgressStore.addUpload({
            currentProgress: '100',
            task: {},
            variant: 'bg-red-400',
            textColor: 'text-red-400',
            icon: 'fas fa-times',
            name: file.name
          })
        })
        return
      }
      // Faz o envio dos arquivos
      await fileHandler.uploadMusics(files);

      // Altera o state
      this.isDragover = false
    }
  }
}
</script>

<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{
          'bg-green-400 border-green-400 border-solid': isDragover
        }" @drag.prevent.stop="" @dragstart.prevent.stop="" @dragend.prevent.stop="removeDrag"
        @dragover.prevent.stop="addDrag" @dragenter.prevent.stop="addDrag" @dragleave.prevent.stop="removeDrag"
        @drop.prevent.stop="upload">
        <h5>Drop your files here</h5>
      </div>
      <input type="file" multiple @change="upload" />
      <hr class="my-6" />
      <!-- Progress Bars -->
      <div class="mb-4" v-for="upload in uploads" :key="upload.name">
        <!-- File Name -->
        <div class="font-bold text-sm" :class="upload.textColor">
          <i :class="upload.icon"></i>
          {{ upload.name }}
        </div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div class="transition-all progress-bar bg-blue-400" :style="{ width: `${upload.currentProgress}%` }"
            :class="upload.variant"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
