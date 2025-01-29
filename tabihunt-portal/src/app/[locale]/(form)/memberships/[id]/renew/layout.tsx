import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/components/TranslationsProvider"

export default async function RenewMembershipLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { resources } = await initTranslations({
    locale,
    namespaces: ["memberships", "common"]
  })
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["memberships", "common"]}
    >
      {children}
    </TranslationsProvider>
  )
}
