<script>
import { Auth } from "@/services/Auth"
import { auth, db } from "@/includes/firebase"
import { Database } from "@/services/Database"

export default {
  name: "RegisterForm",
  data() {
    return {
      tab: "login",
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|email",
        age: "required|min_value:18|max_value:100",
        password: "required|min:9|max:100|not_in:password",
        confirmPassword: "passwords_mismatch:@password",
        country: "required|country_not_in:Antarctica",
        tos: "tos"
      },
      userData: {
        country: "USA",
        age: 29
      },
      registrationInSubmission: false,
      registrationShowAlert: false,
      registrationAlertVariant: "bg-blue-500",
      registrationAlertMessage: "Please wait! Your account is being created."
    }
  },
  methods: {
    async register(values, event) {
      this.registrationShowAlert = true
      this.registrationInSubmission = true
      this.registrationAlertVariant = "bg-blue-500"
      this.registrationAlertMessage = "Please wait! Your account is being created."
      
      const registration = new Auth(auth)
      const database = new Database(db)
      
      try {
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
        
        this.registrationInSubmission = true
        this.registrationAlertVariant = "bg-green-500"
        this.registrationAlertMessage = "Success! Your account has been created."
      } catch (error) {
        this.registrationInSubmission = false
        this.registrationAlertVariant = "bg-red-500"
        this.registrationAlertMessage = "An unexpected error occured. Please try again later."
      }
    }
  }
}
</script>

<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    :class="registrationAlertVariant"
    v-if="registrationShowAlert">
    {{ registrationAlertMessage }}
  </div>
  <vee-form
    :validation-schema="schema"
    @submit="register"
    :initial-values="userData">
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <vee-field
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
        name="name"
      />
      <ErrorMessage class="text-red-600" name="name" />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <vee-field
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-600" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <vee-field
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage class="text-red-600" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <vee-field
        name="password"
        ref="password"
        :bails="false"
        v-slot="{ field, errors }"
      >
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          placeholder="Password" v-bind="field"
        />
        <div class="text-red-600">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <vee-field
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
        name="confirmPassword"
      />
      <ErrorMessage class="text-red-600" name="confirmPassword" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <vee-field
        name="country"
        as="select"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage class="text-red-600" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        type="checkbox"
        name="tos"
        id="tos"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
        value="1"
      />
      <label class="inline-block" for="tos">Accept terms of service</label>
      <br>
      <ErrorMessage class="text-red-600" name="tos" />
    </div>
    <button
      type="submit"
      :disabled="registrationInSubmission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      Submit
    </button>
  </vee-form>
</template>

<style scoped>

</style>