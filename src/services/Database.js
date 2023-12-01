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
   * @param {UserDbData} data
   * @returns {Promise<void>}
   */
  addItemToCollection = async (collection, data) => {
    return await this.db.collection(collection).doc(data.id)
        .set(data)
  }
  
  /**
   * Método responsável por adicionar o usuário na base
   *
   * @param {UserDbData} data
   * @returns {Promise<void>}
   */
  addUser = async (data) => {
    return await this.addItemToCollection("users", {
      ...data,
      createdAt: new Date(),
      updatedAt: null
    })
  }
}
