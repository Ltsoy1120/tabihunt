"use client"
import { useAppDispatch, useAppSelector } from "@/store"
import { getMePurchasedVouchers } from "@/store/actions/vouchersActions"
import { useEffect, useState } from "react"
import Loader from "@/components/loaders/Loader"
import MeVouchersHead from "@/components/vouchers/MeVouchersHead"
import MeVouchersList from "@/components/vouchers/MeVouchersList"
import { getFormattedDate } from "@/helpers/common"
import { PurchasedVoucherDto } from "@/models/vouchers"
import "./style.scss"

const MeVouchersPage = () => {
  const dispatch = useAppDispatch()
  const { meVouchers, loading } = useAppSelector(state => state.vouchers)
  const [activeVoucherType, setActiveVoucherType] = useState<string | null>(
    null
  )
  const [sortedVouchers, setSortedVouchers] = useState<PurchasedVoucherDto[]>(
    []
  )
  const [searchVoucher, setSearchVoucher] = useState("")

  useEffect(() => {
    dispatch(getMePurchasedVouchers({ plotName: searchVoucher }))
  }, [dispatch, searchVoucher])

  useEffect(() => {
    setSortedVouchers(meVouchers)
  }, [meVouchers])

  useEffect(() => {
    const sortVouchers = (type: string | null) => {
      if (type === "ACTUAL") {
        return meVouchers.filter(
          voucher => voucher.endDate > getFormattedDate(new Date())
        )
      } else if (type === "ARCHIVE") {
        return meVouchers.filter(
          voucher => voucher.endDate < getFormattedDate(new Date())
        )
      }
      return meVouchers
    }

    const newSortedVouchers = sortVouchers(activeVoucherType)
    setSortedVouchers(newSortedVouchers)
  }, [activeVoucherType, meVouchers])

  const sortedByVoucherType = (selectedVoucherType: string | null) => {
    setActiveVoucherType(selectedVoucherType)
  }

  return (
    <main className="me-vouchers-page">
      <MeVouchersHead
        activeVoucherType={activeVoucherType}
        sortedByVoucherType={sortedByVoucherType}
        searchVoucher={searchVoucher}
        setSearchVoucher={setSearchVoucher}
      />
      {loading ? <Loader /> : <MeVouchersList vouchers={sortedVouchers} />}
    </main>
  )
}
export default MeVouchersPage
