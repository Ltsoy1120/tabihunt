import initTranslations from "@/app/i18n"
import Back from "@/components/Back"
import Footer from "@/components/Footer"
import PageHeader from "@/components/headers/PageHeader"
import TranslationsProvider from "@/components/TranslationsProvider"
import { isMobileDevice } from "@/libs/responsive"
import "./style.scss"

export default async function PageLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { resources } = await initTranslations({
    locale,
    namespaces: ["common", "auth"]
  })
  const mobile = isMobileDevice()

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["common", "auth"]}
    >
      <div className="page-layout">
        <PageHeader isMobile={mobile} />
        <div className="page-layout__wrapper">
          <div className="page-layout__container">
            {!mobile && <Back isMobile={mobile} />}
            {children}
          </div>
        </div>
        <Footer />
      </div>
    </TranslationsProvider>
  )
}
