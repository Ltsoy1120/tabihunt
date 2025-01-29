import initTranslations from "@/app/i18n"
import "./style.scss"

interface MapProps {
  params: {
    locale: string
  }
}

export default async function MapPage({ params: { locale } }: MapProps) {
  const { t } = await initTranslations({
    locale,
    namespaces: ["map", "common"]
  })
  return (
    <main className="map-page">
      <h2>{t("title")}</h2>

      <iframe
        src="https://www.google.com/maps/d/embed?mid=1RUsCHhtGv6wkRZD0p8f9eyREXTihd_8&ehbc=2E312F"
        width="1000"
        height="700"
      ></iframe>
    </main>
  )
}
