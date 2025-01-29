import Button from "@/components/UI/buttons/Button"
import Icon from "@/components/UI/Icon"
import { getAnimalNames } from "@/helpers/common"
import { VoucherDto } from "@/models/vouchers"
import { API_URL } from "@/services/http.service"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslation } from "react-i18next"
import "./style.scss"

interface VoucherCardProps {
  voucher: VoucherDto
}

const VoucherCard = ({ voucher }: VoucherCardProps) => {
  const { t } = useTranslation()
  const params = useParams()
  return (
    <div className="voucher-card">
      <div className="voucher-card__img">
        <Image
          src={`${API_URL}files/${voucher.imageUrl}`}
          alt="voucher-img"
          fill
          priority
          sizes="(max-width: 768px) 25vw, (max-width: 1200px) 25vw, 25vw"
        />
      </div>
      <div className="voucher-card__info">
        <div className="voucher-card__head">
          <div className="voucher-card__head-info">
            {voucher.animalTypes?.includes("FEATHERED") && (
              <Icon name="feather" size={40} />
            )}
            {voucher.animalTypes?.includes("UNGULATE") && (
              <Icon name="ungulate" size={40} />
            )}
            <div>
              <h3>{voucher.plot?.name}</h3>
              <span>
                {t("main.card.voucher-duration")}: {voucher.duration}
              </span>
            </div>
          </div>
          <span className="voucher-type">
            {voucher.type === "SEASONAL"
              ? t("main.card.voucher-type.seasonal")
              : t("main.card.voucher-type.one-time")}
          </span>
        </div>
        <div className="voucher-prices">
          <h3>Виды путевок</h3>
          <div className="voucher-prices__wrapper">
            <div className="box">
              <span>{t("main.card.voucher-prices.standardPrice")}</span>
              <p>{voucher.standardPrice}</p>
            </div>
            <div className="box">
              <span>{t("main.card.voucher-prices.membershipPrice")}</span>
              <p>{voucher.membershipPrice}</p>
            </div>
            <div className="box">
              <span>{t("main.card.voucher-prices.preferentialPrice")}</span>
              <p>{voucher.preferentialPrice}</p>
            </div>
          </div>
        </div>
        <div className="voucher-animal">
          <div>
            <span>{t("main.card.voucher-animal")}</span>
            <p>{voucher.animals?.length && getAnimalNames(voucher.animals)}</p>
          </div>
          <Link href={`/${params.locale}/vouchers/${voucher.id}`}>
            <Button>{t("main.card.button")}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VoucherCard
