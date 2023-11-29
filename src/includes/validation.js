import { configure, defineRule, ErrorMessage, Field, Form } from "vee-validate"
import {
  alpha_spaces,
  confirmed,
  email,
  max,
  max_value,
  min,
  min_value,
  not_one_of,
  required
} from "@vee-validate/rules"

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
    defineRule("passwords_mismatch", confirmed)
    defineRule("not_in", not_one_of)
    defineRule("country_not_in", not_one_of)
    defineRule("tos", required)
    
    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min: `The field ${ctx.field} is too short.`,
          max: `The field ${ctx.field} is too long.`,
          alpha_spaces: `The field ${ctx.field} may only contain alphabetical characters and spaces.`,
          email: `The field ${ctx.field} must be a valid e-mail.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high.`,
          not_in: `You are not allowed to use this value for the field ${ctx.field}.`,
          country_not_in: `Due to restrictions, we do not accept users from this location.`,
          passwords_mismatch: "The password don't match",
          tos: "You must accept the terms of service"
        }
        
        return messages[ctx.rule.name] ?? `The field ${ctx.field} is invalid.`
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  }
}