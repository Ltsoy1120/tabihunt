import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/components/TranslationsProvider"
import { isMobileDevice } from "@/libs/responsive"
import ClientWrapper from "./ClientWrapper"

export default async function NewAccountLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { resources } = await initTranslations({
    locale,
    namespaces: ["account", "common"]
  })

  const mobile = isMobileDevice()
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["account", "common"]}
    >
      <ClientWrapper isMobile={mobile}>{children}</ClientWrapper>
    </TranslationsProvider>
  )
}
