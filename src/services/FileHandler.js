/**
 * @typedef FileHandlerConstruct
 * @type {object}
 * @property {FileStorage} storage
 * @property {object} uploadProgressStore
 * @property {Database} db
 * @property {firebase.auth.Auth} auth
 */

/**
 * Classe para gerenciar os arquivos
 */
export class FileHandler {
  /**
   * @param {FileHandlerConstruct} params
   */
  constructor({
    uploadProgressStore,
    storage,
    db,
    auth
  }) {
    this.mimeTypes = {
      musics: [
        "audio/mpeg"
      ]
    }

    this.progressStore = uploadProgressStore
    this.storage = storage
    this.db = db
    this.auth = auth
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
    // Verifica se tem dataTransfer (arrastar e soltar)
    if (e.dataTransfer) {
      const { files } = e.dataTransfer
      return [...files]
    }
    return [...e.target.files]
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
   * @param {?Function} callback
   * @returns {Promise<void>}
   */
  uploadMusics = async (files, callback = null) => {
    // Itera sobre os arquivos
    for (let file of files) {
      // Verifica se é um tipo inválido e retorna
      if (!this.isMusic(file)) return

      // Cria o caminho do arquivo a ser armazenado
      const directory = this.storage.createDirPath({
        category: "songs",
        filename: file.name
      })

      // Inicia a tarefa de enviar o arquivo
      const task = this.storage.uploadFile(file, { directory })

      // Adiciona o item na store reativa e captura seu índice
      const uploadIndex = this.#addFileToProgress({
        task,
        currentProgress: 0,
        name: file.name,
        variant: "bg-blue-400",
        icon: "fas fa-spinner fa-spin",
        textColor: ""
      })

      // Adiciona o evento para atualizar o progresso
      task.on(
        "state_changed",
        (snapshot) => this.#handleUploadStateChange(uploadIndex, snapshot),
        (err) => this.#handleUploadError(uploadIndex, err),
        () => this.#handleUploadSuccess(uploadIndex, task)
      )
    }
  }

  /**
   * Adiciona um arquivo à store
   *
   * @param {AddUploadProps} props
   * @returns {number}
   */
  #addFileToProgress = (props) => {
    return this.progressStore.addUpload(props)
  }

  /**
   * Método responsável por gerenciar a alteração de status da task
   * @param {number} uploadIndex
   * @param snapshot
   * @returns {Promise<void>}
   */
  #handleUploadStateChange = (uploadIndex, snapshot) => {
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    this.progressStore.updateUploadProgress(uploadIndex, progress)
  }

  /**
   * Método responsável por gerenciar o erro do upload
   *
   * @param {number} uploadIndex
   * @param {firebase.storage.FirebaseStorageError} error
   */
  #handleUploadError = (uploadIndex, error) => {
    this.progressStore.updateVariantData(uploadIndex, {
      variant: "bg-red-400",
      icon: "fas fa-times",
      textColor: "text-red-400"
    })
  }

  /**
   * Método responsável por gerenciar o sucesso no upload
   *
   * @param {number} uploadIndex
   * @param {firebase.storage.UploadTask} task
   */
  #handleUploadSuccess = async (uploadIndex, task) => {
    // Cria o objeto para salvar na base
    const song = {
      userId: this.auth.currentUser.uid,
      displayName: this.auth.currentUser.displayName,
      originalName: task.snapshot.ref.name,
      modifiedName: task.snapshot.ref.name,
      genre: "",
      commentCount: 0,
    }
    // Adiciona a URL
    song.url = await task.snapshot.ref.getDownloadURL()

    // Salva o dado
    await this.db.addSong(song)

    // AAtualiza o progresso
    this.progressStore.updateVariantData(uploadIndex, {
      variant: "bg-green-400",
      icon: "fas fa-check",
      textColor: "text-green-400"
    })
  }
}
