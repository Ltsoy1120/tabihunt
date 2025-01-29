import { createInstance, InitOptions, Resource } from "i18next"
import { initReactI18next } from "react-i18next/initReactI18next"
import resourcesToBackend from "i18next-resources-to-backend"
import i18nConfig from "../../i18nConfig"

type InitTranslationsParams = {
  locale: string
  namespaces: string[]
  i18nInstance?: ReturnType<typeof createInstance> // i18n instance type
  resources?: Resource // Resources type from i18next
}

export default async function initTranslations({
  locale,
  namespaces,
  i18nInstance,
  resources
}: InitTranslationsParams) {
  // If no i18n instance is provided, create a new one
  i18nInstance = i18nInstance || createInstance()

  // Add the react-i18next plugin
  i18nInstance.use(initReactI18next)

  // If resources are not provided, load them dynamically with the backend
  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/locales/${language}/${namespace}.json`)
      )
    )
  }

  // Initialize i18next with the provided options
  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales
  })

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  }
}
