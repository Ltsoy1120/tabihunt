import { useNavigate, useLocation, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../store"
import {
  createMeCompanyHunter,
  editMeCompanyHunter
} from "../../../../store/actions/hunterActions"
import Button from "../../../UI/buttons/Button"
import TextButton from "../../../UI/buttons/TextButton"
import FormHeader from "../FormHeader"

const PurchaseVoucherHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { purchasedId } = useParams()
  const { pathname } = useLocation()
  const { sellVoucherData, cartAnimalData } = useAppSelector(
    state => state.purchasedVoucher
  )
  const { hunter, newHunterData } = useAppSelector(state => state.hunters)

  const steps = [
    { path: `/new-purchased-vouchers-step1/${purchasedId}/`, title: "ЭТАП 1" },
    { path: `/new-purchased-vouchers-step2/${purchasedId}/`, title: "ЭТАП 2" },
    { path: `/new-purchased-vouchers-step3/${purchasedId}/`, title: "ЭТАП 3" },
    { path: `/new-purchased-vouchers-step4/${purchasedId}/`, title: "ЭТАП 4" }
  ]

  const hasDataStep1 =
    newHunterData?.firstname &&
    newHunterData?.lastname &&
    newHunterData?.gender &&
    newHunterData?.dateOfBirth &&
    newHunterData?.user?.email &&
    newHunterData?.user?.phoneNumber &&
    (newHunterData?.address?.regionId || hunter?.address?.region?.id) &&
    (newHunterData?.address?.street || hunter?.address?.street) &&
    newHunterData?.iin &&
    newHunterData?.huntingLicenseIssued &&
    newHunterData?.huntingLicenseNumber &&
    newHunterData?.huntingLicenseValid

  const hasDataStep2 =
    sellVoucherData?.endDate &&
    sellVoucherData?.startDate &&
    sellVoucherData?.priceType

  const hasDataStep3 =
    sellVoucherData?.animals.length && cartAnimalData.length > 0

  const getFormButton = () => {
    switch (true) {
      case pathname.includes("purchased-vouchers-step1"):
        if (hasDataStep1) {
          return (
            <Button
              onClick={hunter ? () => editHunter(hunter.id) : createHunter}
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("purchased-vouchers-step2"):
        if (hasDataStep2) {
          return (
            <Button
              onClick={() =>
                navigate(`/new-purchased-vouchers-step3/${purchasedId}/`)
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("purchased-vouchers-step3"):
        if (hasDataStep3) {
          return (
            <Button
              onClick={() =>
                navigate(`/new-purchased-vouchers-step4/${purchasedId}/`)
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("purchased-vouchers-step4"):
        return <div style={{ width: "150px" }}></div>
      default:
        break
    }
  }

  const createHunter = async () => {
    if (newHunterData) {
      const result = await dispatch(createMeCompanyHunter(newHunterData))
      result && navigate(`/new-purchased-vouchers-step2/${purchasedId}/`)
    }
  }

  const editHunter = async (hunterId: string) => {
    if (newHunterData) {
      const result = await dispatch(
        editMeCompanyHunter(newHunterData, hunterId)
      )
      result && navigate(`/new-purchased-vouchers-step2/${purchasedId}/`)
    }
  }

  return (
    <FormHeader
      steps={steps}
      pathname={pathname}
      getFormButton={getFormButton}
    />
  )
}
export default PurchaseVoucherHeader
