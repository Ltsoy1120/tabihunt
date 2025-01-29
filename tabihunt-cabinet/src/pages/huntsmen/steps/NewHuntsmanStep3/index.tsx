import { useState, useEffect } from "react"
import Input from "../../../../components/UI/Input"
import { hasEmptyValue } from "../../../../helpers/common"
import {
  validatePassword,
  validatePasswordRepeat
} from "../../../../helpers/validate"
import useHuntsmanState from "../../../../hooks/useHuntsmanState"
import "./style.scss"

const NewHuntsmanStep3 = () => {
  const [state, setState] = useHuntsmanState()

  const [passwordState, setPasswordState] = useState({
    password: "",
    repeatPassword: ""
  })

  const [errors, setErrors] = useState({
    password: "",
    passwordRepeat: ""
  })

  useEffect(() => {
    if (
      !errors.password &&
      !errors.passwordRepeat &&
      !hasEmptyValue(passwordState)
    ) {
      setState(prev => ({
        ...prev,
        user: {
          ...prev.user,
          password: passwordState.password
        }
      }))
    }
  }, [errors])

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    if (name === "email") {
      setState(prevState => ({
        ...prevState,
        user: {
          ...prevState.user,
          email: value
        }
      }))
    } else {
      setPasswordState(prevState => ({
        ...prevState,
        [name]: value
      }))
    }

    if (name === "password") {
      passwordReset()
      setErrors(prev => ({ ...prev, password: validatePassword(value) }))
    }

    if (name === "repeatPassword") {
      passwordReset()
      setErrors(prev => ({
        ...prev,
        passwordRepeat: validatePasswordRepeat(passwordState.password, value)
      }))
    }
  }

  const passwordReset = () => {
    setState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        password: ""
      }
    }))
    setErrors({
      password: "",
      passwordRepeat: ""
    })
  }
  return (
    <div className="new-huntsman-step3">
      <h2>Данные для входа в приложение</h2>
      <form className="form">
        <h3>Почта</h3>
        <Input
          name="email"
          placeholder="Адрес почты"
          autoComplete="on"
          autoFocus
          value={state.user.email ?? ""}
          onChange={onChangeHandler}
        />
        <h3>Пароль</h3>
        <Input
          name="password"
          type="password"
          placeholder="Пароль"
          value={passwordState.password}
          onChange={onChangeHandler}
        />
        {errors.password && (
          <div className="new-password__error">{errors.password}</div>
        )}
        <Input
          name="repeatPassword"
          type="password"
          placeholder="Повторите пароль"
          value={passwordState.repeatPassword}
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
    </div>
  )
}

export default NewHuntsmanStep3
