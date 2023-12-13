/**
 * @typedef AddUploadProps
 * @type {object}
 * @property {firebase.storage.UploadTask} task
 * @property {number} currentProgress
 * @property {string} name
 */
import { defineStore } from "pinia"

export const useUploadProgressStore = defineStore("uploadProgress", {
  state: () => ({
    uploads: [],
    progress: 0
  }),
  actions: {
    /**
     * Método responsável por adicionar um item na lista de uploads
     * @param {AddUploadProps} props
     * @returns {AddUploadProps[]}
     */
    addUpload(props) {
      this.uploads.push(props)
      return this.uploads
    }
  }
})
