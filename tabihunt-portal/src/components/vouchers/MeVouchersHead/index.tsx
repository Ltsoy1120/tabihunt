"use client"
import MeVoucherTypesModal from "@/components/modals/MeVoucherTypesModal"
import TextButton from "@/components/UI/buttons/TextButton"
import Input from "@/components/UI/Input"
import { Dispatch, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next"
import "./style.scss"

interface MeVouchersHeadProps {
  activeVoucherType: string | null
  sortedByVoucherType: (selectedVoucherType: string | null) => void
  searchVoucher: string
  setSearchVoucher: Dispatch<SetStateAction<string>>
}

const MeVouchersHead = ({
  activeVoucherType,
  sortedByVoucherType,
  searchVoucher,
  setSearchVoucher
}: MeVouchersHeadProps) => {
  const { t } = useTranslation()
  const [isOpenMeVoucherTypeModal, setOpenMeVoucherTypeModal] = useState(false)

  const onSubmit = (selectedVoucherType: string | null) => {
    sortedByVoucherType(selectedVoucherType)
    setOpenMeVoucherTypeModal(false)
  }

  return (
    <>
      <div className="me-vouchers-head">
        <div className="me-vouchers-head__actions">
          <TextButton
            endIcon="arrow-down-big"
            onClick={() => setOpenMeVoucherTypeModal(true)}
          >
            {activeVoucherType === "ACTUAL"
              ? t("me-vouchers.voucher-type-select.actual")
              : activeVoucherType === "ARCHIVE"
              ? t("me-vouchers.voucher-type-select.archive")
              : t("me-vouchers.voucher-type-select.title")}
          </TextButton>
        </div>
        <div className="me-vouchers-head__search">
          <Input
            placeholder={t("me-vouchers.search")}
            value={searchVoucher}
            onChange={e => {
              setSearchVoucher(e.target.value)
            }}
            endIcon="search"
          />
        </div>
      </div>
      {isOpenMeVoucherTypeModal && (
        <MeVoucherTypesModal
          activeVoucherType={activeVoucherType}
          close={() => setOpenMeVoucherTypeModal(false)}
          onSubmit={onSubmit}
        />
      )}
    </>
  )
}

export default MeVouchersHead
