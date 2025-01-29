import Button from "@/components/UI/buttons/Button"
import Icon from "@/components/UI/Icon"
import Label from "@/components/UI/Label"
import { formatDate } from "@/helpers/common"
import useIsMobile from "@/hooks/useIsMobile"
import { PurchasedVoucherDto } from "@/models/vouchers"
import { API_URL } from "@/services/http.service"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslation } from "react-i18next"
import "./style.scss"

interface VoucherCardProps {
  voucher: PurchasedVoucherDto
}

const VoucherCard = ({ voucher }: VoucherCardProps) => {
  const { t } = useTranslation()
  const params = useParams()
  const isMobile = useIsMobile()
  return (
    <div className="voucher-card">
      <div className="voucher-card__img">
        {isMobile ? (
          <>
            <Image
              src={`${API_URL}files/${voucher.voucher.imageUrl}`}
              alt="voucher-img"
              fill
              priority
              sizes="95vw"
            />
            <Label>
              {voucher.voucher.type === "SEASONAL"
                ? t("me-vouchers.card.voucherTypes.seasonal")
                : t("me-vouchers.card.voucherTypes.one-time")}
            </Label>
          </>
        ) : (
          <Image
            src={`${API_URL}files/${voucher.voucher.imageUrl}`}
            alt="voucher-img"
            width={170}
            height={170}
          />
        )}
      </div>
      <div className="voucher-card__data">
        <div className="voucher-card__block">
          <div className="voucher-card__icons">
            {voucher.voucher.animalTypes.includes("FEATHERED") && (
              <Icon name="feather" size={40} />
            )}
            {voucher.voucher.animalTypes.includes("UNGULATE") && (
              <Icon name="ungulate" size={40} />
            )}
          </div>
          <div className="voucher-card__info">
            <p>{voucher.voucher.plot.name}</p>
            <span>
              {params.locale === "ru"
                ? `С ${formatDate(voucher.startDate)} По ${formatDate(
                    voucher.endDate
                  )}`
                : `${formatDate(voucher.startDate)} бастап ${formatDate(
                    voucher.endDate
                  )} дейін`}
            </span>
          </div>
          {!isMobile && (
            <Label>
              {voucher.voucher.type === "SEASONAL"
                ? t("me-vouchers.card.voucherTypes.seasonal")
                : t("me-vouchers.card.voucherTypes.one-time")}
            </Label>
          )}
        </div>
        <div className="voucher-card__block">
          <div className="group-btns">
            <Link href={`/${params.locale}/me/vouchers/${voucher.id}`}>
              <Button>{t("me-vouchers.card.more-details-btn")}</Button>
            </Link>
            <a href={`${API_URL}files/${voucher?.id}`} download>
              <Button endIcon="download" className="main-light-btn">
                {t("me-vouchers.card.download-btn")}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VoucherCard
