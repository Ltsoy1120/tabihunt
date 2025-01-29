"use client"
import { useTranslation } from "react-i18next"
import { useParams, useRouter } from "next/navigation"
import ErrorInfo from "@/components/ErrorInfo"
import Button from "@/components/UI/buttons/Button"
import Input from "@/components/UI/Input"
import useAccountState from "@/hooks/useAccountState"
import { useAppDispatch, useAppSelector } from "@/store"
import { getUsersExists } from "@/store/actions/hunterActions"
import { huntersFetchError } from "@/store/slices/huntersSlice"
import "./style.scss"
import DateSelector from "@/components/DateSelector"
import { HunterData } from "@/models/hunter"
import { useState } from "react"
import { validateIin } from "@/helpers/validate"

const PersonalDataForm = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const params = useParams()
  const router = useRouter()
  const [state, setState] = useAccountState()
  const { error } = useAppSelector(state => state.hunters)
  const [iinError, setIinError] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleIinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIinError("")
    const { name, value } = event.target
    const filteredValue = value.replace(/\D/g, "")
    if (filteredValue.length > 12) {
      return
    }
    const textError = validateIin(filteredValue)?.message
    textError && setIinError(textError)

    setState(prevState => ({
      ...prevState,
      [name]: filteredValue
    }))
  }

  const handleDateChange = (
    field: keyof HunterData,
    year: string,
    month: string,
    day: string
  ) => {
    const newDate = `${year}-${month}-${day}`
    setState(prevState => {
      if (prevState[field] !== newDate) {
        return { ...prevState, [field]: newDate }
      }
      return prevState
    })
  }

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(huntersFetchError(null))

    setState(prevState => ({
      ...prevState,
      phoneNumber: event.target.value
    }))
  }

  const isDisabled =
    !state.firstname ||
    !state.lastname ||
    !state.dateOfBirth ||
    !state.phoneNumber

  const continueHandler = async () => {
    const status = await dispatch(
      getUsersExists({
        phoneNumber: `+${state.phoneNumber?.replace(/\D/g, "")}`
      })
    )
    if (status && status >= 200 && status < 300) {
      router.push(`/${params.locale}/new-account/address`)
    }
  }

  return (
    <div className="personal-data-form">
      <div className="personal-data-form__col">
        <h3>{t("form.personal-data.lastname")}</h3>
        <Input
          placeholder={t("form.necessarily")}
          name="lastname"
          value={state.lastname}
          onChange={handleChange}
        />
        <h3>{t("form.personal-data.firstname")}</h3>
        <Input
          placeholder={t("form.necessarily")}
          name="firstname"
          value={state.firstname}
          onChange={handleChange}
        />
        <h3>{t("form.personal-data.patronymic")}</h3>
        <Input
          placeholder={t("form.not-necessarily")}
          name="patronymic"
          value={state.patronymic ?? ""}
          onChange={handleChange}
        />
        <h3>{t("form.personal-data.dateOfBirth")}</h3>
        <DateSelector
          currentDate={state.dateOfBirth}
          startOffset={100}
          endOffset={-18}
          dateHandler={(year, month, day) =>
            handleDateChange("dateOfBirth", year, month, day)
          }
        />
        {/* 
          <Input
            type="date"
            name="dateOfBirth"
            value={state.dateOfBirth}
            onChange={handleChange}
          />
         */}
      </div>
      <div className="personal-data-form__col">
        <h3>{t("form.personal-data.gender")}</h3>
        <div className="gender-radio-btns">
          {["MALE", "FEMALE"].map(gender => (
            <label
              key={gender}
              className={`gender-radio-btn ${
                state.gender === gender ? "checked" : ""
              }`}
            >
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={state.gender === gender}
                onChange={handleChange}
              />
              <span>
                {gender === "MALE"
                  ? t("form.personal-data.male")
                  : t("form.personal-data.female")}
              </span>
            </label>
          ))}
        </div>
        <h3>{t("form.identification.iin")}</h3>
        <Input
          placeholder={t("form.not-necessarily")}
          name="iin"
          type="number"
          value={state.iin ?? ""}
          onChange={handleIinChange}
          error={!!iinError}
        />
        <h3>{t("form.personal-data.phoneNumber")}</h3>
        <Input
          placeholder={t("form.necessarily")}
          name="phoneNumber"
          type="tel"
          value={state.phoneNumber ?? ""}
          onChange={handleChangePhone}
          error={error}
        />
        {error?.response?.status === 409 ? (
          <ErrorInfo textError={error?.response?.data.message} />
        ) : (
          <Button disabled={isDisabled} onClick={continueHandler}>
            {t("form.personal-data.button")}
          </Button>
        )}
      </div>
    </div>
  )
}

export default PersonalDataForm
