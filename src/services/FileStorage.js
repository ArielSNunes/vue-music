/**
 * @typedef FileMeta
 * @type {object}
 * @property {string} directory
 *
 * @typedef FileDirMeta
 * @type {object}
 * @property {string} category
 * @property {string} filename
 */
/**
 * Classe responsável por gerenciar o armazenamento de arquivos no firebase
 */
export class FileStorage {
  /**
   * @param {firebase.storage.Storage} storage
   */
  constructor(storage) {
    this.storage = storage

    this.directories = {
      songs: "songs"
    }
  }

  /**
   * Cria o caminho do diretório
   *
   * @param {FileDirMeta} params
   */
  createDirPath = ({ category, filename }) => {
    return [this.getDirectory(category), filename].join("/")
  }

  /**
   * Captura o diretório
   * @param {string} type
   * @returns {string}
   */
  getDirectory = (type) => {
    return this.directories[type] ?? type
  }

  /**
   * Faz o upload do arquivo
   *
   * @param {File} file
   * @param {FileMeta} fileMeta
   * @returns {firebase.storage.UploadTask}
   */
  uploadFile = (file, fileMeta) => {
    // Cria a referência do storage
    const ref = this.storage.ref()

    // Cria a referência das músicas dentro do storage
    const songsRef = ref.child(fileMeta.directory)

    // Inicia o envio
    return songsRef.put(file)
  }
}
