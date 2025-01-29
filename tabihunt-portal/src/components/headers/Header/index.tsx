"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import LangSelect from "@/components/LangSelect"
import Button from "../../UI/buttons/Button"
import RegionsModal from "@/components/modals/RegionsModal"
import { RegionDto } from "@/models/common"
import OutlineButton from "@/components/UI/buttons/OutlineButton"
import { useParams, usePathname, useRouter } from "next/navigation"
import { getRegionIdFromPath } from "@/helpers/common"
import { useAppDispatch, useAppSelector } from "@/store"
import { getRegions } from "@/store/actions/commonActions"
import { getMeHunter } from "@/store/actions/hunterActions"
import { useTranslation } from "react-i18next"
import "./style.scss"
import Icon from "@/components/UI/Icon"
import SideBar from "@/components/SideBar"
import LoginPopUp from "@/components/auth/LoginPopUp"
import { setIsAuth } from "@/store/slices/authSlice"

interface HeaderProps {
  isMobile: boolean
}
const Header = ({ isMobile }: HeaderProps) => {
  const { t } = useTranslation()
  const params = useParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const { regions } = useAppSelector(state => state.common)
  const { me } = useAppSelector(state => state.hunters)
  const [isOpenModal, setOpenModal] = useState(false)
  const [isOpenSideBar, setOpenSideBar] = useState(false)
  const [isOpenLoginPopUp, setOpenLoginPopUp] = useState(false)
  const [activeRegion, setActiveRegion] = useState<RegionDto | null>(null)
  const { isAuth } = useAppSelector(state => state.auth)
  // const [isLandscape, setIsLandscape] = useState(false)

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     // Определяем начальную ориентацию
  //     const checkOrientation = () => {
  //       setIsLandscape(window.matchMedia("(orientation: landscape)").matches)
  //     }

  //     // Проверяем ориентацию при первой загрузке
  //     checkOrientation()

  //     // Отслеживаем изменения ориентации
  //     const mediaQuery = window.matchMedia("(orientation: landscape)")
  //     mediaQuery.addEventListener("change", checkOrientation)

  //     // Убираем слушатель при размонтировании компонента
  //     return () => mediaQuery.removeEventListener("change", checkOrientation)
  //   }
  // }, [])

  useEffect(() => {
    !isAuth && dispatch(setIsAuth(!!localStorage.getItem("accessToken")))
  }, [isAuth, dispatch])

  useEffect(() => {
    if (!me && isAuth) {
      dispatch(getMeHunter())
    }
  }, [me, isAuth, dispatch])

  useEffect(() => {
    dispatch(getRegions())
  }, [dispatch, params.locale])

  useEffect(() => {
    if (regions?.length > 0) {
      const regionByPathname = regions.find(
        region => region.id === getRegionIdFromPath(pathname)
      )

      setActiveRegion(regionByPathname ?? regions[0])
    }
  }, [regions, pathname])

  const selectRegion = (region: RegionDto) => {
    setActiveRegion(region)
    router.push(`/${params.locale}/regions/${region.id}`)
  }

  return (
    <>
      {isMobile ? (
        <header className="header">
          <Icon
            name="burger-mobile"
            size={40}
            onClick={() => setOpenSideBar(true)}
          />
          <div className="header__actions">
            {regions.length > 0 && activeRegion && (
              <OutlineButton endIcon="geo" onClick={() => setOpenModal(true)}>
                {activeRegion?.name.split(" ")[0]}
              </OutlineButton>
            )}
            {isAuth ? (
              <>
                <Link href={`/${params.locale}/account`}>
                  <Icon name="account-mobile" size={40} />
                </Link>
                <Link href={`/${params.locale}/notifications`}>
                  <Icon name="bell-mobile" size={40} />
                </Link>
              </>
            ) : (
              <Icon
                name="login-mobile"
                size={40}
                onClick={() => setOpenLoginPopUp(true)}
              />
            )}
          </div>
          {isOpenSideBar && (
            <SideBar isMobile={isMobile} close={() => setOpenSideBar(false)} />
          )}
        </header>
      ) : (
        <header className="header">
          <Link
            className="header__logo"
            href={`${
              activeRegion &&
              activeRegion?.id !== "518fd3e8-5b63-4b63-b0a9-000000000001"
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
          <div className="header__actions">
            {regions.length > 0 && activeRegion && (
              <OutlineButton endIcon="geo" onClick={() => setOpenModal(true)}>
                {activeRegion?.name}
              </OutlineButton>
            )}
            <LangSelect />
            {isAuth && me ? (
              <>
                <Link href={`/${params.locale}/account`}>
                  <OutlineButton className="account-btn" endIcon="user">
                    {`${me?.lastname} ${me?.firstname}`}
                  </OutlineButton>
                </Link>
                <Link href={`/${params.locale}/notifications`}>
                  <Icon name="bell-mobile" size={40} />
                </Link>
              </>
            ) : (
              <Button startIcon="user" onClick={() => setOpenLoginPopUp(true)}>
                {t("header.login-btn")}
              </Button>
            )}
          </div>
        </header>
      )}

      {isOpenModal && (
        <RegionsModal
          regions={regions}
          activeRegion={activeRegion}
          selectRegion={selectRegion}
          close={() => setOpenModal(false)}
        />
      )}

      {isOpenLoginPopUp && (
        <LoginPopUp close={() => setOpenLoginPopUp(false)} />
      )}
    </>
  )
}

export default Header
