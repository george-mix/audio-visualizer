import { createI18n } from 'vue-i18n'
import enMessages from './locales/en.json'

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: enMessages
  }
})
