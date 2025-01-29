"use client"
import { classMerge } from "@/helpers/common"
import { useState, useEffect } from "react"
import InputMask from "@mona-health/react-input-mask"
import Icon from "../Icon"
import "./style.scss"

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
  error?: boolean
  endIcon?: string
  readOnly?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: () => void
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
  error,
  endIcon,
  readOnly,
  onClick,
  onChange,
  onKeyPress
}: InputProps) => {
  const [inputType, setInputType] = useState(type ?? "text")

  useEffect(() => {
    type && setInputType(type)
  }, [type])

  const togglePasswordVisibility = () => {
    setInputType(prevType => (prevType === "password" ? "text" : "password"))
  }

  return (
    <div className={classMerge("input-wrapper", error ? "input-error" : "")}>
      {type === "tel" ? (
        <>
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
          {error && <p>Ошибка</p>}
        </>
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
            readOnly={readOnly}
            onChange={onChange}
            onClick={onClick}
            onKeyPress={onKeyPress}
          />
          {error && <p>Ошибка</p>}
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
    </div>
  )
}

export default Input
