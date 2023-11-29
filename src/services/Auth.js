/**
 * Classe responsável pelo processo de login e cadastro
 */
export class Auth {
  /**
   *
   * @param {firebase.auth.Auth} auth
   */
  constructor(auth) {
    this.auth = auth
  }
  
  /**
   * @typedef UserData
   * @type {object}
   * @property {string} email
   * @property {string} password
   *
   * @param {UserData} userData
   * @returns {firebase.auth.UserCredential}
   */
  registerUser = async (userData) => {
    return await this.auth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
    )
  }
}