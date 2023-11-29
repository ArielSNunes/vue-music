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
      const registration = new Auth(auth)
      const database = new Database(db)
      
      const userCredentials = await registration.registerUser({
        email: values.email,
        password: values.password
      })
      
      const userDb = await database.addUser({
        name: values.name,
        email: values.email,
        age: values.age,
        country: values.country
      })
      
      this.userLoggedIn = true
      
      return userDb
    }
  }
})