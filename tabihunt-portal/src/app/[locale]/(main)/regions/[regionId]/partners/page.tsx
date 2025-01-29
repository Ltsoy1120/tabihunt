import initTranslations from "@/app/i18n";
import PartnersForm from "@/components/partners/PartnersForm";
import TranslationsProvider from "@/components/TranslationsProvider";
import Button from "@/components/UI/buttons/Button";
import Icon from "@/components/UI/Icon";
import { formatPhoneNumber } from "@/helpers/common";
import { isMobileDevice } from "@/libs/responsive";
import { PartnershipContentDto } from "@/models/partner";
import { API_URL } from "@/services/http.service";
import { fetchPartnerShipContent } from "@/ssrServices/partner";
import { Metadata } from "next";
import Image from "next/image";
import "./style.scss";

export const metadata: Metadata = {
  title: "Преимущества сотрудничества",
};

interface PartnersProps {
  params: {
    locale: string;
  };
}

const Partners = async ({ params: { locale } }: PartnersProps) => {
  const { t, resources } = await initTranslations({
    locale,
    namespaces: ["partners", "common"],
  });
  const isMobile = isMobileDevice();
  const partnershipContent: PartnershipContentDto =
    await fetchPartnerShipContent(locale);

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["partners", "common"]}
    >
      <div className="partners-page">
        <div className="partners__banner">
          <Image
            src={`${API_URL}files/${partnershipContent?.imageUrl}`}
            alt="partners-img"
            fill
            priority
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 40vw"
          />
          <div className="partners__banner__content">
            <h2>{t("title")}</h2>
            <Button>{t("contact-us-btn")}</Button>
          </div>
        </div>
        <h2>{t("about.title")}</h2>
        <div
          className="partners__project"
          dangerouslySetInnerHTML={{ __html: partnershipContent.about }}
        ></div>

        <h2>{t("advantages.title")}</h2>
        <div
          className="partners__advantages"
          dangerouslySetInnerHTML={{ __html: partnershipContent.advantages }}
        ></div>

        <h2>{t("contact-us.title")}</h2>
        {isMobile ? (
          <div className="partners__feedback">
            <div className="partners__contacts">
              <h1>{t("contact-us.contact-us")}</h1>
              <PartnersForm />
              <div className="contacts">
                <a href={`mailto:${partnershipContent.email}`}>
                  <Icon name="email" size={20} />
                  {partnershipContent.email}
                </a>
                <a href={`tel:${partnershipContent.phoneNumber}`}>
                  <Icon name="phone" size={20} />
                  {partnershipContent.phoneNumber}
                </a>
                <div className="socials">
                  <a href="https://www.instagram.com/poymay_kz/">
                    <Icon name="instagram" size={26} />
                  </a>
                  <a href="https://wa.me/+77017500793">
                    <Icon name="whatsapp" size={26} />
                  </a>
                  <a href="https://t.me/tabihunt">
                    <Icon name="telegram" size={26} />
                  </a>
                  <a href="https://www.facebook.com/p/tabihunt-61568330158314/">
                    <Icon name="fasebook" size={26} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="partners__feedback">
            <div className="partners__contacts">
              <h1>{t("contact-us.contact-us")}</h1>
              <div className="contacts">
                <a href={`mailto:${partnershipContent.email}`}>
                  <Icon name="email" size={20} />
                  {partnershipContent.email}
                </a>
                <a
                  href={`tel:${formatPhoneNumber(
                    partnershipContent.phoneNumber
                  )}`}
                >
                  <Icon name="phone" size={20} />
                  {partnershipContent.phoneNumber}
                </a>
                <div className="socials">
                  <a href={partnershipContent.instagramUrl}>
                    <Icon name="instagram" size={26} />
                  </a>
                  <a href={partnershipContent.whatsappUrl}>
                    <Icon name="whatsapp" size={26} />
                  </a>
                  <a href={partnershipContent.telegramUrl}>
                    <Icon name="telegram" size={26} />
                  </a>
                  <a href={partnershipContent.facebookUrl}>
                    <Icon name="fasebook" size={26} />
                  </a>
                </div>
              </div>
            </div>
            <PartnersForm />
          </div>
        )}
      </div>
    </TranslationsProvider>
  );
};

export default Partners;
