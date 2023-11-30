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
 */

import { defineStore } from "pinia"
import { Auth } from "@/services/Auth"
import { auth, db } from "@/includes/firebase"
import { Database } from "@/services/Database"

export const useUserStore = defineStore("user", {
  state: () => ({
    userLoggedIn: false
  }),
  actions: {
    /**
     * @param {RegisterParams} values
     * @returns {Promise<void>}
     */
    async register(values) {
      // Cria a instância das classes Auth e Database
      const registration = new Auth(auth)
      const database = new Database(db)
      
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