import Input from "@/components/UI/Input"
import React from "react"
import { useTranslation } from "react-i18next"
import "./style.scss"

interface MeReportsHeadProps {
  searchVoucher: string
  setSearchVoucher: React.Dispatch<React.SetStateAction<string>>
}

const MeReportsHead = ({
  searchVoucher,
  setSearchVoucher
}: MeReportsHeadProps) => {
  const { t } = useTranslation()
  return (
    <div className="me-reports-head">
      <h3>{t("subtitle")}</h3>
      <div className="me-vouchers-head__search">
        <Input
          placeholder={t("voucher-search")}
          value={searchVoucher}
          onChange={e => {
            setSearchVoucher(e.target.value)
          }}
          endIcon="search"
        />
      </div>
    </div>
  )
}

export default MeReportsHead
