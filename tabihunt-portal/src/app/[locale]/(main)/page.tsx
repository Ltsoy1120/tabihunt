import initTranslations from "@/app/i18n";
import BannersSlider from "@/components/banners/BannersSlider";
import HuntingSocietiesListMain from "@/components/huntingSocieties/HuntingSocietiesListMain";
import NewsSlider from "@/components/news/NewsSlider";
import NewsView from "@/components/news/NewsView";
import PlotDescriptionListMain from "@/components/plotDescription/PlotDescriptionListMain";
import TranslationsProvider from "@/components/TranslationsProvider";
import Button from "@/components/UI/buttons/Button";
import { isMobileDevice } from "@/libs/responsive";
import { BannerDto } from "@/models/banner";
import { HuntingSocietyDto } from "@/models/huntingSociety";
import { NewsDto } from "@/models/new";
import { PlotDescriptionDto } from "@/models/plots";
import { fetchBanners } from "@/ssrServices/banners";
import { fetchHuntingSocieties } from "@/ssrServices/hunting-societies";
import { fetchNews } from "@/ssrServices/news";
import { fetchPlotDescriptions } from "@/ssrServices/plot-descriptions";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./style.scss";

interface HomeProps {
  params: {
    locale: string;
  };
}

export const metadata: Metadata = {
  title: "Tabihunt.kz - Купить путевку на охоту Online в Казахстане",
  description:
    "Tabihunt цифровой помощник охотников. Онлайн путевки на охоту доступны 24 часа. Информация об охоте в Казахстане, видах дичи, услугах охотничьих хозяйств и мест для охоты.",
};

export default async function Home({ params: { locale } }: HomeProps) {
  const { t, resources } = await initTranslations({
    locale,
    namespaces: ["main"],
  });
  const mobile = isMobileDevice();
  const defaultRegionId = "518fd3e8-5b63-4b63-b0a9-000000000001";
  const plotDescriptions: PlotDescriptionDto[] = await fetchPlotDescriptions(
    { regionId: defaultRegionId },
    locale
  );
  const huntingSocieties: HuntingSocietyDto[] = await fetchHuntingSocieties(
    locale
  );
  const banners: BannerDto[] = await fetchBanners(defaultRegionId, locale);
  const news: NewsDto[] = await fetchNews(locale);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["main"]}
    >
      <main className="main">
        {banners.length > 0 && (
          <section className="section">
            <BannersSlider banners={banners} />
          </section>
        )}
        <div className="main-info">
          <Image
            src="/static/images/main.png"
            alt="Tabihunt"
            fill
            priority
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 40vw"
          />
          <div className="main-info__content">
            <h1>{t("title")}</h1>
            <p>
              <b>TabiHunt (Табихант)</b> – это цифровая платформа для охотников,
              где вы найдете подробную информацию об охотничьих хозяйствах
              Казахстана и их услугах, а также у вас есть возможность
              приобретать путевки на охоту не выходя из дома или работы.
              Приобретайте путевки на сайте TabiHunt в любое время! Мы работаем
              24 часа 7 дней в неделю
            </p>
            <Link href={`/${locale}/vouchers`}>
              <Button>Перейти к покупке путевок</Button>
            </Link>
          </div>
        </div>

        <section className="section">
          <div className="section__list">
            <PlotDescriptionListMain plotDescriptions={plotDescriptions} />
          </div>
          <Link href={`/${locale}/plot-descriptions`}>
            <Button>{t("plot-description.button")}</Button>
          </Link>
        </section>
        <section className="section">
          <h2>{t("hunting-societies.title")}</h2>
          <div className="section__list">
            <HuntingSocietiesListMain huntingSocieties={huntingSocieties} />
          </div>
          <Link href={`/${locale}/hunting-societies`}>
            <Button>{t("hunting-societies.button")}</Button>
          </Link>
        </section>
        <section className="section">
          <h2>{t("news.title")}</h2>
          <div className="section__list">
            <NewsView news={news} isMobile={mobile} />
          </div>
        </section>
      </main>
    </TranslationsProvider>
  );
}
