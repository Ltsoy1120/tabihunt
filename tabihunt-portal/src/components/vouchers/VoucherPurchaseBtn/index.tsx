"use client"
import LoginPopUp from "@/components/auth/LoginPopUp"
import Button from "@/components/UI/buttons/Button"
import { useAppDispatch, useAppSelector } from "@/store"
import { setIsAuth } from "@/store/slices/authSlice"
import { useParams, useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import VoucherPurchaseWarning from "../VoucherPurchaseWarning"

const VoucherPurchaseBtn = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const router = useRouter()
  const { t } = useTranslation()
  const [showWarning, setShowWarning] = useState(false)
  const [isOpenLoginPopUp, setOpenLoginPopUp] = useState(false)
  const { isAuth } = useAppSelector(state => state.auth)

  useEffect(() => {
    !isAuth && dispatch(setIsAuth(!!localStorage.getItem("accessToken")))
  }, [isAuth, dispatch])

  const clickHandler = () => {
    isAuth
      ? router.push(`/${params.locale}/vouchers/${params.id}/purchase/stage1`)
      : setShowWarning(true)
  }
  const loginClickHandler = () => {
    setOpenLoginPopUp(true)
    setShowWarning(false)
  }
  return (
    <>
      <Button onClick={clickHandler} className="purchase-btn">
        {t("page.button")}
      </Button>
      {showWarning && (
        <VoucherPurchaseWarning
          close={() => setShowWarning(false)}
          loginClickHandler={loginClickHandler}
        />
      )}
      {isOpenLoginPopUp && (
        <LoginPopUp close={() => setOpenLoginPopUp(false)} />
      )}
    </>
  )
}

export default VoucherPurchaseBtn
