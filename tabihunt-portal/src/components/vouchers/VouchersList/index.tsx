"use client"
import { VoucherDto } from "@/models/vouchers"
import { useTranslation } from "react-i18next"
import VoucherCard from "../VoucherCard"
import "./style.scss"

interface VouchersListProps {
  vouchers: VoucherDto[]
}

const VouchersList = ({ vouchers }: VouchersListProps) => {
  const { t } = useTranslation()

  return (
    <div className="vouchers-list">
      {vouchers?.length > 0 ? (
        vouchers.map(voucher => (
          <VoucherCard key={voucher.id} voucher={voucher} />
        ))
      ) : (
        <p>{t("empty")}</p>
      )}
    </div>
  )
}

export default VouchersList
