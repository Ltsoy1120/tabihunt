"use client"
import React, { useState } from "react"
import DateSelector from "@/components/DateSelector"
import Input from "@/components/UI/Input"
import Select, { Option } from "@/components/UI/Select"
import { validateIin } from "@/helpers/validate"
import useAccountState from "@/hooks/useAccountState"
import { HunterData } from "@/models/hunter"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "@/store"
import { useParams, useRouter } from "next/navigation"
import { editMeHunter } from "@/store/actions/hunterActions"
import useIsMobile from "@/hooks/useIsMobile"
import Button from "@/components/UI/buttons/Button"
import "./style.scss"

const issuedByOptions = [
  { value: "МВД РК", title: "МВД РК" },
  { value: "МЮ РК", title: "МЮ РК" }
]

const Identification = () => {
  const { t } = useTranslation("common")
  const isMobile = useIsMobile()
  const dispatch = useAppDispatch()
  const params = useParams()
  const router = useRouter()
  const { newHunterData } = useAppSelector(state => state.hunters)
  const [state, setState] = useAccountState()

  const [iinError, setIinError] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIinError("")
    const { name, value } = event.target

    const filteredValue = value.replace(/\D/g, "")

    if (name === "iin") {
      if (filteredValue.length > 12) {
        return
      }
      const textError = validateIin(filteredValue)?.message
      textError && setIinError(textError)
    }

    if (name === "identificationNumber") {
      if (filteredValue.length > 9) {
        return
      }
    }

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

  const handleIdentificationIssuedByChange = (option: Option) => {
    setState(prevState => ({
      ...prevState,
      identificationIssuedBy: option.value
    }))
  }

  // const hasIdentificatioData =
  //   newHunterData?.iin &&
  //   newHunterData?.identificationNumber &&
  //   newHunterData?.identificationIssued &&
  //   newHunterData?.identificationIssuedBy

  const onSubmit = async () => {
    if (newHunterData) {
      const result = await dispatch(editMeHunter(newHunterData))
      if (result) {
        router.push(`/${params.locale}/account`)
      }
    }
  }

  return (
    <div className="edit-identification-form">
      <div className="edit-identification-form__col">
        <h3>{t("form.identification.iin")}</h3>
        <Input
          // placeholder={t("form.not-necessarily")}
          name="iin"
          type="number"
          value={state.iin ?? ""}
          onChange={handleChange}
          error={!!iinError}
        />
        <h3>{t("form.identification.identificationNumber")}</h3>
        <Input
          // placeholder={t("form.necessarily")}
          name="identificationNumber"
          type="number"
          value={state.identificationNumber ?? ""}
          onChange={handleChange}
        />
        <h3>{t("form.identification.identificationIssued")}</h3>
        <DateSelector
          currentDate={state.identificationIssued}
          startOffset={25}
          endOffset={0}
          dateHandler={(year, month, day) =>
            handleDateChange("identificationIssued", year, month, day)
          }
        />
        <h3>{t("form.identification.identificationValid")}</h3>
        <DateSelector
          currentDate={state.identificationValid}
          startOffset={0}
          endOffset={25}
          dateHandler={(year, month, day) =>
            handleDateChange("identificationValid", year, month, day)
          }
        />
        <h3>{t("form.identification.identificationIssuedBy")}</h3>
        <Select
          options={issuedByOptions}
          selected={
            issuedByOptions.find(
              option => option.value === state.identificationIssuedBy
            ) || { value: "", title: t("form.identification.choose-from-list") }
          }
          label={t("form.identification.choose-from-list")}
          onChange={handleIdentificationIssuedByChange}
        />
      </div>

      {isMobile && (
        <Button onClick={onSubmit}>{t("form-header.account.save-btn")}</Button>
      )}
    </div>
  )
}

export default Identification
