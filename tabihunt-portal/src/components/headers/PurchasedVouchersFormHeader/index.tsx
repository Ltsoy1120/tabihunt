import React, { useState } from "react"
import Button from "@/components/UI/buttons/Button"
import { useAppDispatch, useAppSelector } from "@/store"
import FormHeader from "../FormHeader"
import { reportMePurchasedVoucher } from "@/store/actions/vouchersActions"
import { useParams, useRouter } from "next/navigation"
import ReportSuccessModal from "@/components/modals/ReportSuccessModal"
import { useTranslation } from "react-i18next"

const PurchasedVouchersFormHeader = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const params = useParams()
  const router = useRouter()
  const { reportPurchasedVoucherData } = useAppSelector(state => state.vouchers)
  const purchasedVoucherId = Array.isArray(params.id) ? params.id[0] : params.id
  const [showReportSuccessModal, setShowReportSuccessModal] = useState(false)

  const getFormButton = () => {
    return (
      <Button onClick={onSubmit} disabled={!reportPurchasedVoucherData}>
        {t("form-header.purchased-voucher.send-btn")}
      </Button>
    )
  }

  const onSubmit = async () => {
    if (reportPurchasedVoucherData) {
      const result = await dispatch(
        reportMePurchasedVoucher(reportPurchasedVoucherData, purchasedVoucherId)
      )
      if (result) {
        setShowReportSuccessModal(true)
      }
    }
  }

  const close = () => {
    setShowReportSuccessModal(false)
    router.push("/me/reports")
  }

  return (
    <>
      <FormHeader
        titlePage={t("form-header.purchased-voucher.report")}
        titlePageMobile={t("form-header.purchased-voucher.report-mobile")}
        getFormButton={getFormButton}
      />
      {showReportSuccessModal && <ReportSuccessModal close={close} />}
    </>
  )
}

export default PurchasedVouchersFormHeader
