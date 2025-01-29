"use client"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams, useRouter } from "next/navigation"
import Button from "../../../../components/UI/buttons/Button"
import { useAppDispatch, useAppSelector } from "../../../../store"
import {
  sendOtpEmail,
  sendOtpPhone
} from "../../../../store/actions/authActions"
import LangSelect from "../../../../components/LangSelect"
import ErrorInfo from "@/components/ErrorInfo"
import AuthTabs from "@/components/auth/AuthTabs"
import TextButton from "@/components/UI/buttons/TextButton"
import { validateEmail, validatePhoneNumber } from "@/helpers/validate"
import "./style.scss"
import Image from "next/image"
import Loader from "@/components/loaders/Loader"
import { setLoginData } from "@/store/slices/authSlice"
import Link from "next/link"
import Input from "@/components/UI/Input"

export type ResetPasswordStateType = {
  email?: string
  phoneNumber?: string
}

const ResetPasswordPage = () => {
  const dispatch = useAppDispatch()
  const params = useParams()
  const router = useRouter()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("email")
  const initialState =
    activeTab === "email" ? { email: "" } : { phoneNumber: "" }
  const { error } = useAppSelector(state => state.auth)

  const [state, setState] = useState<ResetPasswordStateType>(initialState)
  const [errors, setErrors] = useState({
    email: "",
    phoneNumber: ""
  })
  const [isDisabled, setDisabled] = useState(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    if (activeTab === "email") {
      state.email ? setDisabled(false) : setDisabled(true)
    } else {
      state.phoneNumber && setDisabled(false)
    }
  }, [activeTab, state])

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === "email") {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }))
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
    const { email, phoneNumber } = state
    let status
    if (activeTab === "email" && email) {
      status = await dispatch(sendOtpEmail(email))
      status && dispatch(setLoginData({ email }))
    } else if (activeTab === "phoneNumber" && phoneNumber) {
      status = await dispatch(sendOtpPhone(phoneNumber.replace(/\D/g, "")))
      status && dispatch(setLoginData({ phoneNumber }))
    }
    if (status && status >= 200 && status < 300) {
      router.push(`/${params.locale}/otp`)
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="reset-password">
          <Image
            src="/static/images/logo.png"
            alt="logo"
            width={140}
            height={40}
          />
          <h1>{t("reset-password.title")}</h1>
          <div className="reset-password__form">
            {/* <AuthTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              state={state}
              onChangeHandler={onChangeHandler}
              emailError={!!errors.email}
              phoneError={!!errors.phoneNumber}
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

            {!!errors.email || !!errors.phoneNumber ? (
              <ErrorInfo textError={errors.email || errors.phoneNumber} />
            ) : (
              <Button disabled={isDisabled} type="button" onClick={onSubmit}>
                {t("reset-password.button")}
              </Button>
            )}
            <Link href={`/${params.locale}/login`}>
              {t("reset-password.actions.login")}
            </Link>
          </div>

          <LangSelect />
        </div>
      )}
    </>
  )
}

export default ResetPasswordPage
