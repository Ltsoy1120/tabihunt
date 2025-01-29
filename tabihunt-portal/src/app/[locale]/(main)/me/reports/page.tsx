"use client"
import Loader from "@/components/loaders/Loader"
import MeReportsHead from "@/components/reports/MeReportsHead"
import MeReportsList from "@/components/reports/MeReportsList"
import { useAppDispatch, useAppSelector } from "@/store"
import { getMePurchasedVouchers } from "@/store/actions/vouchersActions"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import "./style.scss"

const MeReports = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const { meVouchers, loading } = useAppSelector(state => state.vouchers)
  const [searchVoucher, setSearchVoucher] = useState<string>("")

  useEffect(() => {
    dispatch(getMePurchasedVouchers())
  }, [dispatch])

  useEffect(() => {
    dispatch(getMePurchasedVouchers({ slug: searchVoucher }))
  }, [dispatch, searchVoucher])

  return (
    <div className="me-reports-page">
      <h2>{t("title")}</h2>
      <MeReportsHead
        searchVoucher={searchVoucher}
        setSearchVoucher={setSearchVoucher}
      />
      {loading ? <Loader /> : <MeReportsList meVouchers={meVouchers} />}
    </div>
  )
}

export default MeReports
