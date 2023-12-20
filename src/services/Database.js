/**
 * @typedef UserDbData
 * @type {object}
 * @property {string} name
 * @property {string} email
 * @property {number} age
 * @property {string} country
 * @property {string} id
 * @property {?Date} createdAt
 * @property {?Date} updatedAt
 *
 * @typedef SongDbData
 * @type {object}
 * @property {string} userId
 * @property {string} displayName
 * @property {string} originalName
 * @property {string} modifiedName
 * @property {string} genre
 * @property {number} commentCount
 * @property {string} url
 */

/**
 * Classe responsável por gerenciar o acesso à base de dados
 */
export class Database {
  /**
   * @param {firebase.firestore.Firestore} db
   */
  constructor(db) {
    this.db = db
  }

  /**
   * Método responsável por adicionar um dado a uma collection
   *
   * @param {string} collection
   * @param {object} data
   * @returns {Promise<void>}
   */
  addItemToCollection = async (collection, data) => {
    return await this.db.collection(collection).doc(data.id)
      .set(data)
  }

  /**
   * Método responsável por adicionar os campos createdAt e updatedAt no objeto
   * @param {object} data
   * @returns {object}
   */
  #basicCreateData = (data) => {
    return {
      ...data,
      createdAt: new Date(),
      updatedAt: null
    }
  }

  /**
   * Método responsável por adicionar o usuário na base
   *
   * @param {UserDbData} data
   * @returns {Promise<void>}
   */
  addUser = async (data) => {
    return await this.addItemToCollection(
      "users",
      this.#basicCreateData(data)
    )
  }

  /**
   * Método responsável por salvar o arquivo na base
   *
   * @param {SongDbData} data
   *
   * @returns {Promise<void>}
   */
  addSong = async (data) => {
    return await this.addItemToCollection(
      "songs",
      this.#basicCreateData(data)
    )
  }
}
