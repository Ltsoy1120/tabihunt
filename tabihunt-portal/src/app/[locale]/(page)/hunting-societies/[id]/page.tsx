import initTranslations from "@/app/i18n"
import HuntingSocietyAbout from "@/components/huntingSocieties/HuntingSocietyAbout"
import Loader from "@/components/loaders/Loader"
import TranslationsProvider from "@/components/TranslationsProvider"
import Icon from "@/components/UI/Icon"
import { groupWorkingHours } from "@/helpers/common"
import { HuntingSocietyDto } from "@/models/huntingSociety"
import { API_URL } from "@/services/http.service"
import { fetchHuntingSocietyById } from "@/ssrServices/hunting-societies"
import Image from "next/image"
import "./style.scss"

interface HuntingSocietyPageProps {
  params: {
    locale: string
    id: string
  }
}

const HuntingSocietyPage = async ({
  params: { locale, id }
}: HuntingSocietyPageProps) => {
  const { t, resources } = await initTranslations({
    locale,
    namespaces: ["hunting-societies", "common"]
  })
  const huntingSociety: HuntingSocietyDto = await fetchHuntingSocietyById(
    id,
    locale
  )

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["hunting-societies", "common"]}
    >
      {huntingSociety ? (
        <div className="huntingSociety-page">
          <h2>{huntingSociety.name}</h2>
          <div className="huntingSociety__img">
            <Image
              src={`${API_URL}files/${huntingSociety?.imageUrl}`}
              alt="voucher-img"
              priority
              width={200}
              height={200}
            />
          </div>
          <h3>{t("page.about.title")}</h3>
          <HuntingSocietyAbout huntingSociety={huntingSociety} />
          <h3>{t("page.instrucions.title")}</h3>
          <div
            className="huntingSociety__instrucion"
            dangerouslySetInnerHTML={{ __html: huntingSociety.instructions }}
          />
          <h3>{t("page.contacts.title")}</h3>
          <p>{t("page.contacts.text")}</p>
          <div className="huntingSociety__contacts">
            <div className="col">
              <a
                href={`mailto:${huntingSociety.email}`}
                className="huntingSociety__contacts-item"
              >
                <Icon name="email" size={20} />
                {huntingSociety.email}
              </a>
              <a
                href={`tel:${huntingSociety.phoneNumber}`}
                className="huntingSociety__contacts-item"
              >
                <Icon name="phone" size={20} />
                {huntingSociety.phoneNumber}
              </a>
            </div>
            <div className="col">
              <a
                href="mailto:info@poymay.kz"
                className="huntingSociety__contacts-item"
              >
                <Icon name="geo" size={20} />
                {huntingSociety.address}
              </a>
              <div className="huntingSociety__contacts-item">
                <Image
                  src={"/static/images/icons/close.png"}
                  alt="close-icon"
                  width={20}
                  height={20}
                />
                <div className="col" style={{ gap: "5px" }}>
                  {huntingSociety &&
                    groupWorkingHours(huntingSociety?.workingHours)}
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

export default HuntingSocietyPage
