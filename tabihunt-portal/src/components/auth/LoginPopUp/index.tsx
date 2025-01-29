import ErrorInfo from "@/components/ErrorInfo"
import LangSelect from "@/components/LangSelect"
import Loader from "@/components/loaders/Loader"
import Button from "@/components/UI/buttons/Button"
import Input from "@/components/UI/Input"
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber
} from "@/helpers/validate"
import useIsMobile from "@/hooks/useIsMobile"
import { useAppDispatch, useAppSelector } from "@/store"
import { loginWithEmail, loginWithPhone } from "@/store/actions/authActions"
import { authFetchError, resetAuth } from "@/store/slices/authSlice"
import { resetHunter } from "@/store/slices/huntersSlice"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Modal from "../../UI/Modal"
import AuthTabs from "../AuthTabs"
import "./style.scss"

interface AnimalTypesModalProps {
  close: () => void
}

export type AuthStateType = {
  email?: string
  phoneNumber?: string
  password: string
}

const LoginPopUp = ({ close }: AnimalTypesModalProps) => {
  const { t } = useTranslation("auth")
  const params = useParams()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isMobile = useIsMobile()
  const [activeTab, setActiveTab] = useState("email")
  const { error } = useAppSelector(state => state.auth)

  const initialState: AuthStateType =
    activeTab === "email"
      ? { email: "", password: "" }
      : { phoneNumber: "", password: "" }

  const [state, setState] = useState<AuthStateType>(initialState)
  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
    password: ""
  })
  const [isDisabled, setDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch(resetAuth())
    dispatch(resetHunter())
  }, [dispatch])

  useEffect(() => {
    if (activeTab === "email") {
      state.email && state.password && setDisabled(false)
    } else {
      state.phoneNumber && state.password && setDisabled(false)
    }
  }, [activeTab, state])

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrors(prev => ({ ...prev, email: "", phoneNumber: "" }))
    dispatch(authFetchError(null))

    const { name, value } = event.target
    if (name === "email") {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }))
    }
    if (name === "phoneNumber") {
      setErrors(prev => ({ ...prev, phoneNumber: validatePhoneNumber(value) }))
    }
    if (name === "password") {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }))
    }
    if (name === "phoneNumber") {
      setErrors(prev => ({
        ...prev,
        phoneNumber: validatePhoneNumber(value)
      }))
    }
    setState(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async () => {
    setIsLoading(true)
    const { email, phoneNumber, password } = state
    let resp
    if (activeTab === "email" && email) {
      resp = await dispatch(loginWithEmail({ email, password }))
    } else if (activeTab === "phoneNumber" && phoneNumber) {
      resp = await dispatch(
        loginWithPhone({
          phoneNumber: `+${phoneNumber.replace(/\D/g, "")}`,
          password
        })
      )
    }
    if (resp) {
      close()
    } else {
      setIsLoading(false)
    }
  }

  return (
    <Modal size={isMobile ? "90vw" : "440px"} close={close}>
      <div className="login-pop-up">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Image
              src="/static/images/logo.png"
              alt="logo"
              width={140}
              height={40}
              onClick={() => router.push(`/${params.locale}/`)}
            />
            <h1>
              {t("login.title")}
              <br />
              {t("login.subtitle")}
            </h1>

            <form className="login-pop-up__form">
              <AuthTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                state={state}
                onChangeHandler={onChangeHandler}
                emailError={error || !!errors.email}
                phoneError={error || !!errors.phoneNumber}
              />
              {/* <Input
                name="email"
                placeholder={t("placeholder.email")}
                autoComplete="on"
                autoFocus
                value={state.email ?? ""}
                onChange={onChangeHandler}
                error={error || !!errors.email}
              /> */}
              <Input
                name="password"
                type="password"
                placeholder={t("placeholder.password")}
                value={state.password}
                onChange={onChangeHandler}
                autoComplete="current-password"
                error={!!errors.password}
              />
              {error ||
              !!errors.email ||
              !!errors.phoneNumber ||
              !!errors.password ? (
                <ErrorInfo
                  textError={
                    (error?.response?.data.statusCode === 404
                      ? error?.response?.data.message
                      : t("login.error")) ||
                    errors.email ||
                    errors.phoneNumber ||
                    errors.password
                  }
                />
              ) : (
                <Button disabled={isDisabled} type="button" onClick={onSubmit}>
                  {t("login.button")}
                </Button>
              )}
            </form>

            <div className="login-pop-up__actions">
              <Link href={`/${params.locale}/reset-password`}>
                {t("login.actions.reset-password")}
              </Link>
              <Link href={`/${params.locale}/register`}>
                {t("login.actions.register")}
              </Link>
            </div>

            <LangSelect />
          </>
        )}
      </div>
    </Modal>
  )
}

export default LoginPopUp
