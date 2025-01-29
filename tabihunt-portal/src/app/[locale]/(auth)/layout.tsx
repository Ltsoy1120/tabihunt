import TranslationsProvider from "@/components/TranslationsProvider"
import initTranslations from "@/app/i18n"
import "./style.scss"

export default async function AuthLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { resources } = await initTranslations({
    locale,
    namespaces: ["auth"]
  })
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["auth"]}
    >
      <div className="auth-layout">{children}</div>
    </TranslationsProvider>
  )
}
