import { PurchasedVoucherDto } from "@/models/vouchers"
import { useTranslation } from "react-i18next"
import "./style.scss"

interface ReportTableProps {
  voucher: PurchasedVoucherDto
}

const ReportTable = ({ voucher }: ReportTableProps) => {
  const { t } = useTranslation()
  return (
    <div className="report-table">
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>{t("report-table.date")}</th>
            <th>{t("report-table.voucher-number")}</th>
            <th>{t("report-table.animal-type")}</th>
            <th>{t("report-table.animals-number")}</th>
            <th>{t("report-table.plot")}</th>
          </tr>
        </thead>
        <tbody>
          {voucher.limits.length > 0 &&
            voucher.limits.map((limit, index) => (
              <tr key={limit.id}>
                <td>{index + 1}</td>
                <td>{new Date(voucher.startDate).toLocaleDateString()}</td>
                <td>{voucher.slug}</td>
                <td>{limit.limit.animal.name}</td>
                <td>{limit.actualHeads}</td>
                <td>{voucher.voucher.plot.name}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReportTable
