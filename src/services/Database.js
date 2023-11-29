export class Database {
  /**
   *
   * @param {firebase.firestore.Firestore} db
   */
  constructor(db) {
    this.db = db
  }
  
  /**
   * Método responsável por adicionar um dado à uma collection
   *
   * @param collection
   * @param data
   * @returns {Promise<void>}
   */
  addItemToCollection = async (collection, data) => {
    return await this.db.collection(collection).add(data)
  }
  
  addUser = async (data) => {
    return await this.addItemToCollection("users", {
      ...data,
      createdAt: new Date(),
      updatedAt: null
    })
  }
}