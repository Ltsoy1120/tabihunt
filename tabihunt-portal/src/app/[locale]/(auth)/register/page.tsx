"use client"
import { useEffect, useState } from "react"
import Input from "@/components/UI/Input"
import Button from "@/components/UI/buttons/Button"
import LangSelect from "@/components/LangSelect"
import {
  validateEmail,
  validatePassword,
  validatePasswordRepeat,
  validatePhoneNumber
} from "@/helpers/validate"
import ErrorInfo from "@/components/ErrorInfo"
import { useAppDispatch, useAppSelector } from "@/store"
import { resetAuth, setRegisterData } from "@/store/slices/authSlice"
import { AuthStateType } from "@/models/auth"
import { useParams, useRouter } from "next/navigation"
// import AuthTabs from "@/components/auth/AuthTabs"
import Image from "next/image"
import { sendOtpEmail, sendOtpPhone } from "@/store/actions/authActions"
import { getUsersExists } from "@/store/actions/hunterActions"
import { huntersFetchError, resetHunter } from "@/store/slices/huntersSlice"
import { useTranslation } from "react-i18next"
import "./style.scss"

export default function RegisterPage() {
  const { t } = useTranslation()
  const params = useParams()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("email")
  const { error } = useAppSelector(state => state.hunters)

  const initialState: AuthStateType =
    activeTab === "email"
      ? { email: "", password: "", otp: "" }
      : { phoneNumber: "", password: "", otp: "" }

  const [state, setState] = useState<AuthStateType>(initialState)

  const [repeatPassword, setRepeatPassword] = useState("")

  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    repeatPassword: ""
  })
  const [isDisabled, setDisabled] = useState(true)

  useEffect(() => {
    dispatch(resetAuth())
    dispatch(resetHunter())
  }, [dispatch])

  useEffect(() => {
    if (activeTab === "email") {
      !error && state.email && state.password && setDisabled(false)
    } else {
      !error && state.phoneNumber && state.password && setDisabled(false)
    }
  }, [activeTab, state, error])

  const onChangeHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setErrors(prev => ({ ...prev, email: "", phoneNumber: "" }))
    dispatch(huntersFetchError(null))
    const { name, value } = event.target

    if (name === "email") {
      const emailError = validateEmail(value)
      setErrors(prev => ({ ...prev, email: emailError }))
    }

    if (name === "phoneNumber") {
      const phoneNumberError = validatePhoneNumber(value)
      setErrors(prev => ({ ...prev, phoneNumber: phoneNumberError }))
    }

    if (name === "password") {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }))
    }

    if (name === "repeatPassword") {
      setErrors(prev => ({
        ...prev,
        repeatPassword: validatePasswordRepeat(state.password ?? "", value)
      }))
      setRepeatPassword(value)
    }
    setState(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = async () => {
    const { email, phoneNumber, password, otp } = state

    let resp

    if (activeTab === "email" && email) {
      const status = await dispatch(getUsersExists({ email }))
      if (status && status >= 200 && status < 300) {
        dispatch(setRegisterData({ email, password, otp }))
        resp = await dispatch(sendOtpEmail(email))
      }
    } else if (activeTab === "phoneNumber" && phoneNumber) {
      const status = await dispatch(getUsersExists({ phoneNumber }))
      if (status && status >= 200 && status < 300) {
        dispatch(setRegisterData({ phoneNumber, password, otp }))
        await dispatch(sendOtpPhone(phoneNumber.replace(/\D/g, "")))
      }
    }

    if (resp) {
      router.push(`/${params.locale}/otp`)
    }
  }

  return (
    <>
      <div className="register-page">
        <Image
          src="/static/images/logo.png"
          alt="logo"
          width={140}
          height={40}
          onClick={() => router.push(`/${params.locale}/`)}
        />
        <h1> {t("register.title")}</h1>

        <form className="register-page__form">
          {/* <AuthTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            state={state}
            onChangeHandler={onChangeHandler}
            emailError={error || !!errors.email}
            phoneError={error || !!errors.phoneNumber}
          /> */}
          <Input
            name="email"
            placeholder={t("placeholder.email")}
            autoComplete="on"
            autoFocus
            value={state.email ?? ""}
            onChange={onChangeHandler}
            error={error || !!errors.email}
          />
          <Input
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder={t("placeholder.new-password")}
            value={state.password ?? ""}
            onChange={onChangeHandler}
            error={!!errors.password}
          />
          <Input
            name="repeatPassword"
            type="password"
            autoComplete="new-password"
            placeholder={t("placeholder.repeat-password")}
            value={repeatPassword}
            onChange={onChangeHandler}
            error={!!errors.repeatPassword}
          />
          <div className="password-info">
            {t("new-password.info")} #!&quot;№;%:?*()_+/\/.
          </div>
          {error?.response?.status === 409 ||
          !!errors.email ||
          !!errors.password ||
          !!errors.repeatPassword ? (
            <ErrorInfo
              textError={
                error?.response?.data.message ||
                errors.email ||
                errors.password ||
                errors.repeatPassword
              }
            />
          ) : (
            <Button disabled={isDisabled} type="button" onClick={onSubmit}>
              {t("register.button")}
            </Button>
          )}
        </form>

        <LangSelect />
      </div>
    </>
  )
}
