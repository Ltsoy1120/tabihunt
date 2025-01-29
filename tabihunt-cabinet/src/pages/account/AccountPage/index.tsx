import { useNavigate } from "react-router-dom"
import TextButton from "../../../components/UI/buttons/TextButton"
import { logout } from "../../../store/actions/authActions"
import "./style.scss"
import AccountCard from "../component/AccountCard"
import Button from "../../../components/UI/buttons/Button"
import { useAppDispatch, useAppSelector } from "../../../store"
import { useEffect, useState } from "react"
import { getAccountInfo } from "../../../store/actions/accountAction"
import InlineLoader from "../../../components/UI/loaders/InlineLoader"
import { useTranslation } from "react-i18next"
import AccountModalSettings from "../component/AccountModalSettings"
import { authSlice } from "../../../store/slices/authSlice"
import AccountAgreeModal from "../component/AccountAgreeModal"
import Loader from "../../../components/UI/loaders/Loader"

const PHONE_TYPE = "phone"
const EMAIL_TYPE = "email"
const PASS_TYPE = "password"
type State = {
  settingsModalShow: boolean
  langModalShow: boolean
  agreeModalShow: boolean
  supportModalShow: boolean
}
const AccountPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [state, setState] = useState<State>({
    settingsModalShow: false,
    langModalShow: false,
    agreeModalShow: false,
    supportModalShow: false
  })
  const { account, loading } = useAppSelector(state => state.account)
  const getAccountLoading: boolean = useAppSelector(
    state => state.account.loading
  )
  const lang: string = useAppSelector(state => state.auth.lang)

  useEffect(() => {
    dispatch(getAccountInfo())
  }, [])

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refreshToken")
    if (refreshToken) {
      await logout(refreshToken)
      navigate("/login")
    } else navigate("/login")
  }

  const getLangText = (lang: string) => {
    if (lang === "ru") return "Русский"
    else return "Қазақ"
  }
  const closeSettingModal = () => {
    setState({ ...state, settingsModalShow: false })
  }
  const closeLangModal = () => {
    setState({ ...state, langModalShow: false })
  }
  const openSettingsModal = () => {
    setState({ ...state, settingsModalShow: true })
  }
  const closeSettingsAndOpenLangModal = () => {
    setState({ ...state, settingsModalShow: false, langModalShow: true })
  }

  const openAgreeModal = () => {
    setState({ ...state, agreeModalShow: true })
  }
  const closeAgreeModal = () => {
    setState({ ...state, agreeModalShow: false })
  }
  const openSupportModal = () => {
    setState({ ...state, supportModalShow: true })
  }
  const closeSupportModal = () => {
    setState({ ...state, supportModalShow: false })
  }

  const changeLang = (lang: string) => {
    dispatch(authSlice.actions.setLanguage(lang))
    setState({ ...state, settingsModalShow: false, langModalShow: false })
  }
  const openChangePhoneOrEmailPage = (type: string) => {
    navigate(`/account/${type}`)
  }
  return (
    <>
      {!loading ? (
        <>
          <AccountAgreeModal
            show={state.agreeModalShow}
            title={t("accountPage.quit")}
            onClose={closeAgreeModal}
            onClickNo={closeAgreeModal}
            onClickYes={handleLogout}
          />
          <AccountModalSettings
            show={state.supportModalShow}
            title={t("accountPage.support")}
            onClose={closeSupportModal}
            dataList={[
              {
                text: "+7 777 777 77 77",
                onClick: () => {},
                subText: "",
                canClick: false
              },
              {
                text: "support@ymail.ru",
                onClick: () => {},
                subText: "",
                canClick: false
              }
            ]}
          />
          <AccountModalSettings
            show={state.langModalShow}
            title={t("accountPage.select")}
            onClose={closeLangModal}
            dataList={[
              {
                text: "Русский язык",
                onClick: () => changeLang("ru"),
                subText: "",
                canClick: true
              },
              {
                text: "Қазақ тілі",
                onClick: () => changeLang("kz"),
                subText: "",
                canClick: true
              }
            ]}
          />
          <AccountModalSettings
            show={state.settingsModalShow}
            title={t("accountPage.settings")}
            onClose={closeSettingModal}
            dataList={[
              {
                text: t("accountPage.email"),
                onClick: () => openChangePhoneOrEmailPage(EMAIL_TYPE),
                subText: "",
                canClick: true
              },
              {
                text: t("accountPage.phoneNumber"),
                onClick: () => openChangePhoneOrEmailPage(PHONE_TYPE),
                subText: "",
                canClick: true
              },
              {
                text: t("accountPage.password"),
                onClick: () => openChangePhoneOrEmailPage(PASS_TYPE),
                subText: "",
                canClick: true
              },
              {
                text: t("accountPage.lang"),
                onClick: () => closeSettingsAndOpenLangModal(),
                subText: getLangText(lang),
                canClick: true
              }
            ]}
          />
          <div className="account__container">
            <div className="account__info">
              <div className="account__info-head">
                {getAccountLoading ? (
                  <InlineLoader height={24} />
                ) : (
                  <p className="account__info-head-title"> {account.name}</p>
                )}
                {getAccountLoading ? (
                  <InlineLoader height={18} />
                ) : (
                  <p className="account__info-head-text">
                    {t("accountPage.bin")}: {account.bin}
                  </p>
                )}
              </div>

              <div className="account__info-content">
                <AccountCard
                  isLoading={getAccountLoading}
                  title={t("accountPage.contactInfo")}
                  subTitle={t("accountPage.subhead")}
                  data={[
                    {
                      name: t("accountPage.phoneNumber"),
                      value: account.user.phoneNumber
                    },
                    {
                      name: t("accountPage.email"),
                      value: account.user.email
                    }
                  ]}
                />
                <AccountCard
                  isLoading={getAccountLoading}
                  title={t("accountPage.location")}
                  subTitle={t("accountPage.subhead")}
                  data={[
                    {
                      name: t("accountPage.region"),
                      value: account.address.region.name
                    },
                    {
                      name: t("accountPage.street"),
                      value: account.address.street
                    },
                    {
                      name: t("accountPage.home"),
                      value: account.address.houseNumber
                    }
                  ]}
                />
                <div className="account__info-btns">
                  <Button
                    onClick={openAgreeModal}
                    className="account__info-btns-btn account__info-btns-btn--gray"
                    disabled={getAccountLoading}
                  >
                    {t("accountPage.logout")}
                  </Button>
                  <Button
                    className="account__info-btns-btn account__info-btns-btn--brown"
                    disabled={getAccountLoading}
                    onClick={openSettingsModal}
                  >
                    {t("accountPage.settings")}
                  </Button>
                </div>
              </div>
            </div>

            <div className="account__info-bottom">
              <TextButton
                disabled={getAccountLoading}
                onClick={() => openSupportModal()}
              >
                {t("accountPage.connectToSupport")}
              </TextButton>
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </>
  )
}

export default AccountPage
