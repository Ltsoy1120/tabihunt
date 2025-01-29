import initTranslations from "@/app/i18n"
import Loader from "@/components/loaders/Loader"
import TranslationsProvider from "@/components/TranslationsProvider"
import VoucherAnimals from "@/components/vouchers/VoucherAnimals"
import VoucherPurchaseBtn from "@/components/vouchers/VoucherPurchaseBtn"
import { VoucherDto } from "@/models/vouchers"
import { API_URL } from "@/services/http.service"
import { fetchVoucherById } from "@/ssrServices/vouchers"
import Image from "next/image"
import "./style.scss"

interface VoucherPageProps {
  params: {
    locale: string
    id: string
  }
}

const VoucherPage = async ({ params: { locale, id } }: VoucherPageProps) => {
  const { t, resources } = await initTranslations({
    locale,
    namespaces: ["vouchers", "auth", "common"]
  })
  const voucher: VoucherDto = await fetchVoucherById(id, locale)

  const voucherCharacteristicState = [
    {
      title: t("page.voucher-info.voucherType.title"),
      value:
        voucher?.type === "SEASONAL"
          ? t("page.voucher-info.voucherType.seasonal")
          : t("page.voucher-info.voucherType.one-time")
    },
    {
      title: t("page.voucher-info.animalTypes.title"),
      value:
        voucher.animalTypes?.includes("FEATHERED") &&
        voucher.animalTypes?.includes("UNGULATE")
          ? t("page.voucher-info.animalTypes.all")
          : voucher.animalTypes?.includes("FEATHERED")
          ? t("page.voucher-info.animalTypes.feathered")
          : voucher.animalTypes?.includes("UNGULATE")
          ? t("page.voucher-info.animalTypes.ungulate")
          : t("page.voucher-info.animalTypes.empty")
    },
    {
      title: t("page.voucher-info.plot"),
      value: voucher?.plot?.name
    },
    {
      title: t("page.voucher-info.duration"),
      value: voucher?.duration
    }
  ]
  const voucherPricesState = [
    {
      title: t("page.voucher-prices.standardPrice"),
      value: voucher.standardPrice
    },
    {
      title: t("page.voucher-prices.membershipPrice"),
      value: voucher.membershipPrice
    },
    {
      title: t("page.voucher-prices.preferentialPrice"),
      value: voucher.preferentialPrice
    }
  ]

  return (
    <TranslationsProvider
      resources={resources}
      locale={locale}
      namespaces={["vouchers", "auth", "common"]}
    >
      {voucher ? (
        <div className="voucher-page">
          <div className="voucher__info">
            <div className="voucher__info-img">
              <Image
                src={`${API_URL}files/${voucher?.imageUrl}`}
                alt="voucher-img"
                priority
                width={310}
                height={310}
              />
            </div>
            <div className="voucher__info-description">
              <h2>{t("page.voucher-info.title")}</h2>
              <div className="description-block">
                {voucherCharacteristicState.map(item => (
                  <div key={item.title} className="description-block__item">
                    <span>{item.title}</span>
                    <p>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <VoucherAnimals voucherAnimals={voucher.animals} />
          <div className="voucher__prices">
            <h2>{t("page.voucher-prices.title")}</h2>
            <div className="voucher__prices-list">
              {voucherPricesState.map(item => (
                <div key={item.title} className="voucher__prices-list-item">
                  <span>{item.title}</span>
                  <p>{item.value} ₸</p>
                </div>
              ))}
            </div>
          </div>
          <VoucherPurchaseBtn />
        </div>
      ) : (
        <Loader />
      )}
    </TranslationsProvider>
  )
}

export default VoucherPage
