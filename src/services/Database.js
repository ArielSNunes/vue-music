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
 *
 * @typedef SongUpdateDate
 * @type {object}
 * @property {string} modifiedName
 * @property {string} genre
 * @property {Date} createdAt
 *
 * @typedef CommentCreateData
 * @type {object}
 * @property {string} comment
 * @property {string} songID
 * @property {string} name
 * @property {string} uid
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
   * @returns {Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>}
   */
  #addItemToCollection = async (collection, data) => {
    const docRef = await this.db.collection(collection).doc(data.id)
    await docRef.set(data)
    return docRef
  }

  #updateItem = async (collection, id, data) => {
    const docCollection = await this.db.collection(collection)
    const doc = await docCollection.doc(id)
    return await doc.update(data)
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
   * Método responsável por adicionar os campos updatedAt no objeto
   * @param {object} data
   * @returns {object}
   */
  #basicUpdateData = (data) => {
    return {
      ...data,
      updatedAt: new Date()
    }
  }
  /**
   * Método responsável por adicionar o usuário na base
   *
   * @param {UserDbData} data
   * @returns {Promise<void>}
   */
  addUser = async (data) => {
    return await this.#addItemToCollection(
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
    return await this.#addItemToCollection(
      "songs",
      this.#basicCreateData(data)
    )
  }

  /**
   *
   * Método responsável por listar os arquivos do usuário
   *
   * @param {string} userId
   *
   * @return {Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>}
   */
  listUserSongs = async (userId) => {
    return await this.db.collection("songs")
      .where("userId", "==", userId)
      .get()
  }

  /**
   * Método responsável por atualizar a música
   * @param {string} songId
   * @param {SongUpdateDate} data
   * @return {Promise<void>}
   */
  updateSong = async (songId, data) => {
    const updateData = this.#basicUpdateData(data)
    return await this.#updateItem("songs", songId, updateData)
  }

  /**
   * Delete a música
   * @param {string} songId
   * @return {Promise<void>}
   */
  deleteSong = async (songId) => {
    const fileRef = await this.db.collection("songs").doc(songId)
    return await fileRef.delete()
  }

  getDocById = async (docId) => {
    return await this.db.collection("songs").doc(docId).get()
  }

  /**
   * Lista todas as músicas, paginadas
   * @param {number} maxPerPage
   * @param {string} lastDocId
   * @return {Promise<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>}
   */
  listAllSongs = async (maxPerPage, lastDocId) => {
    let songsQuery = this.db.collection("songs")
      .orderBy("createdAt")

    if (lastDocId) {
      const lastDoc = await this.getDocById(lastDocId)
      songsQuery = songsQuery.startAfter(lastDoc)
    }

    return await songsQuery
      .limit(maxPerPage)
      .get()
  }

  /**
   * Método responsável por cadastrar o comentário na base
   * @param {CommentCreateData} commentObject
   * @return {Promise<firebase.firestore.DocumentReference<firebase.firestore.DocumentData>>}
   */
  createComment = async (commentObject) => {
    const createObject = this.#basicCreateData(commentObject)
    return await this.#addItemToCollection("comments", createObject)
  }
}
