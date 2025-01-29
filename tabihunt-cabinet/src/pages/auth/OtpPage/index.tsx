import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import OtpInput from "react18-input-otp"
import TextButton from "../../../components/UI/buttons/TextButton"
import { useAppDispatch, useAppSelector } from "../../../store"
import {
  sendOtpEmail,
  sendOtpPhone,
  verifyOtpEmail,
  verifyOtpPhone
} from "../../../store/actions/authActions"
import { authFetchError } from "../../../store/slices/authSlice"
import "./style.scss"
import Button from "../../../components/UI/buttons/Button";

const OtpPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [otp, setOtp] = useState<string>("")
  const error = useAppSelector(state => state.auth.error)

  const [leftTime, setLeftTime] = useState<string>()
  const [leftSeconds, setLeftSeconds] = useState<number>(60)
  const [isBlocked, setIsBlocked] = useState<boolean>(false)
  const { loginData } = useAppSelector(state => state.auth)

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
    setOtp(value)
  }

  const updateCodeHandler = async () => {
    if (loginData) {
      if ("email" in loginData) {
        await dispatch(sendOtpEmail(loginData.email))
      } else if ("phoneNumber" in loginData) {
        await dispatch(sendOtpPhone(loginData.phoneNumber))
      }
    }

    setOtp("")
    setLeftSeconds(60);
    dispatch(authFetchError(null))
  }

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (otp.length !== 6 || error || isBlocked) {
      return
    }

    if (evt.key === "Enter") {
      onSubmit()
    }
  }

  const onSubmit = async () => {
    let resp
    if (loginData) {
      if ("email" in loginData) {
        resp = await dispatch(verifyOtpEmail({ email: loginData.email, otp }))
      } else if ("phoneNumber" in loginData) {
        resp = await dispatch(
          verifyOtpPhone({ phoneNumber: loginData.phoneNumber, otp })
        )
      }
      if (resp === 204) {
        if (location.pathname.includes('account')) {
          navigate('/account')
        }
        else navigate("/new-password")
      }
    }
  }
  const cancelHandler = () => {
    navigate('/')
  }

  return (
    <div className="otp">
      <div className="otp__title">
        <img src="/static/images/logo.png" alt="logo" />

        {loginData &&
          ("email" in loginData ? (
            <>
              <h1>{t("otpPage.titleEmail")}</h1>
              <p>{loginData.email}</p>
            </>
          ) : (
            <>
              <h1>{t("otpPage.titlePhone")}</h1>
              <p>{loginData.phoneNumber}</p>
            </>
          ))}
      </div>

      <div className="otp__form">
        <div className="otp__inputs" onKeyDown={handleKeyDown}>
          <OtpInput
            value={otp}
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
          <span className="otp__info">
            Отправить повторно через {leftTime ? leftTime : "..."}
          </span>
        ) : (
          <TextButton onClick={updateCodeHandler}>
            Отправить повторно
          </TextButton>
        )}
      </div>

      <div className="button-container">
        {error ? (
          <span className="error">Данный код не подходит</span>
        ) : (
          <Button disabled={!otp} onClick={onSubmit}>
            {t("accountPage.next")}
          </Button>
        )}
        <div className="m-t-20">
          <TextButton onClick={cancelHandler}>
            {t("accountPage.cancel")}
          </TextButton>
        </div>
      </div>
    </div>
  )
}

export default OtpPage
