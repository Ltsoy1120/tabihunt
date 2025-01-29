"use client"
import { PurchasedVoucherDto } from "@/models/vouchers"
import { useTranslation } from "react-i18next"
import MeVoucherCard from "../MeVoucherCard"
import "./style.scss"

interface MeVouchersListProps {
  vouchers: PurchasedVoucherDto[]
}

const MeVouchersList = ({ vouchers }: MeVouchersListProps) => {
  const { t } = useTranslation()
  return (
    <>
      {vouchers.length ? (
        <div className="me-vouchers-list">
          {vouchers.map(voucher => (
            <MeVoucherCard key={voucher.id} voucher={voucher} />
          ))}
        </div>
      ) : (
        <p style={{ padding: "20px 40px" }}>{t("empty")}</p>
      )}
    </>
  )
}

export default MeVouchersList
