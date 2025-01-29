"use client"
import { useEffect, useState } from "react"
import Input from "@/components/UI/Input"
import Select, { Option } from "@/components/UI/Select"
import useAccountState from "@/hooks/useAccountState"
import { useAppDispatch, useAppSelector } from "@/store"
import { huntersFetchError } from "@/store/slices/huntersSlice"
import { getRegions } from "@/store/actions/commonActions"
import "./style.scss"
import { useTranslation } from "react-i18next"
import useIsMobile from "@/hooks/useIsMobile"
import Button from "@/components/UI/buttons/Button"
import { editMeHunter } from "@/store/actions/hunterActions"
import { useParams, useRouter } from "next/navigation"
import DateSelector from "@/components/DateSelector"
import { HunterData } from "@/models/hunter"

const PersonalDataForm = () => {
  const { t } = useTranslation("common")
  const isMobile = useIsMobile()
  const dispatch = useAppDispatch()
  const params = useParams()
  const router = useRouter()
  const [state, setState] = useAccountState()
  const [regions, setRegions] = useState<Option[]>([])
  const { me, newHunterData } = useAppSelector(state => state.hunters)
  const [selectedRegion, setSelectedRegion] = useState<Option>({
    value: state.address.regionId ?? "",
    title: me?.address.region.name ?? ""
  })
  const { error } = useAppSelector(state => state.hunters)

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

  const handleRegionChange = (region: Option) => {
    setSelectedRegion(region)
    setState(prevState => ({
      ...prevState,
      address: { ...prevState.address, regionId: region.value }
    }))
  }

  const hasPersonalData =
    newHunterData?.firstname &&
    newHunterData?.lastname &&
    newHunterData?.dateOfBirth &&
    newHunterData?.phoneNumber

  const hasAddressData =
    newHunterData?.address.regionId &&
    newHunterData?.address.city &&
    newHunterData?.address.street &&
    newHunterData?.address.houseNumber

  const onSubmit = async () => {
    if (newHunterData) {
      const result = await dispatch(editMeHunter(newHunterData))
      if (result) {
        router.push(`/${params.locale}/account`)
      }
    }
  }

  return (
    <div className="edit-personal-data-form">
      <h2>{t("form.personal-data.title")}</h2>
      <div className="edit-personal-data-form__block">
        <div className="edit-personal-data-form__col">
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
        </div>
        <div className="edit-personal-data-form__col">
          <h3>{t("form.personal-data.dateOfBirth")}</h3>
          {/* <Input
            type="date"
            name="dateOfBirth"
            value={state.dateOfBirth}
            onChange={handleChange}
          /> */}
          <DateSelector
            currentDate={state.dateOfBirth}
            startOffset={100}
            endOffset={-18}
            dateHandler={(year, month, day) =>
              handleDateChange("dateOfBirth", year, month, day)
            }
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
        </div>
      </div>
      <h2>{t("form.address.title")}</h2>
      <div className="edit-personal-data-form__block">
        <div className="edit-personal-data-form__col">
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
            onChange={addressHandleChange}
          />
          <h3>{t("form.address.street")}</h3>
          <Input
            placeholder={t("form.necessarily")}
            name="street"
            value={state.address.street ?? ""}
            onChange={addressHandleChange}
          />
        </div>
        <div className="edit-personal-data-form__col">
          <h3>{t("form.address.houseNumber")}</h3>
          <Input
            placeholder={t("form.necessarily")}
            name="houseNumber"
            value={state.address.houseNumber ?? ""}
            onChange={addressHandleChange}
          />
          <h3>{t("form.address.flatNumber")}</h3>
          <Input
            placeholder={t("form.not-necessarily")}
            name="flatNumber"
            value={state.address.flatNumber ?? ""}
            onChange={addressHandleChange}
          />
        </div>
      </div>
      {isMobile && (
        <Button
          onClick={onSubmit}
          disabled={!hasPersonalData || !hasAddressData}
        >
          {t("form-header.account.save-btn")}
        </Button>
      )}
    </div>
  )
}

export default PersonalDataForm
