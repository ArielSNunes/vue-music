/**
 * @typedef RegisterParams
 * @type {object}
 * @property {string} name
 * @property {string} email
 * @property {number} age
 * @property {string} password
 * @property {string} confirmPassword
 * @property {string} country
 * @property {?string} tos
 *
 * @typedef LoginParams
 * @type {object}
 * @property {string} name
 * @property {string} password
 */

import { defineStore } from "pinia"
import { Auth } from "@/services/Auth"
import { auth, db } from "@/includes/firebase"
import { Database } from "@/services/Database"

// Cria a instância das classes Auth e Database
const registration = new Auth(auth)
const database = new Database(db)

export const useUserStore = defineStore("user", {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    /**
     * @param {LoginParams} values
     * @returns {Promise<firebase.auth.UserCredential>}
     */
    async authenticate(values) {
      // Do login with email and password
      return await registration.login(values)
    },
    /**
     * @param {RegisterParams} values
     * @returns {Promise<void>}
     */
    async register(values) {
      // Cria o usuário na base de Auth
      const userCredentials = await registration.registerUser({
        email: values.email,
        password: values.password
      })

      // Cria o usuário na base de dados
      const userDb = await database.addUser({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country,
        id: userCredentials.user.uid
      })

      // Atualiza os dados do usuário na base de Auth
      const updateProfileResult = await registration.updateProfile(
          userCredentials,
          { name: values.name }
      )

      // Atualiza o status de login
      this.userLoggedIn = true

      // Retorna o usuário
      return userDb
    }
  }
})
