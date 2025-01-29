import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/components/TranslationsProvider"
import "./style.scss"

export default async function MeReportsLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { resources } = await initTranslations({
    locale,
    namespaces: ["reports"]
  })
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["reports"]}
    >
      {children}
    </TranslationsProvider>
  )
}
