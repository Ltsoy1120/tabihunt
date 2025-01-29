"use client"

import { I18nextProvider } from "react-i18next"
import initTranslations from "@/app/i18n"
import { createInstance } from "i18next"

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}) {
  const i18nInstance = createInstance()

  initTranslations({ locale, namespaces, i18nInstance, resources })

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>
}
