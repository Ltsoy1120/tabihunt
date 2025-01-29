import { useState, useEffect } from "react"
import InputMask from "@mona-health/react-input-mask"
import Icon from "../Icon"
import "./style.scss"
import { useTranslation } from "react-i18next"

interface InputProps {
  type?: string
  name?: string
  placeholder?: string
  value: string
  maxLength?: number
  max?: number
  min?: number
  required?: boolean
  autoFocus?: boolean
  disabled?: boolean
  autoComplete?: string
  isInvalid?: boolean
  endIcon?: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}
const Input = ({
  type,
  name,
  placeholder,
  value,
  maxLength,
  max,
  min,
  required,
  autoFocus,
  disabled,
  autoComplete,
  isInvalid,
  endIcon,
  onChange,
  onKeyPress
}: InputProps) => {
  const [inputType, setInputType] = useState(type ?? "text")
  const { t } = useTranslation()

  useEffect(() => {
    type && setInputType(type)
  }, [type])

  const togglePasswordVisibility = () => {
    setInputType(prevType => (prevType === "password" ? "text" : "password"))
  }

  return (
    <div className={isInvalid ? "input-wrapper-error" : "input-wrapper"}>
      {type === "tel" ? (
        <InputMask
          mask="+7 (999) 999 99 99"
          id="phone"
          name={name}
          type="tel"
          autoComplete="on"
          required={required}
          placeholder={placeholder ?? "+7 (___) ___ __ __"}
          value={value}
          onChange={onChange}
          // onKeyDown={handleKeyDown}
        />
      ) : (
        <>
          <input
            type={inputType}
            name={name}
            value={value}
            placeholder={placeholder}
            required={required}
            autoFocus={autoFocus}
            disabled={disabled}
            maxLength={maxLength}
            max={max}
            min={min}
            autoComplete={autoComplete}
            onChange={onChange}
            onKeyPress={onKeyPress}
          />
          {type === "password" &&
            (inputType === "password" ? (
              <Icon
                name="close-eye"
                size={16}
                onClick={togglePasswordVisibility}
              />
            ) : (
              <Icon
                name="open-eye"
                size={16}
                onClick={togglePasswordVisibility}
              />
            ))}
          {endIcon && <Icon name={endIcon} size={20} />}
        </>
      )}
      {isInvalid ? (
        <div className="input-error__wrapper">
          <p className="input-error__wrapper-text">{t("accountPage.error")}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default Input
