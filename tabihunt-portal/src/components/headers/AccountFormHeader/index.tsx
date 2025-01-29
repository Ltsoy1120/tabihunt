import Button from "@/components/UI/buttons/Button"
import { useAppDispatch, useAppSelector } from "@/store"
import { editMeHunter } from "@/store/actions/hunterActions"
import { useParams, usePathname, useRouter } from "next/navigation"
import { useTranslation } from "react-i18next"
import FormHeader from "../FormHeader"
import "./style.scss"

const AccountFormHeader = () => {
  const { t } = useTranslation()
  const params = useParams()
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const router = useRouter()
  const { newHunterData } = useAppSelector(state => state.hunters)

  const getTitleHeader = () => {
    switch (true) {
      case pathname.includes("/edit-account/personal-data") ||
        pathname.includes("/new-account/personal-data"):
        return t("form-header.account.personal-data")
      case pathname.includes("/edit-account/hunting-license") ||
        pathname.includes("/new-account/hunting-license"):
        return t("form-header.account.hunting-license")
      case pathname.includes("/edit-account/identification"):
        //   pathname.includes("/new-account/identification"):
        return t("form-header.account.identification")
      case pathname.includes("/new-account/address"):
        return t("form-header.account.address")
      default:
        break
    }
  }

  const hasPersonalData =
    newHunterData?.firstname &&
    newHunterData?.lastname &&
    newHunterData?.dateOfBirth &&
    newHunterData?.iin &&
    newHunterData?.phoneNumber

  const hasAddressData =
    newHunterData?.address.regionId &&
    newHunterData?.address.city &&
    newHunterData?.address.street &&
    newHunterData?.address.houseNumber

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

  const getFormButton = () => {
    switch (true) {
      case pathname.includes("/edit-account/personal-data"):
        return (
          <Button
            onClick={onSubmit}
            disabled={!hasPersonalData || !hasAddressData}
          >
            {t("form-header.account.save-btn")}
          </Button>
        )
      case pathname.includes("/edit-account/hunting-license"):
        return (
          <Button onClick={onSubmit} disabled={!hasHuntingLicenseData}>
            {t("form-header.account.save-btn")}
          </Button>
        )
      case pathname.includes("/edit-account/identification"):
        return (
          <Button onClick={onSubmit}>
            {t("form-header.account.save-btn")}
          </Button>
        )
      default:
        break
    }
  }

  return (
    <FormHeader
      titlePage={getTitleHeader()}
      titlePageMobile={getTitleHeader()}
      getFormButton={getFormButton}
    />
  )
}

export default AccountFormHeader
