import { defineRule, ErrorMessage, Field, Form } from "vee-validate"
import { required } from "@vee-validate/rules"

export default {
  install(vueAppInstance, options) {
    vueAppInstance.component("VeeForm", Form)
    vueAppInstance.component("VeeField", Field)
    vueAppInstance.component("ErrorMessage", ErrorMessage)

    defineRule("required", required)
  }
}