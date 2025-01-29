import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import '../AccountPage/style.scss'
import Input from "../../../components/UI/Input"
import Button from "../../../components/UI/buttons/Button"
import { useAppDispatch, useAppSelector } from "../../../store"
import { passwordChange, sendOtpEmail, sendOtpPhone } from "../../../store/actions/authActions"
import InlineLoader from "../../../components/UI/loaders/InlineLoader"
import { useTranslation } from "react-i18next"

const PHONE_TYPE = 'phone'
const EMAIL_TYPE = 'email'
const PASS_TYPE = 'password'
const PASS_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#!"№;%:?*()_+/\\/.])[A-Za-z\d#!"№;%:?*()_+/\\/.]{8,}$/
const PHONE_REGEXP = /^\+7[0-9]{10,10}/
const EMAIL_REGEXP = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/
type Params = {
    type: string | undefined
}

type State = {
    isPhonePage: boolean
    phone: string
    isPhoneInValid: boolean
    isEmailPage: boolean
    email: string
    isEmailInValid: boolean
    isPasswordPage: boolean
    passwordFirst: string
    passwordSecond: string
    isPasswordInValid: boolean
    contentHeight: number
}

const AccountChangePhoneOrEmailPage = () => {
    const type = useParams<Params>()?.type
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const authLoading = useAppSelector(state => state.auth.loading)
    const needOpenPhoneVerify = useAppSelector(state => state.account.isOtpSendToPhone)
    const needOpenEmailVerify = useAppSelector(state => state.account.isOtpSendToEmail)
    const { t } = useTranslation()

    const [state, setState] = useState<State>({
        phone: '',
        email: '',
        passwordFirst: '',
        passwordSecond: '',
        isEmailPage: false,
        isPhonePage: false,
        isPasswordPage: false,
        contentHeight: 500,
        isEmailInValid: false,
        isPasswordInValid: false,
        isPhoneInValid: false,
    })

    useEffect(() => {
        let contentHeight: number = window.innerHeight - 80
        if (contentHeight < 500) contentHeight = 500

        if (type === PHONE_TYPE) {
            setState({
                ...state,
                contentHeight,
                isPhonePage: true,
                isEmailPage: false,
                isPasswordPage: false
            })
        }
        else if (type === EMAIL_TYPE) {
            setState({
                ...state,
                contentHeight,
                isPhonePage: false,
                isEmailPage: true,
                isPasswordPage: false
            })
        }
        else if (type === PASS_TYPE) {
            setState({
                ...state,
                contentHeight,
                isPhonePage: false,
                isEmailPage: false,
                isPasswordPage: true
            })
        }
        else {
            navigate('/account')
        }
    }, [])

    useEffect(() => {
        if (needOpenEmailVerify) {
            navigate(`/account-verify/${EMAIL_TYPE}`)
        }
        else if (needOpenPhoneVerify) {
            navigate(`/account-verify/${PHONE_TYPE}`)
        }
    }, [needOpenEmailVerify, needOpenPhoneVerify])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const name = e.target.name
        setState({
            ...state,
            [name]: value,
            isEmailInValid: false,
            isPasswordInValid: false,
            isPhoneInValid: false,
        })


    }
    const cancelHandler = () => {
        navigate('/account')
    }

    const onSubmit = () => {
        if (state.isEmailPage) {
            const isEmailInValid = !EMAIL_REGEXP.test(state.email)
            if (isEmailInValid) setState({ ...state, isEmailInValid })
            else {
                dispatch(sendOtpEmail(state.email))
            }
        }
        else if (state.isPhonePage) {
            const copyPhone = state.phone
            const clearNumber = copyPhone.replace("(", "")
                .replace(")", "").replace("_", "")
                .split("").filter(el => el !== " ").join("")
            const isPhoneInValid = !PHONE_REGEXP.test(clearNumber)
            if (isPhoneInValid) setState({ ...state, isPhoneInValid })
            else {
                dispatch(sendOtpPhone(clearNumber))
            }
        }
        else if (state.isPasswordPage) {
            const copyFirst = state.passwordFirst
            const copySecond = state.passwordSecond
            if (copyFirst !== copySecond || !PASS_REGEXP.test(copyFirst)) setState({ ...state, isPasswordInValid: true })
            else {
                dispatch(passwordChange(copyFirst)).then(() => {
                    cancelHandler()
                })
            }
        }
    }

    const btnBlock = (isInvalid: boolean, btnYesText: string) => {
        return (
            <>
                {isInvalid
                    ? <span className="error m-t-20">
                        {t("accountPage.foundMisstake")}
                    </span>
                    : <Button
                        className={`account__info-btns-btn account__changing-content-btn account__info-btns-btn--dark`}
                        onClick={onSubmit}
                        disabled={isInvalid}
                    >
                        {authLoading
                            ? <InlineLoader height={14} />
                            : <>{btnYesText}</>
                        }
                    </Button>
                }
                <Button
                    className={`account__info-btns-btn account__changing-content-btn account__info-btns-btn--dark`}
                    onClick={cancelHandler}
                >
                    {t("accountPage.cancel")}
                </Button>
            </>
        )
    }

    return (
        <>
            <div className="account__changing-header">
                <img className="account__changing-header-logo" src="/static/images/logo.png" alt="logo" />
            </div>
            <div style={{ height: `${state.contentHeight}px` }}
                className="account__changing-content">
                {state.isPhonePage
                    ? <div className="account__changing-content-inside">
                        <p className="account__changing-content-title">
                            {t("accountPage.newPhoneNumber")}
                        </p>
                        <Input
                            name="phone"
                            type="tel"
                            value={state.phone}
                            onChange={onChange}
                            autoFocus={true}
                            isInvalid={state.isPhoneInValid}
                        />
                        {btnBlock(state.isPhoneInValid, t("accountPage.next"))}
                    </div>
                    : <div></div>
                }
                {state.isEmailPage
                    ? <div className="account__changing-content-inside">
                        <p className="account__changing-content-title">
                            {t("accountPage.newEmailAdres")}
                        </p>
                        <Input
                            name="email"
                            value={state.email}
                            onChange={onChange}
                            autoFocus={true}
                            isInvalid={state.isEmailInValid}
                            placeholder="example@mail.com"
                        />
                        {btnBlock(state.isEmailInValid, t("accountPage.next"))}
                    </div>
                    : <div></div>
                }
                {state.isPasswordPage
                    ? <div className="account__changing-content-inside">
                        <p className="account__changing-content-title m-b-40">
                            {t("accountPage.newPassword")}
                        </p>
                        <Input
                            name="passwordFirst"
                            value={state.passwordFirst}
                            onChange={onChange}
                            autoFocus={true}
                            isInvalid={state.isPasswordInValid}
                            placeholder={t("accountPage.generatePassword")}
                            type="password"
                        />
                        <div className="m-t-20">
                            <Input
                                name="passwordSecond"
                                value={state.passwordSecond}
                                onChange={onChange}
                                isInvalid={state.isPasswordInValid}
                                placeholder={t("accountPage.repeatPassword")}
                                type="password"
                            />
                        </div>
                        <div className="account__changing__info">
                            <p className="account__changing__info-text">
                                {t("accountPage.passwordRequirement")} #!"№;%:?*()_+/\/.
                            </p>
                        </div>
                        {btnBlock(state.isPasswordInValid, t("accountPage.update"))}
                    </div>
                    : <div></div>
                }
            </div>
        </>
    )
}
export default AccountChangePhoneOrEmailPage