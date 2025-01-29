import initTranslations from "@/app/i18n"
import BannersSlider from "@/components/banners/BannersSlider"
import HuntingSocietiesListMain from "@/components/huntingSocieties/HuntingSocietiesListMain"
import NewsList from "@/components/news/NewsList"
import NewsSlider from "@/components/news/NewsSlider"
import PlotDescriptionListMain from "@/components/plotDescription/PlotDescriptionListMain"
import TranslationsProvider from "@/components/TranslationsProvider"
import Button from "@/components/UI/buttons/Button"
import { isMobileDevice } from "@/libs/responsive"
import { BannerDto } from "@/models/banner"
import { HuntingSocietyDto } from "@/models/huntingSociety"
import { NewsDto } from "@/models/new"
import { PlotDescriptionDto } from "@/models/plots"
import { fetchBanners } from "@/ssrServices/banners"
import { fetchHuntingSocieties } from "@/ssrServices/hunting-societies"
import { fetchNews } from "@/ssrServices/news"
import { fetchPlotDescriptions } from "@/ssrServices/plot-descriptions"
import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import "./style.scss"

interface HomeProps {
  params: {
    locale: string
    regionId: string
  }
}

export const metadata: Metadata = {
  title: "Tabihunt.kz - Купить путевку на охоту Online в Казахстане",
  description:
    "Tabihunt цифровой помощник охотников. Онлайн путевки на охоту доступны 24 часа. Информация об охоте в Казахстане, видах дичи, услугах охотничьих хозяйств и мест для охоты."
}

export default async function Home({
  params: { locale, regionId }
}: HomeProps) {
  const { t, resources } = await initTranslations({
    locale,
    namespaces: ["main"]
  })
  const mobile = isMobileDevice()
  const plotDescriptions: PlotDescriptionDto[] = await fetchPlotDescriptions(
    { regionId },
    locale
  )
  const huntingSocieties: HuntingSocietyDto[] = await fetchHuntingSocieties(
    locale
  )
  const banners: BannerDto[] = await fetchBanners(regionId, locale)
  const news: NewsDto[] = await fetchNews(locale)

  if (!news) notFound()

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["main"]}
    >
      <main className="main">
        <section className="section">
          {banners && <BannersSlider banners={banners} />}
        </section>
        <section className="section">
          <h2>{t("plot-description.title")}</h2>
          <p>{t("plot-description.text")}</p>
          {plotDescriptions.length > 0 ? (
            <>
              <div className="section__list">
                <PlotDescriptionListMain plotDescriptions={plotDescriptions} />
              </div>
              <Button>{t("plot-description.button")}</Button>
            </>
          ) : (
            <p>{t("plot-description.empty")}</p>
          )}
        </section>
        <section className="section">
          <h2>{t("hunting-societies.title")}</h2>
          {huntingSocieties.length > 0 ? (
            <>
              <div className="section__list">
                <HuntingSocietiesListMain huntingSocieties={huntingSocieties} />
              </div>
              <Link href={`${locale}/hunting-societies`}>
                <Button>{t("hunting-societies.button")}</Button>
              </Link>
            </>
          ) : (
            <p>{t("hunting-societies.empty")}</p>
          )}
        </section>
        <section className="section">
          <h2>{t("news.title")}</h2>
          <div className="section__list">
            {mobile ? <NewsSlider news={news} /> : <NewsList news={news} />}
          </div>
        </section>
      </main>
    </TranslationsProvider>
  )
}
