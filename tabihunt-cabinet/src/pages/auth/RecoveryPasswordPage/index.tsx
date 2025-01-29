import { useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import Button from "../../../components/UI/buttons/Button"
import LinkButton from "../../../components/UI/buttons/LinkButton"
import { useAppDispatch } from "../../../store"
import { sendOtpEmail, sendOtpPhone } from "../../../store/actions/authActions"
import LangSelect from "../../../components/LangSelect"
import AuthTabs from "../components/AuthTabs"
import "./style.scss"
import {validateEmail, validatePhoneNumber} from "../../../helpers/validate";

export type ResetPasswordStateType = {
  email?: string
  phoneNumber?: string
}

const RecoveryPasswordPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("email")
  const initialState =
    activeTab === "email" ? { email: "" } : { phoneNumber: "" }

  const [state, setState] = useState<ResetPasswordStateType>(initialState)
  const [isDisabled, setDisabled] = useState(true)

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState(prev => {
      const newState = { ...prev, [name]: value };
      const isEmailInValid = name === "email" && !validateEmail(newState.email || '');
      const isPhoneInValid = name === "phoneNumber" && !validatePhoneNumber(newState.phoneNumber || '');

      setDisabled(isEmailInValid || isPhoneInValid || (activeTab === "email" && !newState.email) || (activeTab === "phoneNumber" && !newState.phoneNumber));

      return newState;
    });
  }

  const onSubmit = async () => {
    const { email, phoneNumber } = state

    let resp
    if (activeTab === "email" && email) {
      resp = await dispatch(sendOtpEmail(email))
    } else if (activeTab === "phoneNumber" && phoneNumber) {
      resp = await dispatch(sendOtpPhone(phoneNumber.replace(/\D/g, "")))
    }

    if (resp === 204) {
      navigate("/otp")
    }
  }

  return (
    <div className="recovery-password">
      <img src="static/images/logo.png" alt="logo" />
      <h1>{t("recoveryPasswordPage.title")}</h1>
      <div className="recovery-password__form">
        <AuthTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          state={state}
          onChangeHandler={onChangeHandler}
        />

        <Button disabled={isDisabled} onClick={onSubmit}>
          Далее
        </Button>

        <LinkButton path="/">Вернуться ко входу</LinkButton>
      </div>

      <LangSelect />
    </div>
  )
}

export default RecoveryPasswordPage
