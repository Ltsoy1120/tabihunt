"use client"
import LoginPopUp from "@/components/auth/LoginPopUp"
import Back from "@/components/Back"
import LangSelect from "@/components/LangSelect"
import Icon from "@/components/UI/Icon"
import { getRegionIdFromPath } from "@/helpers/common"
import { useAppDispatch, useAppSelector } from "@/store"
import { getHuntingSocietyById } from "@/store/actions/huntingSocietiesActions"
import { setIsAuth } from "@/store/slices/authSlice"
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import "./style.scss"

interface PageHeaderProps {
  isMobile: boolean
}

const PageHeader = ({ isMobile }: PageHeaderProps) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const params = useParams()
  const [isOpenLoginPopUp, setOpenLoginPopUp] = useState(false)
  const { isAuth } = useAppSelector(state => state.auth)

  useEffect(() => {
    !isAuth && dispatch(setIsAuth(!!localStorage.getItem("accessToken")))
  }, [isAuth, dispatch])

  useEffect(() => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id
    if (id) {
      if (pathname.includes("/hunting-societies")) {
        dispatch(getHuntingSocietyById(id))
      }
    }
  }, [params.id, dispatch, pathname])

  const getTitle = () => {
    switch (true) {
      case pathname.includes("/huntsman"):
        return ""
      case pathname.includes("/voucher"):
        return t("page-header.voucher")
      case pathname.includes("/hunting-societies"):
        return t("page-header.hunting-society")
      case pathname.includes("/plot-descriptions"):
        return t("page-header.plot-description")
      default:
        break
    }
  }
  return (
    <>
      <header className="page-header">
        {isMobile ? (
          <Back isMobile={isMobile} />
        ) : (
          <Link
            className="header__logo"
            href={`${
              getRegionIdFromPath(pathname)
                ? `/${params.locale}/regions/${getRegionIdFromPath(pathname)}`
                : `/${params.locale}/`
            }`}
          >
            <Image
              src="/static/images/logo.png"
              alt="logo"
              width={140}
              height={40}
            />
          </Link>
        )}

        <h2>{getTitle()}</h2>
        {!isMobile ? (
          <LangSelect />
        ) : isAuth ? (
          <Link href={`/${params.locale}/account`}>
            <Icon name="account-mobile" size={40} />
          </Link>
        ) : (
          <Icon
            name="login-mobile"
            size={40}
            onClick={() => setOpenLoginPopUp(true)}
          />
        )}
      </header>

      {isOpenLoginPopUp && (
        <LoginPopUp close={() => setOpenLoginPopUp(false)} />
      )}
    </>
  )
}

export default PageHeader
