import { PurchasedVoucherDto } from "@/models/vouchers"
import { useTranslation } from "react-i18next"
import MeReportCard from "../MeReportCard"
import "./style.scss"

interface MeReportsListProps {
  meVouchers: PurchasedVoucherDto[]
}

const MeReportsList = ({ meVouchers }: MeReportsListProps) => {
  const { t } = useTranslation()
  return (
    <>
      {meVouchers ? (
        <div className="me-reports-list">
          {meVouchers.map(voucher => (
            <MeReportCard key={voucher.id} voucher={voucher} />
          ))}
        </div>
      ) : (
        <p>{t("empty")}</p>
      )}
    </>
  )
}

export default MeReportsList
