import Button from "@/components/UI/buttons/Button"
import Label from "@/components/UI/Label"
import { formatDate } from "@/helpers/common"
import { PurchasedVoucherDto } from "@/models/vouchers"
import { useParams, useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import "./style.scss"

interface ReportsSliderProps {
  voucher: PurchasedVoucherDto
}

const ReportCard = ({ voucher }: ReportsSliderProps) => {
  const { t } = useTranslation()
  const params = useParams()
  const router = useRouter()
  return (
    <div className="report-card">
      <div className="report-card__block">
        <div className="report-card__info">
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
        <Label>
          {voucher.voucher.type === "SEASONAL"
            ? t("me-reports.card.voucherTypes.seasonal")
            : t("me-reports.card.voucherTypes.seasonal")}
        </Label>
      </div>
      <div className="report-card__block">
        <div className="report-card__info">
          <span>{t("me-reports.card.voucher-number")}</span>
          <p>{voucher.slug}</p>
        </div>
        <Button onClick={() => router.push(`/${params.locale}/me/reports`)}>
          {t("me-reports.card.see-report-btn")}
        </Button>
      </div>
    </div>
  )
}

export default ReportCard
