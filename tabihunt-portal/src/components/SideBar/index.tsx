"use client"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams, usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { classMerge, getRegionIdFromPath } from "@/helpers/common"
import { logout } from "@/store/actions/authActions"
import Icon from "../UI/Icon"
import Image from "next/image"
import LangSelect from "../LangSelect"
import { useAppDispatch, useAppSelector } from "@/store"
import { setIsAuth } from "@/store/slices/authSlice"
import "./style.scss"
import { getMeHunter } from "@/store/actions/hunterActions"

interface SideBarProps {
  isMobile?: boolean
  close?: () => void
}

const SideBar: React.FC<SideBarProps> = ({ isMobile, close }) => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()
  const [regionId, setRegionId] = useState("")
  const { isAuth } = useAppSelector(state => state.auth)
  const { me } = useAppSelector(state => state.hunters)
  const [isLandscape, setIsLandscape] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Определяем начальную ориентацию
      const checkOrientation = () => {
        setIsLandscape(window.matchMedia("(orientation: landscape)").matches)
      }

      // Проверяем ориентацию при первой загрузке
      checkOrientation()

      // Отслеживаем изменения ориентации
      const mediaQuery = window.matchMedia("(orientation: landscape)")
      mediaQuery.addEventListener("change", checkOrientation)

      // Убираем слушатель при размонтировании компонента
      return () => mediaQuery.removeEventListener("change", checkOrientation)
    }
  }, [])

  useEffect(() => {
    !isAuth && dispatch(setIsAuth(!!localStorage.getItem("accessToken")))
  }, [isAuth, dispatch])

  useEffect(() => {
    if (!me && isAuth) {
      dispatch(getMeHunter())
    }
  }, [me, isAuth, dispatch])

  const pages = [
    {
      name: `${t("sidebar.main")}`,
      iconName: "home-page",
      path: `${
        pathname.includes("/regions")
          ? `/${params.locale}/regions/${regionId}`
          : `/${params.locale}`
      }`
    },
    {
      name: `${t("sidebar.vouchers")}`,
      iconName: "vouchers-page",
      path: `${
        pathname.includes("/regions")
          ? `/${params.locale}/regions/${regionId}/vouchers`
          : `/${params.locale}/vouchers`
      }`
    },
    {
      name: `${t("sidebar.hunting-societies")}`,
      iconName: "hunting-societies-page",
      path: `${
        pathname.includes("/regions")
          ? `/${params.locale}/regions/${regionId}/hunting-societies`
          : `/${params.locale}/hunting-societies`
      }`
    },
    {
      name: `${t("sidebar.plot-descriptions")}`,
      iconName: "plot-descriptions-page",
      path: `${
        pathname.includes("/regions")
          ? `/${params.locale}/regions/${regionId}/plot-descriptions`
          : `/${params.locale}/plot-descriptions`
      }`
    },
    {
      name: `${t("sidebar.map")}`,
      iconName: "map-page",
      path: `${
        pathname.includes("/regions")
          ? `/${params.locale}/regions/${regionId}/map`
          : `/${params.locale}/map`
      }`
    },
    {
      name: `${t("sidebar.partners")}`,
      iconName: "partners-page",
      path: `${
        pathname.includes("/regions")
          ? `/${params.locale}/regions/${regionId}/partners`
          : `/${params.locale}/partners`
      }`
    }
  ]

  const authPages = [
    {
      name: `${t("sidebar.me-account")}`,
      iconName: "account",
      path: `/${params.locale}/account`
    },
    {
      name: `${t("sidebar.me-reports")}`,
      iconName: "reports-page",
      path: `/${params.locale}/me/reports`
    },
    {
      name: `${t("sidebar.me-vouchers")}`,
      iconName: "vouchers-page",
      path: `/${params.locale}/me/vouchers`
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
    <>
      {isMobile && !isLandscape ? (
        <div>
          <div className="sidebar-backdrop" onClick={close} />
          <div className={"sidebar expanded"}>
            <span className="toggleButton" onClick={close}>
              <Icon name={"arrow-left"} size={16} />
            </span>
            <div className="logo">
              <Image
                src="/static/images/logo.png"
                alt="logo"
                width={140}
                height={40}
              />
            </div>
            <div className="menu-wrapper">
              <div className="menu">
                {pages.map(page => (
                  <Link
                    href={page.path}
                    key={page.name}
                    className={classMerge(
                      "menu__item",
                      pathname === page.path ? "active" : ""
                    )}
                    onClick={close}
                  >
                    <Icon name={page.iconName} size={40} />
                    <span className="title show">{page.name}</span>
                  </Link>
                ))}
              </div>

              {isAuth && me ? (
                <div className="menu me">
                  {authPages.map(page => (
                    <Link
                      href={page.path}
                      key={page.name}
                      className={classMerge(
                        "menu__item",
                        pathname === page.path ? "active" : ""
                      )}
                      onClick={close}
                    >
                      <Icon name={page.iconName} size={40} />
                      <span className="title show">{page.name}</span>
                    </Link>
                  ))}
                  <span className="logout-btn" onClick={logoutHandler}>
                    <Icon name="logout" size={40} />
                    <span className="title show">
                      {t("sidebar.logout-btn")}
                    </span>
                  </span>
                </div>
              ) : (
                <Link href={`/${params.locale}/login`} className="login-btn">
                  <span className="login-btn__bg">
                    <Icon name="user" size={20} />
                  </span>
                  <span className="title show">{t("sidebar.login-btn")}</span>
                </Link>
              )}
            </div>
            <LangSelect />
          </div>
        </div>
      ) : (
        <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
          <span
            className="toggleButton"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Icon name={isExpanded ? "arrow-left" : "arrow-right"} size={16} />
          </span>
          <div className="menu">
            {pages.map(page => (
              <Link
                href={page.path}
                key={page.name}
                className={classMerge(
                  "menu__item",
                  pathname === page.path ? "active" : ""
                )}
              >
                <Icon name={page.iconName} size={40} />
                <span className={`title  ${isExpanded ? "show" : ""} `}>
                  {page.name}
                </span>
              </Link>
            ))}
          </div>

          {isAuth && me ? (
            <div className="menu  me">
              {authPages.map(page => (
                <Link
                  href={page.path}
                  key={page.name}
                  className={classMerge(
                    "menu__item",
                    pathname === page.path ? "active" : ""
                  )}
                >
                  <Icon name={page.iconName} size={40} />
                  <span className={`title  ${isExpanded ? "show" : ""} `}>
                    {page.name}
                  </span>
                </Link>
              ))}
              <span className="logout-btn" onClick={logoutHandler}>
                <Icon name="logout" size={40} />
                <span className={`title  ${isExpanded ? "show" : ""} `}>
                  {t("sidebar.logout-btn")}
                </span>
              </span>
            </div>
          ) : (
            <Link href={`/${params.locale}/login`} className="login-btn">
              <span className="login-btn__bg">
                <Icon name="user" size={20} />
              </span>
              <span className={`title  ${isExpanded ? "show" : ""} `}>
                {t("sidebar.login-btn")}
              </span>
            </Link>
          )}
        </div>
      )}
    </>
  )
}

export default SideBar
