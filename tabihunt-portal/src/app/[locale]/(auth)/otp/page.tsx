"use client"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import OtpInput from "react18-input-otp"
import TextButton from "@/components/UI/buttons/TextButton"
import Button from "@/components/UI/buttons/Button"
import ErrorInfo from "@/components/ErrorInfo"
import { authService } from "@/services/auth.service"
import { AuthStateType } from "@/models/auth"
import { useAppDispatch, useAppSelector } from "@/store"
import {
  authFetchError,
  setLoginData,
  setRegisterData
} from "@/store/slices/authSlice"
import {
  sendOtpEmail,
  sendOtpPhone,
  verifyOtpEmail,
  verifyOtpPhone
} from "@/store/actions/authActions"
import Image from "next/image"
import Loader from "@/components/loaders/Loader"
import { useTranslation } from "react-i18next"
import "./style.scss"

const OtpPage = () => {
  const { t } = useTranslation()
  const params = useParams()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const error = useAppSelector(state => state.auth.error)
  const [leftTime, setLeftTime] = useState<any>()
  const [leftSeconds, setLeftSeconds] = useState<number>(60)
  const [isBlocked, setIsBlocked] = useState<boolean>(false)
  const { registerData, loginData } = useAppSelector(state => state.auth)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [state, setState] = useState<AuthStateType>({
    email: "",
    phoneNumber: "",
    password: "",
    otp: ""
  })

  useEffect(() => {
    if (registerData) {
      if (registerData?.email) {
        setState({
          email: registerData?.email,
          password: registerData.password ?? "",
          otp: ""
        })
      } else {
        setState({
          phoneNumber: registerData?.phoneNumber,
          password: registerData.password ?? "",
          otp: ""
        })
      }
    }
    if (loginData) {
      if (loginData?.email) {
        setState({
          email: loginData?.email,
          otp: ""
        })
      } else {
        setState({
          phoneNumber: loginData?.phoneNumber,
          otp: ""
        })
      }
    }
  }, [registerData, loginData])

  useEffect(() => {
    const runTimer = () => {
      if (leftSeconds > 0) {
        setLeftTime(
          parseInt(String(leftSeconds / 60)) +
            ":" +
            String(leftSeconds % 60).padStart(2, "0")
        )
        setLeftSeconds(leftSeconds - 1)
      }
    }
    leftSeconds > 60 && setIsBlocked(true)
    leftSeconds === 0 && setIsBlocked(false)

    const timer = setInterval(() => {
      runTimer()
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [leftSeconds])

  const handleChange = (value: string) => {
    dispatch(authFetchError(null))
    setState(prev => ({ ...prev, otp: value }))
  }

  const updateCodeHandler = async () => {
    const { email, phoneNumber } = state
    let status
    email && (status = await dispatch(sendOtpEmail(email)))
    phoneNumber &&
      (status = await dispatch(sendOtpPhone(phoneNumber.replace(/\D/g, ""))))
    if (status && status >= 200 && status < 300) {
      setState(prev => ({ ...prev, otp: "" }))
      dispatch(authFetchError(null))
      setLeftSeconds(60)
    }
  }

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (state.otp?.length !== 6 || error || isBlocked) {
      return
    }

    if (evt.key === "Enter") {
      evt.preventDefault()
      onSubmit()
    }
  }

  const onSubmit = async () => {
    setIsLoading(true)
    const { email, phoneNumber, otp } = state

    let status
    if (email && otp) {
      status = await dispatch(verifyOtpEmail({ email, otp }))
    }
    if (phoneNumber && otp) {
      status = await dispatch(verifyOtpPhone({ phoneNumber, otp }))
    }
    if (status && status >= 200 && status < 300) {
      if (registerData) {
        dispatch(setRegisterData(state))
        router.push(`/${params.locale}/new-account/personal-data`)
      }
      if (loginData) {
        dispatch(setLoginData(state))
        router.push(`/${params.locale}/new-password`)
      }
    } else {
      setIsLoading(false)
    }
  }

  return (
    <div className="otp-page">
      <div className="otp-page__title">
        <Image
          src="/static/images/logo.png"
          alt="logo"
          width={140}
          height={40}
          onClick={() => router.push(`/${params.locale}/`)}
        />
        <h1>{t("otp.title")}</h1>
        {state.email && <p>{state.email}</p>}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="otp-page__form">
          <div className="otp-page__inputs" onKeyDown={handleKeyDown}>
            <OtpInput
              value={state.otp}
              onChange={handleChange}
              numInputs={6}
              shouldAutoFocus
              autoComplete="one-time-code"
              isInputNum
              inputStyle={{ width: "100%" }}
              containerStyle={{ gap: "10px" }}
              className={error ? "code-error" : ""}
            />
          </div>

          {leftSeconds > 0 ? (
            <span className="otp-page__info">
              {t("otp.resend-info")} {leftTime ? leftTime : "..."}
            </span>
          ) : (
            <TextButton onClick={updateCodeHandler}>
              {t("otp.resend-button")}
            </TextButton>
          )}
        </div>
      )}
      <div className="otp-page__btns">
        {error ? (
          <ErrorInfo textError={t("otp.error")} />
        ) : !state.otp ? (
          <TextButton disabled={!state.otp}>{t("otp.button")}</TextButton>
        ) : (
          <Button onClick={onSubmit} type="button">
            {t("otp.button")}
          </Button>
        )}

        <TextButton onClick={() => router.push(`/${params.locale}/`)}>
          {t("otp.reset-button")}
        </TextButton>
      </div>
    </div>
  )
}

export default OtpPage
