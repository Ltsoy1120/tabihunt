"use client"
import React, { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import DateSelector from "@/components/DateSelector"
import Input from "@/components/UI/Input"
import { validatenumber } from "@/helpers/validate"
import useAccountState from "@/hooks/useAccountState"
import { HunterData } from "@/models/hunter"
import Button from "@/components/UI/buttons/Button"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "@/store"
import {
  registerWithEmail,
  registerWithPhone
} from "@/store/actions/hunterActions"
import Loader from "@/components/loaders/Loader"
import "./style.scss"

const HuntingLicense = () => {
  const { t } = useTranslation()
  const params = useParams()
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [state, setState] = useAccountState()
  const { registerData } = useAppSelector(state => state.auth)
  const { error, newHunterData } = useAppSelector(state => state.hunters)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setState(prevState => ({ ...prevState, [name]: value }))
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

  const isDisabled =
    !state.huntingLicenseNumber ||
    !state.huntingLicenseIssued ||
    !state.huntingLicenseValid

  const onSubmit = async () => {
    setIsLoading(true)
    let register
    if (registerData?.email && newHunterData?.phoneNumber) {
      register = await dispatch(
        registerWithEmail({
          ...(newHunterData as HunterData),
          phoneNumber: `+${newHunterData?.phoneNumber.replace(/\D/g, "")}`
        })
      )
    }

    if (registerData?.phoneNumber && newHunterData?.phoneNumber) {
      register = await dispatch(
        registerWithPhone({
          ...(newHunterData as HunterData),
          phoneNumber: `+${newHunterData?.phoneNumber.replace(/\D/g, "")}`
        })
      )
    }
    if (register) {
      router.push(`/${params.locale}/`)
    } else {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="hunting-license-loader">
          <Loader />
        </div>
      ) : (
        <div className="hunting-license-form">
          <div className="hunting-license-form__col">
            <h3>{t("form.hunting-license.huntingLicenseNumber")}</h3>
            <Input
              placeholder={t("form.necessarily")}
              name="huntingLicenseNumber"
              value={state.huntingLicenseNumber ?? ""}
              onChange={handleChange}
            />
            <h3>{t("form.hunting-license.huntingLicenseIssued")}</h3>
            <DateSelector
              currentDate={state.huntingLicenseIssued}
              startOffset={10}
              endOffset={0}
              dateHandler={(year, month, day) =>
                handleDateChange("huntingLicenseIssued", year, month, day)
              }
            />
            <h3>{t("form.hunting-license.huntingLicenseValid")}</h3>
            <DateSelector
              currentDate={state.huntingLicenseValid}
              startOffset={0}
              endOffset={10}
              dateHandler={(year, month, day) =>
                handleDateChange("huntingLicenseValid", year, month, day)
              }
            />
          </div>
          <div className="hunting-license-form__col">
            <Button disabled={isDisabled} onClick={onSubmit}>
              {t("form.hunting-license.button")}
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default HuntingLicense
