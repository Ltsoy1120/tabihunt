"use client"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams, useRouter } from "next/navigation"
import Loader from "@/components/loaders/Loader"
import Input from "@/components/UI/Input"
import { ReportPurchasedVoucherData } from "@/models/vouchers"
import { useAppDispatch, useAppSelector } from "@/store"
import {
  getMePurchasedVoucherById,
  reportMePurchasedVoucher
} from "@/store/actions/vouchersActions"
import { setReportPurchasedVoucherData } from "@/store/slices/vouchersSlice"
import Button from "@/components/UI/buttons/Button"
import useIsMobile from "@/hooks/useIsMobile"
import ReportSuccessModal from "@/components/modals/ReportSuccessModal"
import "./style.scss"

const PurchasedVoucherReport = () => {
  const { t } = useTranslation()
  const params = useParams()
  const router = useRouter()
  const isMobile = useIsMobile()
  const dispatch = useAppDispatch()
  const { meVoucherById } = useAppSelector(state => state.vouchers)
  const { reportPurchasedVoucherData } = useAppSelector(state => state.vouchers)
  const purchasedVoucherId = Array.isArray(params.id) ? params.id[0] : params.id
  const [state, setState] = useState<ReportPurchasedVoucherData[]>([])
  const [showReportSuccessModal, setShowReportSuccessModal] = useState(false)

  useEffect(() => {
    if (!meVoucherById) {
      dispatch(getMePurchasedVoucherById(purchasedVoucherId))
    }
    if (meVoucherById && meVoucherById.limits.length > 0) {
      const initialState = meVoucherById.limits.map(limit => ({
        animalLimitId: limit.id,
        actualHeads: 0
      }))
      setState(initialState)
    }
  }, [dispatch, meVoucherById, purchasedVoucherId])

  useEffect(() => {
    dispatch(setReportPurchasedVoucherData(state))
  }, [dispatch, state])

  const handleOnChange = (index: number, value: string, heads: number) => {
    if (Number(value) <= heads) {
      setState(prevState =>
        prevState.map((item, i) =>
          i === index ? { ...item, actualHeads: Number(value) } : item
        )
      )
    }
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
    router.push(`/${params.locale}/me/reports`)
  }

  return (
    <>
      {meVoucherById ? (
        <>
          <div className="purchased-voucher-report">
            <div className="form">
              <h3>{t("report-table.date")}</h3>
              <div className="purchased-voucher__data">
                {meVoucherById.startDate}
              </div>
              <h3>{t("report-table.plot")}</h3>
              <div className="purchased-voucher__data">
                {meVoucherById.voucher.plot.name}
              </div>
              <h3>{t("report-table.voucher-number")}</h3>
              <div className="purchased-voucher__data">
                {meVoucherById.slug}
              </div>
              <div className="purchased-voucher__limits">
                <div className="purchased-voucher__limits-head">
                  <h3>{t("report-table.animal-type")}</h3>
                  <h3>{t("report-table.animals-number")}</h3>
                </div>
                <div className="purchased-voucher__limits-list">
                  {meVoucherById.limits.map((limit, index) => (
                    <div
                      className="purchased-voucher__limits-item"
                      key={limit.id}
                    >
                      <div className="purchased-voucher__data">
                        {limit.limit.animal.name}
                      </div>
                      <Input
                        type="number"
                        value={String(state[index]?.actualHeads || 0)}
                        onChange={e =>
                          handleOnChange(index, e.target.value, limit.heads)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {isMobile && (
              <Button onClick={onSubmit} disabled={!reportPurchasedVoucherData}>
                {t("report-btn-mobile")}
              </Button>
            )}
          </div>
          {showReportSuccessModal && <ReportSuccessModal close={close} />}
        </>
      ) : (
        <div style={{ paddingTop: "100px" }}>
          <Loader />
        </div>
      )}
    </>
  )
}

export default PurchasedVoucherReport
