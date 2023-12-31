import "./assets/main.css"

import { createApp } from "vue"
import { createPinia } from "pinia"
import VeeValidatePlugin from "@/includes/validation"
import { auth } from "@/includes/firebase"

import App from "./App.vue"
import router from "./router"

let app
// Método para o firebase iniciar a autenticação antes do app
auth.onAuthStateChanged(() => {
	// Caso já exista o app, não inicia novamente
	if (app) return;

	// Inicia o app corretamente
	app = createApp(App)

	app.use(createPinia())
	app.use(router)
	app.use(VeeValidatePlugin, { foo: 100 })

	app.mount("#app")
})
