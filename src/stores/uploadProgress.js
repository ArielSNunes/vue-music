/**
 * @typedef AddUploadProps
 * @type {object}
 * @property {firebase.storage.UploadTask} task
 * @property {number} currentProgress
 * @property {string} name
 * @property {string} variant
 * @property {string} icon
 * @property {string} textColor
 */
import { defineStore } from "pinia"

export const useUploadProgressStore = defineStore("uploadProgress", {
  state: () => ({
    uploads: [],
    progress: 0,
    unsavedItems: false
  }),
  actions: {
    /**
     * Método responsável por resetar os uploads (reseta o estado)
     */
    resetProgress() {
      this.uploads = []
      this.progress = 0
    },
    /**
     * Método responsável por cancelar os uploads
     */
    cancelUploads() {
      this.uploads.forEach(upload => {
        upload.task.cancel()
      })
    },
    /**
     * Método responsável por adicionar um item na lista de uploads
     * @param {AddUploadProps} props
     * @returns {number}
     */
    addUpload(props) {
      return this.uploads.push(props) - 1
    },
    /**
     * Método responsável por atualizar o progresso do upload
     *
     * @param {number} index
     * @param {number} progress
     */
    updateUploadProgress(index, progress) {
      this.uploads[index].currentProgress = progress
    },
    /**
     * Método responsável por atualizar alguns dados dos objetos
     * @param {number} index
     * @param {object} data
     */
    updateVariantData(index, data) {
      this.uploads[index] = {
        ...this.uploads[index],
        ...data
      }
    },
    setAllSaved() {
      this.unsavedItems = false
    },
    setAtLeastOneUnsaved() {
      this.unsavedItems = true
    }
  }
})
