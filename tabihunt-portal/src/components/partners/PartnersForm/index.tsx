"use client"
import React, { FormEvent, useEffect, useState } from "react"
import Input from "@/components/UI/Input"
import Select, { Option } from "@/components/UI/Select"
import { useAppSelector } from "@/store"
import Button from "@/components/UI/buttons/Button"
import { useTranslation } from "react-i18next"
import "./style.scss"
import { partnersService } from "@/services/partners.service"
import SuccessModal from "../SuccessModal"

const PartnersForm = () => {
  const { t } = useTranslation()
  const { regions } = useAppSelector(state => state.common)
  const [regionsOptions, setRegionsOptions] = useState<Option[]>([])
  const [state, setState] = useState({
    name: "",
    phoneNumber: "",
    plotName: "",
    regionId: ""
  })
  const [selectedRegion, setSelectedRegion] = useState<Option>()
  const [successModal, setSuccessModal] = useState<boolean>(false)

  useEffect(() => {
    if (regions && regions.length > 0) {
      const regionsOptions = regions?.map(region => ({
        value: region.id,
        title: region.name
      }))
      setRegionsOptions(regionsOptions)
    }
  }, [regions])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({
      ...prevState,
      phoneNumber: event.target.value
    }))
  }

  const handleRegionChange = (region: Option) => {
    setSelectedRegion(region)
    setState(prevState => ({
      ...prevState,
      regionId: region.value
    }))
  }

  const onSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      const resp = await partnersService.sendPartnerShipApply(state)
      if (resp.data) {
        setSuccessModal(true)
      }
      setState({
        name: "",
        phoneNumber: "",
        plotName: "",
        regionId: ""
      })
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <>
      {successModal && <SuccessModal close={() => setSuccessModal(false)} />}
      <div className="parners__form">
        <div className="form">
          <h3>{t("contact-us.form.name")}</h3>
          <Input
            placeholder={t("contact-us.form.necessarily")}
            name="name"
            value={state.name}
            onChange={handleChange}
          />
          <h3>{t("contact-us.form.phoneNumber")}</h3>
          <Input
            placeholder={t("contact-us.form.necessarily")}
            name="phoneNumber"
            type="tel"
            value={state.phoneNumber ?? ""}
            onChange={handleChangePhone}
          />
          <h3>{t("contact-us.form.plotName")}</h3>
          <Input
            placeholder={t("contact-us.form.necessarily")}
            name="plotName"
            value={state.plotName}
            onChange={handleChange}
          />
          <h3>{t("contact-us.form.region")}</h3>
          <Select
            options={regionsOptions}
            label={t("contact-us.form.necessarily")}
            selected={{
              value: state.regionId,
              title: selectedRegion?.title ?? ""
            }}
            onChange={handleRegionChange}
          />
          <Button onClick={onSubmit}>{t("contact-us.form.button")}</Button>
        </div>
      </div>
    </>
  )
}

export default PartnersForm
