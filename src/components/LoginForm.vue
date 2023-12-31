<script>
import { mapActions } from "pinia"
import { useUserStore } from "@/stores/users"
import { Redirect } from "@/services/Redirect"

const redirect = new Redirect()

export default {
  name: "LoginForm",
  data() {
    return {
      loginSchema: {
        email: "required|email",
        password: "required|min:9|max:100",
      },
      userData: {
        country: "USA",
        age: 29
      },
      loginInSubmission: false,
      loginShowAlert: false,
      loginAlertVariant: "bg-blue-500",
      loginAlertMessage: "Please wait! We are logging you in."
    }
  },
  methods: {
    ...mapActions(useUserStore, {
      loginUser: "authenticate"
    }),
    async login(values, event) {
      this.loginShowAlert = true
      this.loginInSubmission = true
      this.loginAlertVariant = "bg-blue-500"
      this.loginAlertMessage = "Please wait! We are logging you in."

      try {
        await this.loginUser(values)
        this.loginInSubmission = true
        this.loginAlertVariant = "bg-green-500"
        this.loginAlertMessage = "Login Successful!"
        redirect.reload()
      } catch (error) {
        this.loginInSubmission = false
        this.loginAlertVariant = "bg-red-500"
        this.loginAlertMessage = "Invalid login details."
      }
    }
  }
}
</script>

<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    :class="loginAlertVariant"
    v-if="loginShowAlert">
    {{ loginAlertMessage }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
      <ErrorMessage class="text-red-600" name="password" />
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="loginInSubmission"
    >
      Submit
    </button>
  </vee-form>
</template>

<style scoped>

</style>
