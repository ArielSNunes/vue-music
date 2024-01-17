import { createI18n } from "vue-i18n"
import en from '@/locales/en.json'
import ptBr from '@/locales/pt-br.json'

export const i18n = createI18n({
    locale: 'pt-br',
    fallbackLocale: 'en',
    messages: {
        en,
        'pt-br': ptBr
    }
})