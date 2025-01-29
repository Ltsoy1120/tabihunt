import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/components/TranslationsProvider"

export default async function MeReportsLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { resources } = await initTranslations({
    locale,
    namespaces: ["reports", "common"]
  })
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["reports", "common"]}
    >
      {children}
    </TranslationsProvider>
  )
}
