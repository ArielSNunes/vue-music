import "./assets/main.css"
import 'nprogress/nprogress.css'

import { createApp } from "vue"
import { createPinia } from "pinia"
import VeeValidatePlugin from "@/includes/validation"
import { auth } from "@/includes/firebase"
import { IconDirective } from "@/directives/icon"
import { registerSW } from "virtual:pwa-register"
import GlobalComponents from '@/includes/_globals'

registerSW({ immediate: true });

import App from "./App.vue"
import router from "./router"
import { i18n } from "./includes/i18n"
import progressBar from "./includes/progress-bar"

let app

progressBar(router)

// Método para o firebase iniciar a autenticação antes do app
auth.onAuthStateChanged(() => {
	// Caso já exista o app, não inicia novamente
	if (app) return;

	// Inicia o app corretamente
	app = createApp(App)

	app.use(createPinia())
	app.use(router)
	app.use(VeeValidatePlugin, { foo: 100 })
	app.use(i18n)
	app.use(GlobalComponents)
	app.directive('icon', IconDirective)
	
	app.mount("#app")
})
