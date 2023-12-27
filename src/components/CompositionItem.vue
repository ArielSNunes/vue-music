<script>
import { Database } from "@/services/Database"
import { db, storage } from "@/includes/firebase"
import { mapActions } from "pinia"
import { useSongsStore } from "@/stores/songs"
import { FileStorage } from "@/services/FileStorage"

export default {
  name: "CompositionItem",
  props: {
    song: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showForm: false,
      schema: {
        modifiedName: "required",
        genre: "alpha_spaces"
      },
      inSubmission: false,
      showAlert: false,
      alertVariant: "bg-blue-500",
      alertMessage: "Please wait! Updating song info.",
      database: new Database(db),
      storage: new FileStorage(storage)
    }
  },
  methods: {
    ...mapActions(useSongsStore, {
      updateSongState: "updateSong",
      deleteSong: "removeSong"
    }),
    async removeSong() {
      try {
        const { docId, originalName } = this.song
        const directory = this.storage.createDirPath({
          category: "songs",
          filename: originalName
        })
        await this.database.deleteSong(docId)
        await this.storage.deleteFile(originalName, { directory })
        this.deleteSong(docId)
      } catch (e) {

      }
    },
    async updateSong({ modifiedName, genre }) {
      this.inSubmission = true
      this.showAlert = true
      this.alertVariant = "bg-blue-500"
      this.alertMessage = "Please wait! Updating song info."

      try {
        const newSongData = {
          modifiedName,
          genre
        }
        await this.database.updateSong(this.song.docId, newSongData)
        this.updateSongState(this.song.docId, newSongData)
        this.inSubmission = false
        this.alertVariant = "bg-green-500"
        this.alertMessage = "Success!"
        setTimeout(() => {
          this.showForm = false
        }, 1000)
      } catch (e) {
        console.log(e)
        this.inSubmission = false
        this.alertVariant = "bg-red-500"
        this.alertMessage = "Something went wrong! Try again later."
        return
      }
    }
  }
}
</script>

<template>
  <div class="border border-gray-200 p-3 mb-4 rounded">
    <div v-show="!showForm">
      <h4 class="inline-block text-2xl font-bold">
        {{ song.modifiedName }}
      </h4>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-red-600 float-right"
        @click.prevent="removeSong"
      >
        <i class="fa fa-times"></i>
      </button>
      <button
        class="ml-1 py-1 px-2 text-sm rounded text-white bg-blue-600 float-right"
        @click.prevent="showForm = !showForm"
      >
        <i class="fa fa-pencil-alt"></i>
      </button>
    </div>
    <div v-show="showForm">
      <div class="text-white text-center font-black p-4 mb-4" v-if="showAlert" :class="alertVariant">
        {{ alertMessage }}
      </div>
      <vee-form :validation-schema="schema" :initial-values="song" @submit="updateSong">
        <div class="mb-3">
          <label class="inline-block mb-2">Song Title</label>
          <vee-field
            name="modifiedName"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Song Title"
          />
          <error-message class="text-red-600" name="modifiedName" />
        </div>
        <div class="mb-3">
          <label class="inline-block mb-2">Genre</label>
          <vee-field
            name="genre"
            type="text"
            class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
            placeholder="Enter Genre"
          />
          <error-message class="text-red-600" name="genre" />
        </div>
        <button
          type="submit"
          class="py-1.5 px-3 rounded text-white bg-green-600 hover:bg-green-700 mr-3"
          :disabled="inSubmission"
        >
          Submit
        </button>
        <button
          type="button"
          class="py-1.5 px-3 rounded text-white bg-red-400 hover:bg-red-600"
          @click.prevent="showForm = false"
          :disabled="inSubmission"
        >
          Go Back
        </button>
      </vee-form>
    </div>
  </div>
</template>

<style scoped>

</style>
