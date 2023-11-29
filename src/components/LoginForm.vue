<script>
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
    login(values, event) {
      this.loginShowAlert = true
      this.loginInSubmission = true
      this.loginAlertVariant = "bg-blue-500"
      this.loginAlertMessage = "Please wait! We are logging you in."

      this.loginAlertVariant = "bg-green-500"
      this.loginAlertMessage = "Success! Your account has been created."
      console.log(values)
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