import initTranslations from "@/app/i18n"
import Footer from "@/components/Footer"
import Header from "@/components/headers/Header"
// import MobilePanel from "@/components/MobilePanel"
import SideBar from "@/components/SideBar"
import TranslationsProvider from "@/components/TranslationsProvider"
import { isMobileDevice } from "@/libs/responsive"
import "./style.scss"

export default async function MainLayout({
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
      <div className="main-layout">
        <Header isMobile={mobile} />
        <div className="wrapper">
          <SideBar />
          {children}
          <Footer />
        </div>
        {/* {mobile && <MobilePanel/>} */}
      </div>
    </TranslationsProvider>
  )
}
