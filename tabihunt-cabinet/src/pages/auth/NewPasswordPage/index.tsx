import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import Button from "../../../components/UI/buttons/Button"
import Input from "../../../components/UI/Input"
import {
  validatePassword,
  validatePasswordRepeat
} from "../../../helpers/validate"
import { useAppDispatch, useAppSelector } from "../../../store"
import {
  passwordResetEmail,
  passwordResetPhone
} from "../../../store/actions/authActions"
import "./style.scss"

const NewPasswordPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { otpData } = useAppSelector(state => state.auth)
  const [state, setState] = useState({
    password: "",
    repeatPassword: ""
  })
  const [errors, setErrors] = useState({
    password: "",
    passwordRepeat: ""
  })

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState(prev => ({ ...prev, [name]: value }))

    if (name === "password") {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }))
    }

    if (name === "repeatPassword") {
      setErrors(prev => ({
        ...prev,
        passwordRepeat: validatePasswordRepeat(state.password, value)
      }))
    }
  }

  const onSubmit = async () => {
    let resp
    if (otpData) {
      if ("email" in otpData) {
        resp = await dispatch(
          passwordResetEmail({
            email: otpData.email,
            newPassword: state.password,
            otp: otpData.otp
          })
        )
      } else if ("phoneNumber" in otpData) {
        resp = await dispatch(
          passwordResetPhone({
            phoneNumber: otpData.phoneNumber,
            newPassword: state.password,
            otp: otpData.otp
          })
        )
      }
      if (resp === 204) {
        navigate("/")
      }
    }
  }

  return (
    <div className="new-password">
      <div className="new-password__title">
        <img src="static/images/logo.png" alt="logo" />
        <h1>{t("newPasswordPage.title")}</h1>
      </div>

      <form className="new-password__form">
        <Input
          name="password"
          type="password"
          placeholder="Пароль"
          value={state.password}
          onChange={onChangeHandler}
        />
        {errors.password && (
          <div className="new-password__error">{errors.password}</div>
        )}
        <Input
          name="repeatPassword"
          type="password"
          placeholder="Пароль"
          value={state.repeatPassword}
          onChange={onChangeHandler}
        />
        {errors.passwordRepeat && (
          <div className="new-password__error">{errors.passwordRepeat}</div>
        )}
        <div className="new-password__info">
          Пароль должен содержать латинские буквы верхнего и нижнего регистра, а
          так же цифры и символы #!"№;%:?*()_+/\/.
        </div>
      </form>

      <Button
        type="button"
        disabled={!!errors.password && !!errors.passwordRepeat}
        onClick={onSubmit}
      >
        Обновить
      </Button>
    </div>
  )
}

export default NewPasswordPage
