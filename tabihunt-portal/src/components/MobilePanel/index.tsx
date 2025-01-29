"use client"
import { useTranslation } from "react-i18next"
import { useParams, usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import "./style.scss"
import Icon from "@/components/UI/Icon"
import { useEffect, useState } from "react"
import { classMerge, getRegionIdFromPath } from "@/helpers/common"
import { useAppDispatch, useAppSelector } from "@/store"
import { setIsAuth } from "@/store/slices/authSlice"
import { getMeHunter } from "@/store/actions/hunterActions"
import { logout } from "@/store/actions/authActions"

const MobilePanel = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()
  const [regionId, setRegionId] = useState("")
  const { isAuth } = useAppSelector(state => state.auth)
  const { me } = useAppSelector(state => state.hunters)

  useEffect(() => {
    !isAuth && dispatch(setIsAuth(!!localStorage.getItem("accessToken")))
  }, [isAuth, dispatch])

  useEffect(() => {
    if (!me && isAuth) {
      dispatch(getMeHunter())
    }
  }, [me, isAuth, dispatch])

  const navItems = [
    {
      name: `${t("mobile-panel.main")}`,
      iconName: "home-page",
      path: `${
        pathname.includes("/regions")
          ? `/${params.locale}/regions/${regionId}`
          : `/${params.locale}`
      }`
    },
    {
      name: `${t("mobile-panel.vouchers")}`,
      iconName: "vouchers-page",
      path: `${
        pathname.includes("/regions")
          ? `/${params.locale}/regions/${regionId}/vouchers`
          : `/${params.locale}/vouchers`
      }`
    },
    {
      name: `${t("mobile-panel.login-btn")}`,
      iconName: "user",
      path: `/${params.locale}/login`
    }
  ]

  const authNavItems = [
    {
      name: `${t("mobile-panel.main")}`,
      iconName: "home-page",
      path: `${
        pathname.includes("/regions")
          ? `/${params.locale}/regions/${regionId}`
          : `/${params.locale}`
      }`
    },
    {
      name: `${t("mobile-panel.vouchers")}`,
      iconName: "vouchers-page",
      path: `${
        pathname.includes("/regions")
          ? `/${params.locale}/regions/${regionId}/vouchers`
          : `/${params.locale}/vouchers`
      }`
    },
    {
      name: `${t("mobile-panel.me-account")}`,
      iconName: "account",
      path: `/${params.locale}/account`
    },
    {
      name: `${t("mobile-panel.notifications")}`,
      iconName: "bell-mobile",
      path: `/${params.locale}/notifications`
    }
  ]

  useEffect(() => {
    pathname &&
      setRegionId(
        getRegionIdFromPath(pathname) ?? "518fd3e8-5b63-4b63-b0a9-000000000001"
      )
  }, [pathname])

  const logoutHandler = async () => {
    const status = await dispatch(logout())
    if (status && status >= 200 && status < 300) {
      router.push(`/${params.locale}/`)
    }
  }

  return (
    <nav className="mobile-panel">
      {(isAuth && me ? authNavItems : navItems).map(page => (
        <Link
          href={page.path}
          key={page.name}
          className={classMerge(
            "mobile-panel__item",
            pathname === page.path ? "active" : ""
          )}
          onClick={close}
        >
          <Icon name={page.iconName} size={40} />
          <span className="title show">{page.name}</span>
        </Link>
      ))}
    </nav>
  )
}

export default MobilePanel
