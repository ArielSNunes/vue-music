import { defineRule, ErrorMessage, Field, Form } from "vee-validate"
import { alpha_spaces, confirmed, email, max, max_value, min, min_value, required } from "@vee-validate/rules"

export default {
  install(vueAppInstance, options) {
    vueAppInstance.component("VeeForm", Form)
    vueAppInstance.component("VeeField", Field)
    vueAppInstance.component("ErrorMessage", ErrorMessage)

    defineRule("required", required)
    defineRule("min", min)
    defineRule("max", max)
    defineRule("alpha_spaces", alpha_spaces)
    defineRule("email", email)
    defineRule("min_value", min_value)
    defineRule("max_value", max_value)
    defineRule("confirmed", confirmed)
  }
}