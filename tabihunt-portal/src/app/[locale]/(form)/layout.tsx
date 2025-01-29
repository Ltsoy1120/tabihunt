"use client"
import { usePathname } from "next/navigation"
import AccountFormHeader from "@/components/headers/AccountFormHeader"
import VoucherFormHeader from "@/components/headers/VoucherFormHeader"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/store"
import { getMeHunter } from "@/store/actions/hunterActions"
import MembershipFormHeader from "@/components/headers/MembershipFormHeader"
import PurchasedVouchersFormHeader from "@/components/headers/PurchasedVouchersFormHeader"
import useIsMobile from "@/hooks/useIsMobile"

export default function FormLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const isMobile = useIsMobile()
  const { me } = useAppSelector(state => state.hunters)
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("accessToken"))
  }, [])

  useEffect(() => {
    if (!me && isAuth) {
      dispatch(getMeHunter())
    }
  }, [me, isAuth, dispatch])

  const getFormHeader = () => {
    switch (true) {
      case pathname.includes("purchased-vouchers/"):
        return <PurchasedVouchersFormHeader />
      case pathname.includes("account"):
        return <AccountFormHeader />
      case pathname.includes("voucher"):
        return <VoucherFormHeader isMobile={isMobile} />
      case pathname.includes("memberships"):
        return <MembershipFormHeader />

      default:
        break
    }
  }

  return (
    <div className="form-layout" style={{ height: "100svh" }}>
      {getFormHeader()}
      {children}
    </div>
  )
}
