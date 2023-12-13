/**
 * @typedef FileHandlerConstruct
 * @type {object}
 * @property {FileStorage} storage
 * @property {object} uploadProgressStore
 */

/**
 * Classe para gerenciar os arquivos
 */
export class FileHandler {
  /**
   * @param {FileHandlerConstruct} params
   */
  constructor(params) {
    this.mimeTypes = {
      musics: [
        "audio/mpeg"
      ]
    }

    this.progressStore = params.uploadProgressStore
    this.storage = params.storage
  }

  /**
   * Método responsável por gerenciar o evento de arrastar e soltar
   *
   * @param {DragEvent} e
   *
   * @returns {File[]}
   */
  handleDragUpload = (e) => {
    e.preventDefault()
    const { files } = e.dataTransfer
    return [...files]
  }

  /**
   * Verifica se é música
   *
   * @param {File} file
   * @return {boolean}
   */
  isMusic = (file) => {
    return this.mimeTypes.musics.includes(file.type)
  }

  /**
   * Metódo fazer o upload das músicas
   *
   * @param {File[]} files
   * @param {Function} callback
   * @returns {Promise<void>}
   */
  uploadMusics = async (files, callback) => {
    for await (let file of files) {
      if (!this.isMusic(file)) return
      const directory = this.storage.createDirPath({
        category: "songs",
        filename: file.name
      })
      const { task } = await this.storage.uploadFile(file, { directory })

      this.#addFileToProgress({
        task,
        currentProgress: 0,
        name: file.name
      })
      console.log(task)
      task.on("state_changed", this.#handleUploadStateChange)
    }
  }

  #addFileToProgress = (props) => {
    this.progressStore.addUpload(props)
  }

  /**
   * Método responsável por gerenciar a alteração de status da task
   * @param snapshot
   * @returns {Promise<void>}
   */
  #handleUploadStateChange = async (snapshot) => {
  }
}
