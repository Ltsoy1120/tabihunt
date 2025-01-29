"use client"
import ErrorInfo from "@/components/ErrorInfo"
import ErrorModal from "@/components/ErrorModal"
import Loader from "@/components/loaders/Loader"
import TextButton from "@/components/UI/buttons/TextButton"
import { authFetchError, setLoginData } from "@/store/slices/authSlice"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import Button from "../../../../components/UI/buttons/Button"
import Input from "../../../../components/UI/Input"
import {
  validatePassword,
  validatePasswordRepeat
} from "../../../../helpers/validate"
import { useAppDispatch, useAppSelector } from "../../../../store"
import {
  passwordResetEmail,
  passwordResetPhone
} from "../../../../store/actions/authActions"
import "./style.scss"

const NewPasswordPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const params = useParams()
  const { t } = useTranslation()
  const { otpData, error } = useAppSelector(state => state.auth)
  const [state, setState] = useState({
    password: "",
    repeatPassword: ""
  })
  const [errors, setErrors] = useState({
    password: "",
    repeatPassword: ""
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState(prev => ({ ...prev, [name]: value }))

    if (name === "password") {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }))
    }

    if (name === "repeatPassword") {
      setErrors(prev => ({
        ...prev,
        repeatPassword: validatePasswordRepeat(state.password, value)
      }))
    }
  }
  const onSubmit = async () => {
    setIsLoading(true)
    let status
    if (otpData) {
      if ("email" in otpData) {
        status = await dispatch(
          passwordResetEmail({
            email: otpData.email,
            newPassword: state.password,
            otp: otpData.otp
          })
        )
      } else if ("phoneNumber" in otpData) {
        status = await dispatch(
          passwordResetPhone({
            phoneNumber: otpData.phoneNumber,
            newPassword: state.password,
            otp: otpData.otp
          })
        )
      }
      if (status && status >= 200 && status < 300) {
        dispatch(setLoginData(null))
        router.push(`/${params.locale}/login`)
      } else {
        setIsLoading(false)
      }
    }
  }

  const closeHandler = () => {
    dispatch(authFetchError(null))
    dispatch(setLoginData(null))
    router.push(`/${params.locale}/login`)
  }

  return (
    <>
      <div className="new-password">
        <div className="new-password__title">
          <Image
            src="/static/images/logo.png"
            alt="logo"
            width={140}
            height={40}
          />
          <h1>{t("new-password.title")}</h1>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <form className="new-password__form">
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
              value={state.repeatPassword}
              onChange={onChangeHandler}
              error={!!errors.repeatPassword}
            />

            <div className="new-password__info">
              {t("new-password.info")} #!&quot;№;%:?*()_+/\/.
            </div>
          </form>
        )}
        {!!errors.password || !!errors.repeatPassword ? (
          <ErrorInfo textError={errors.password || errors.repeatPassword} />
        ) : !state.password || !state.repeatPassword ? (
          <TextButton disabled={!state.password || !state.repeatPassword}>
            {t("new-password.disabled-button")}
          </TextButton>
        ) : (
          <Button type="button" onClick={onSubmit}>
            {t("new-password.button")}
          </Button>
        )}
      </div>
      {error && <ErrorModal error={error} closeHandler={closeHandler} />}
    </>
  )
}

export default NewPasswordPage
