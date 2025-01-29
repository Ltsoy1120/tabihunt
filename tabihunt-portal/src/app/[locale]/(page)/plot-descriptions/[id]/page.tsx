import initTranslations from "@/app/i18n"
import Loader from "@/components/loaders/Loader"
import Map from "@/components/Map"
import TranslationsProvider from "@/components/TranslationsProvider"
import Button from "@/components/UI/buttons/Button"
import Icon from "@/components/UI/Icon"
import { groupWorkingHours } from "@/helpers/common"
import { PlotDescriptionDto } from "@/models/plots"
import { API_URL } from "@/services/http.service"
import { fetchPlotDescriptionById } from "@/ssrServices/plot-descriptions"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import "./style.scss"

interface PlotDescriptionPageProps {
  params: {
    locale: string
    id: string
  }
}

export async function generateMetadata({
  params: { id, locale }
}: PlotDescriptionPageProps): Promise<Metadata> {
  const plotDescription: PlotDescriptionDto = await fetchPlotDescriptionById(
    id,
    locale
  )
  return {
    title: plotDescription.plot.name,
    description: plotDescription.about,
    openGraph: {
      images: [{ url: plotDescription.imageUrl }]
    }
  }
}

const PlotDescriptionPage = async ({
  params: { id, locale }
}: PlotDescriptionPageProps) => {
  const { t, resources } = await initTranslations({
    locale,
    namespaces: ["plot-descriptions", "common"]
  })
  const plotDescription: PlotDescriptionDto = await fetchPlotDescriptionById(
    id,
    locale
  )
  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["plot-descriptions", "common"]}
    >
      {plotDescription ? (
        <div className="plot-description-page">
          <div className="plot-description__img">
            <Image
              src={`${API_URL}files/${plotDescription?.imageUrl}`}
              alt="plot-image"
              priority
              width={950}
              height={360}
            />
            <div className="plot-description__img-info">
              <h1>{plotDescription.plot.name}</h1>
              <Link
                href={`/${locale}/vouchers?plotId=${plotDescription.plot.id}`}
              >
                <Button>{t("page.purchase-voucher-btn")}</Button>
              </Link>
            </div>
          </div>
          <div className="plot-description__section">
            <h2>{t("page.about.title")}</h2>
            <p>{plotDescription.about}</p>
          </div>
          <div className="plot-description__section">
            <h2>{t("page.animals.title")}</h2>
            <div className="animals-list">
              {plotDescription.animals.map(animal => (
                <h4 key={animal.id} className="badge">
                  {animal.name}
                </h4>
              ))}
            </div>
          </div>
          <div className="plot-description__section">
            <h2>{t("page.services.title")}</h2>
            <p>{plotDescription?.services}</p>
          </div>
          <div className="plot-description__section">
            <h2>{t("page.contacts.title")}</h2>
            <p>
              {t("page.contacts.text")}
              <br /> {plotDescription?.address}
            </p>
            <div className="row">
              <div className="map">
                <Map
                  center={{
                    lat: plotDescription.plot.coordinates[0].latitude,
                    lng: plotDescription.plot.coordinates[0].longitude
                  }}
                  plot={plotDescription.plot}
                />
              </div>
              <div className="working-hours__block">
                <div className="working-hours__block-item">
                  <Image
                    src={"/static/images/icons/close.png"}
                    alt="close-icon"
                    width={20}
                    height={20}
                  />
                  <div className="col" style={{ gap: "5px" }}>
                    {plotDescription &&
                      groupWorkingHours(plotDescription?.workingHours)
                        .split(", ")
                        .map((item, index) => <p key={index}>{item}</p>)}
                  </div>
                </div>
                <div className="working-hours__block-item">
                  <a href={`tel:${plotDescription.phoneNumber}`}>
                    <Icon name="phone" size={20} />
                    {plotDescription.phoneNumber}
                  </a>
                </div>
                <div className="working-hours__block-item">
                  <a href={`mailto:${plotDescription.email}`}>
                    <Icon name="email" size={20} />
                    {plotDescription.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </TranslationsProvider>
  )
}

export default PlotDescriptionPage
