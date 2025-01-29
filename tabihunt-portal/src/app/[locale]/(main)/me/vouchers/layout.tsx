import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/components/TranslationsProvider"

export default async function MeVouchersLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { resources } = await initTranslations({
    locale,
    namespaces: ["vouchers", "common"]
  })
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["vouchers", "common"]}
    >
      {children}
    </TranslationsProvider>
  )
}
