import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import Button from "../../../components/UI/buttons/Button"
import LinkButton from "../../../components/UI/buttons/LinkButton"
import Input from "../../../components/UI/Input"
import { useAppDispatch, useAppSelector } from "../../../store"
import {
  loginWithEmail,
  loginWithPhone
} from "../../../store/actions/authActions"
import { authFetchError } from "../../../store/slices/authSlice"
import LangSelect from "../../../components/LangSelect"
import AuthTabs from "../components/AuthTabs"
import "./style.scss"

export type AuthStateType = {
  email?: string
  phoneNumber?: string
  password: string
}

const AuthPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("email")

  const initialState: AuthStateType =
    activeTab === "email"
      ? { email: "", password: "" }
      : { phoneNumber: "", password: "" }

  const [state, setState] = useState<AuthStateType>(initialState)
  const [isDisabled, setDisabled] = useState(true)
  const error = useAppSelector(state => state.auth.error)

  useEffect(() => {
    if (activeTab === "email") {
      state.email && state.password && setDisabled(false)
    } else {
      state.phoneNumber && state.password && setDisabled(false)
    }
  }, [activeTab, state])

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(authFetchError(null))
    const { name, value } = event.target
    setState(prev => ({ ...prev, [name]: value }))
  }

  const BreakAfterExclamation: React.FC<{ text: string }> = ({ text }) => {
    const parts = text.split("!")
    return (
      <h1>
        {parts[0]}!<br />
        {parts[1]}
      </h1>
    )
  }

  const onSubmit = async () => {
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
      navigate("/main")
    }
  }

  return (
    <div className="auth">
      <div className="auth__img">
        <img src="static/images/auth-image.png" alt="auth-image" />
      </div>

      <div className="auth__main">
        <img src="static/images/logo.png" alt="logo" />
        <BreakAfterExclamation text={t("authPage.title")} />

        <form className="auth__form">
          <AuthTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            state={state}
            onChangeHandler={onChangeHandler}
          />
          <Input
            name="password"
            type="password"
            placeholder="Пароль"
            value={state.password}
            onChange={onChangeHandler}
            autoComplete="current-password"
          />
          {error ? (
            <span className="error">
              {activeTab === "email"
                ? "Почта или пароль неверные"
                : "Номер или пароль неверные"}
            </span>
          ) : (
            <Button disabled={isDisabled} type="button" onClick={onSubmit}>
              Войти
            </Button>
          )}
          <LinkButton path="/recovery-password">Забыли пароль?</LinkButton>
        </form>

        <LangSelect />
      </div>
    </div>
  )
}

export default AuthPage
