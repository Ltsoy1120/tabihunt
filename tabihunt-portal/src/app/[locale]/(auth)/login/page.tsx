"use client"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import AuthTabs from "@/components/auth/AuthTabs"
import Input from "@/components/UI/Input"
import Button from "@/components/UI/buttons/Button"
import LangSelect from "@/components/LangSelect"
import { useAppDispatch, useAppSelector } from "@/store"
import { loginWithEmail, loginWithPhone } from "@/store/actions/authActions"
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber
} from "@/helpers/validate"
import ErrorInfo from "@/components/ErrorInfo"
import Image from "next/image"
import Loader from "@/components/loaders/Loader"
import { authFetchError, resetAuth } from "@/store/slices/authSlice"
import { resetHunter } from "@/store/slices/huntersSlice"
import "./style.scss"
import useIsTablet from "@/hooks/useIsTablet"

export type AuthStateType = {
  email?: string
  phoneNumber?: string
  password: string
}

export default function LoginPage() {
  const { t } = useTranslation()
  const params = useParams()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const isTablet = useIsTablet()
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
      router.push(`/${params.locale}/`)
    } else {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      {!isTablet && (
        <div className="login-page__img">
          <Image
            src="/static/images/auth-bg.jpg"
            alt="auth-image"
            priority
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 40vw"
          />
        </div>
      )}

      <div className="login-page__main">
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

            <form className="login-page__form">
              <AuthTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                state={state}
                onChangeHandler={onChangeHandler}
                emailError={error || !!errors.email}
                phoneError={error || !!errors.phoneNumber}
              />
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

            <div className="login-page__actions">
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
    </div>
  )
}
