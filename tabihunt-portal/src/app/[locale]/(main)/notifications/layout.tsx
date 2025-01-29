import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/components/TranslationsProvider"

export default async function NotifictionsLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { resources } = await initTranslations({
    locale,
    namespaces: ["notifications", "common"]
  })
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["notifications", "common"]}
    >
      {children}
    </TranslationsProvider>
  )
}
