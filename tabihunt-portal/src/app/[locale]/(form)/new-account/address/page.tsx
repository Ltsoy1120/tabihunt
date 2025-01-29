"use client"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useParams, useRouter } from "next/navigation"
import Button from "@/components/UI/buttons/Button"
import Input from "@/components/UI/Input"
import Select, { Option } from "@/components/UI/Select"
import useAccountState from "@/hooks/useAccountState"
import { commonService } from "@/services/common.service"
import "./style.scss"

const AddressForm = () => {
  const { t } = useTranslation()
  const params = useParams()
  const router = useRouter()
  const [state, setState] = useAccountState()
  const [regions, setRegions] = useState<Option[]>([])
  const [selectedRegion, setSelectedRegion] = useState<Option>({
    value: "",
    title: ""
  })

  useEffect(() => {
    const getRegions = async () => {
      const regions = await (await commonService.getRegions()).data.content
      if (regions.length > 0) {
        const regionsOptions = regions?.map(region => ({
          value: region.id,
          title: region.name
        }))
        setRegions(regionsOptions)
      }
    }
    getRegions()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState(prevState => ({
      ...prevState,
      address: { ...prevState.address, [name]: value }
    }))
  }

  const handleRegionChange = (region: Option) => {
    setSelectedRegion(region)
    setState(prevState => ({
      ...prevState,
      address: { ...prevState.address, regionId: region.value }
    }))
  }

  const isDisabled =
    !state.address.regionId ||
    !state.address.city ||
    !state.address.street ||
    !state.address.houseNumber

  return (
    <div className="address-form">
      <div className="address-form__col">
        <h3>{t("form.address.region")}</h3>
        <Select
          options={regions}
          label={t("form.necessarily")}
          selected={{
            value: state.address.regionId,
            title: selectedRegion.title ?? ""
          }}
          onChange={handleRegionChange}
        />
        <h3>{t("form.address.city")}</h3>
        <Input
          placeholder={t("form.necessarily")}
          name="city"
          value={state.address.city ?? ""}
          onChange={handleChange}
        />
        <h3>{t("form.address.street")}</h3>
        <Input
          placeholder={t("form.necessarily")}
          name="street"
          value={state.address.street ?? ""}
          onChange={handleChange}
        />
      </div>
      <div className="address-form__col">
        <h3>{t("form.address.houseNumber")}</h3>
        <Input
          placeholder={t("form.necessarily")}
          name="houseNumber"
          value={state.address.houseNumber ?? ""}
          onChange={handleChange}
        />
        <h3>{t("form.address.flatNumber")}</h3>
        <Input
          placeholder={t("form.not-necessarily")}
          name="flatNumber"
          value={state.address.flatNumber ?? ""}
          onChange={handleChange}
        />
        <Button
          disabled={isDisabled}
          onClick={() =>
            router.push(`/${params.locale}/new-account/hunting-license`)
          }
        >
          {t("form.address.button")}
        </Button>
      </div>
    </div>
  )
}

export default AddressForm
