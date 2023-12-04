/**
 * @typedef UserData
 * @type {object}
 * @property {string} email
 * @property {string} password
 *
 * @typedef UserProfile
 * @type {object}
 * @property {string} name
 */

/**
 * Classe responsável pelo processo de login e cadastro
 */
export class Auth {
  /**
   * @param {firebase.auth.Auth} auth
   */
  constructor(auth) {
    this.auth = auth
  }

  /**
   * Método responsável por registrar o usuário na auth do firebase, via email
   * e senha
   *
   * @param {UserData} userData
   * @returns {firebase.auth.UserCredential}
   */
  registerUser = async (userData) => {
    // Retorna o registro do usuário
    return await this.auth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
    )
  }

  /**
   * Método responsável por atualizar o perfil do usuário no firebase
   *
   * @param {firebase.auth.UserCredential} userCredentials
   * @param {UserProfile} userProfile
   * @returns {Promise<void>}
   */
  updateProfile = async (
      userCredentials,
      userProfile
  ) => {
    return await userCredentials.user.updateProfile({
      displayName: userProfile.name
    })
  }

  /**
   * Método responsável pelo login do usuário via e-mail
   * @param {UserData} userData
   * @returns {Promise<firebase.auth.UserCredential>}
   */
  login = async ({ email, password }) => {
    return await this.auth.signInWithEmailAndPassword(email, password)
  }
}
