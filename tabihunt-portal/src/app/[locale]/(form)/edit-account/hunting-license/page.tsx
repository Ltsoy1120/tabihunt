"use client"
import DateSelector from "@/components/DateSelector"
import Button from "@/components/UI/buttons/Button"
import Input from "@/components/UI/Input"
import useAccountState from "@/hooks/useAccountState"
import useIsMobile from "@/hooks/useIsMobile"
import { HunterData } from "@/models/hunter"
import { useAppDispatch, useAppSelector } from "@/store"
import { editMeHunter } from "@/store/actions/hunterActions"
import { useParams, useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import "./style.scss"

const HuntingLicense = () => {
  const { t } = useTranslation("common")
  const isMobile = useIsMobile()
  const dispatch = useAppDispatch()
  const params = useParams()
  const router = useRouter()
  const { newHunterData } = useAppSelector(state => state.hunters)
  const [state, setState] = useAccountState()

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

  const hasHuntingLicenseData =
    newHunterData?.huntingLicenseNumber &&
    newHunterData?.huntingLicenseIssued &&
    newHunterData?.huntingLicenseValid

  const onSubmit = async () => {
    if (newHunterData) {
      const result = await dispatch(editMeHunter(newHunterData))
      if (result) {
        router.push(`/${params.locale}/account`)
      }
    }
  }

  return (
    <div className="edit-hunting-license-form">
      <div className="edit-hunting-license-form__col">
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

      {isMobile && (
        <Button onClick={onSubmit} disabled={!hasHuntingLicenseData}>
          {t("form-header.account.save-btn")}
        </Button>
      )}
    </div>
  )
}

export default HuntingLicense
