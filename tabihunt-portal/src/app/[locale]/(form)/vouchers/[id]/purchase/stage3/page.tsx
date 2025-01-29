"use client"
import Input from "@/components/UI/Input"
import React, { useEffect, useState } from "react"
import useAccountState from "@/hooks/useAccountState"
import { validateIin } from "@/helpers/validate"
import { useTranslation } from "react-i18next"
import Button from "@/components/UI/buttons/Button"
import useIsMobile from "@/hooks/useIsMobile"
import { useParams, useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/store"
import { editMeHunter } from "@/store/actions/hunterActions"
import "./style.scss"

const PurchaseVoucherStage3 = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const isMobile = useIsMobile()
  const router = useRouter()
  const params = useParams()
  const [state, setState] = useAccountState()
  const [iinError, setIinError] = useState("")

  const { me, newHunterData } = useAppSelector(state => state.hunters)
  const { purchaseVoucherData } = useAppSelector(state => state.vouchers)

  useEffect(() => {
    if (!me && !newHunterData && !purchaseVoucherData) {
      router.push(`/${params.locale}/vouchers/${params.id}`)
    }
  }, [me, newHunterData, purchaseVoucherData, router, params])

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

  const onHunterSubmit = async () => {
    if (newHunterData) {
      const result = await dispatch(editMeHunter(newHunterData))
      if (result) {
        router.push(`/${params.locale}/vouchers/${params.id}/purchase/stage4`)
      }
    }
  }

  const disabled =
    !newHunterData?.firstname ||
    !newHunterData?.lastname ||
    !newHunterData?.dateOfBirth ||
    !newHunterData.phoneNumber ||
    !newHunterData.email

  return (
    <div className="purchase-voucher-stape3">
      <h2>{t("form.stage3.title")}</h2>
      <div className="container">
        <div className="form-block">
          <h2>{t("form.stage3.personal-data.title")}</h2>
          <h3>{t("form.stage3.personal-data.lastname")}</h3>
          <Input
            placeholder={t("form.necessarily")}
            name="lastname"
            value={state.lastname}
            onChange={handleChange}
            autoFocus
          />
          <h3>{t("form.stage3.personal-data.firstname")}</h3>
          <Input
            placeholder={t("form.necessarily")}
            name="firstname"
            value={state.firstname}
            onChange={handleChange}
          />
          <h3>{t("form.stage3.personal-data.patronymic")}</h3>
          <Input
            placeholder={t("form.not-necessarily")}
            name="patronymic"
            value={state.patronymic ?? ""}
            onChange={handleChange}
          />
          <h3>{t("form.stage3.personal-data.dateOfBirth")}</h3>
          <Input
            type="date"
            name="dateOfBirth"
            value={state.dateOfBirth}
            onChange={handleChange}
          />
          <h3>{t("form.stage3.personal-data.iin")}</h3>
          <Input
            placeholder={t("form.not-necessarily")}
            name="iin"
            type="number"
            value={state.iin ?? ""}
            onChange={handleIinChange}
            error={!!iinError}
          />
        </div>
        <div className="form-block">
          <h2>{t("form.stage3.contacts-data.title")}</h2>
          <h3>{t("form.stage3.contacts-data.phoneNumber")}</h3>
          <Input
            placeholder={t("form.necessarily")}
            name="phoneNumber"
            type="tel"
            value={state.phoneNumber ?? ""}
            disabled
          />
          <h3>{t("form.stage3.contacts-data.email")}</h3>
          <Input
            name="email"
            placeholder={t("form.necessarily")}
            value={state.email ?? ""}
            disabled
          />
        </div>
        {isMobile && (
          <Button disabled={disabled} onClick={onHunterSubmit}>
            {t("form.stage2.continue-btn")}
          </Button>
        )}
      </div>
    </div>
  )
}

export default PurchaseVoucherStage3
