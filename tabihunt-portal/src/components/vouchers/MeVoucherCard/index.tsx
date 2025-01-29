import Button from "@/components/UI/buttons/Button"
import Icon from "@/components/UI/Icon"
import { formatDate, getFormattedDate } from "@/helpers/common"
import useIsMobile from "@/hooks/useIsMobile"
import { PurchasedVoucherDto } from "@/models/vouchers"
import { API_URL } from "@/services/http.service"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useTranslation } from "react-i18next"
import "./style.scss"

interface MeVoucherCardProps {
  voucher: PurchasedVoucherDto
}

const MeVoucherCard = ({ voucher }: MeVoucherCardProps) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()
  const params = useParams()
  return (
    <div className="me-voucher-card">
      <div className="me-voucher-card__img">
        <Image
          src={`${API_URL}files/${voucher.voucher.imageUrl}`}
          alt="voucher-img"
          width={170}
          height={170}
        />
      </div>
      <div className="me-voucher-card__wrapper">
        <div className="me-voucher-card__head">
          <div className="me-voucher__number">
            <span>{t("me-vouchers.card.voucher-number")}</span>
            <p>{voucher.slug}</p>
          </div>

          <div className="me-voucher-card__btns">
            {voucher.endDate > getFormattedDate(new Date()) && (
              <Link
                href={`/${params.locale}/purchased-vouchers/${voucher.id}/report`}
              >
                <Button endIcon="circle-plus">
                  {isMobile
                    ? t("me-vouchers.card.voucher-report-mobile-btn")
                    : t("me-vouchers.card.create-voucher-report-btn")}
                </Button>
              </Link>
            )}
            <a href={`${API_URL}files/${voucher?.id}`} download>
              <Button endIcon="download">
                {isMobile ? "" : t("me-vouchers.card.voucher-download-btn")}
              </Button>
            </a>
          </div>
        </div>

        <div className="me-voucher-card__info">
          <div className="me-voucher-card__info-wrap">
            <div className="me-voucher-animal">
              {voucher.voucher.animalTypes?.includes("FEATHERED") && (
                <Icon name="feather" size={40} />
              )}
              {voucher.voucher.animalTypes?.includes("UNGULATE") && (
                <Icon name="ungulate" size={40} />
              )}
            </div>
            <div className="me-voucher-info">
              <h3>{voucher.voucher.plot?.name}</h3>
              <span>
                С {formatDate(voucher.startDate)} По{" "}
                {formatDate(voucher.endDate)}
              </span>
            </div>
          </div>
          <Link href={`/${params.locale}/me/vouchers/${voucher.id}`}>
            <Button>{t("me-vouchers.card.button")}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MeVoucherCard
