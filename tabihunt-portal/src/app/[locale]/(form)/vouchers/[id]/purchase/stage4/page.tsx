"use client"
import Input from "@/components/UI/Input"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "@/store"
import useAccountState from "@/hooks/useAccountState"
import Select, { Option } from "@/components/UI/Select"
import DateSelector from "@/components/DateSelector"
import { HunterData } from "@/models/hunter"
import { getRegions } from "@/store/actions/commonActions"
import useIsMobile from "@/hooks/useIsMobile"
import { useParams, useRouter } from "next/navigation"
import { editMeHunter } from "@/store/actions/hunterActions"
import Button from "@/components/UI/buttons/Button"
import "./style.scss"

const PurchaseVoucherStage4 = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const isMobile = useIsMobile()
  const router = useRouter()
  const params = useParams()
  const [state, setState] = useAccountState()
  const [regions, setRegions] = useState<Option[]>([])
  const { me, newHunterData } = useAppSelector(state => state.hunters)
  const { purchaseVoucherData } = useAppSelector(state => state.vouchers)
  const [selectedRegion, setSelectedRegion] = useState<Option>({
    value: state.address.regionId ?? "",
    title: me?.address.region.name ?? ""
  })

  useEffect(() => {
    if (!me && !newHunterData && !purchaseVoucherData) {
      router.push(`/${params.locale}/vouchers/${params.id}`)
    }
  }, [me, newHunterData, purchaseVoucherData, router, params])

  useEffect(() => {
    const getAllRegions = async () => {
      const regions = await dispatch(getRegions())
      if (regions && regions.length > 0) {
        const regionsOptions = regions?.map(region => ({
          value: region.id,
          title: region.name
        }))
        setRegions(regionsOptions)
      }
    }
    getAllRegions()
  }, [dispatch])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const addressHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const onHunterLicenseSubmit = async () => {
    if (newHunterData) {
      const result = await dispatch(editMeHunter(newHunterData))
      if (result) {
        router.push(`/${params.locale}/vouchers/${params.id}/purchase/stage5`)
      }
    }
  }

  const disabled =
    !newHunterData?.address.regionId ||
    !newHunterData?.address.city ||
    !newHunterData?.address.street ||
    !newHunterData?.address.houseNumber ||
    !newHunterData.huntingLicenseNumber ||
    !newHunterData.huntingLicenseIssued ||
    !newHunterData.huntingLicenseValid

  return (
    <div className="purchase-voucher-stape4">
      <h2>{t("form.stage4.title")}</h2>
      <div className="container">
        <div className="form-block">
          <h2>{t("form.stage4.address.title")}</h2>
          <h3>{t("form.stage4.address.region")}</h3>
          <Select
            options={regions}
            label={t("form.necessarily")}
            selected={{
              value: state.address.regionId,
              title: selectedRegion.title ?? ""
            }}
            onChange={handleRegionChange}
          />
          <h3>{t("form.stage4.address.city")}</h3>
          <Input
            placeholder={t("form.necessarily")}
            name="city"
            value={state.address.city ?? ""}
            onChange={addressHandleChange}
          />
          <h3>{t("form.stage4.address.street")}</h3>
          <Input
            placeholder={t("form.necessarily")}
            name="street"
            value={state.address.street ?? ""}
            onChange={addressHandleChange}
          />
          <h3>{t("form.stage4.address.houseNumber")}</h3>
          <Input
            placeholder={t("form.necessarily")}
            name="houseNumber"
            value={state.address.houseNumber ?? ""}
            onChange={addressHandleChange}
          />
          <h3>{t("form.stage4.address.flatNumber")}</h3>
          <Input
            placeholder={t("form.not-necessarily")}
            name="flatNumber"
            value={state.address.flatNumber ?? ""}
            onChange={addressHandleChange}
          />
        </div>
        <div className="form-block">
          <h2>{t("form.stage4.hunting-license.title")}</h2>
          <h3>{t("form.stage4.hunting-license.huntingLicenseNumber")}</h3>
          <Input
            placeholder={t("form.necessarily")}
            name="huntingLicenseNumber"
            value={state.huntingLicenseNumber ?? ""}
            onChange={handleChange}
          />
          <h3>{t("form.stage4.hunting-license.huntingLicenseIssued")}</h3>
          <DateSelector
            currentDate={state.huntingLicenseIssued}
            startOffset={10}
            endOffset={0}
            dateHandler={(year, month, day) =>
              handleDateChange("huntingLicenseIssued", year, month, day)
            }
          />
          <h3>{t("form.stage4.hunting-license.huntingLicenseValid")}</h3>
          <DateSelector
            currentDate={state.huntingLicenseValid}
            startOffset={0}
            endOffset={10}
            dateHandler={(year, month, day) =>
              handleDateChange("huntingLicenseValid", year, month, day)
            }
          />
        </div>
        {isMobile && (
          <Button disabled={disabled} onClick={onHunterLicenseSubmit}>
            {t("form.stage2.continue-btn")}
          </Button>
        )}
      </div>
    </div>
  )
}

export default PurchaseVoucherStage4
