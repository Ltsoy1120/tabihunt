import { useLocation, useNavigate, useParams } from "react-router-dom"
import { convertToISO, hasEmptyValue } from "../../../../helpers/common"
import { useAppDispatch, useAppSelector } from "../../../../store"
import {
  createMeCompanyVoucher,
  editMeCompanyVoucher
} from "../../../../store/actions/vouchersActions"
import Button from "../../../UI/buttons/Button"
import TextButton from "../../../UI/buttons/TextButton"
import FormHeader from "../FormHeader"

const VoucherFormHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { voucherId } = useParams()
  const { pathname } = useLocation()
  const { voucher, newVoucherData } = useAppSelector(state => state.vouchers)
  const steps = voucherId
    ? [
        { path: `/edit-voucher-step1/${voucherId}`, title: "ЭТАП 1" },
        { path: `/edit-voucher-step2/${voucherId}`, title: "ЭТАП 2" },
        { path: `/edit-voucher-step3/${voucherId}`, title: "ЭТАП 3" },
        { path: `/edit-voucher-step4/${voucherId}`, title: "ЭТАП 4" },
        { path: `/edit-voucher-step5/${voucherId}`, title: "ЭТАП 5" }
      ]
    : [
        { path: "/new-voucher-step1", title: "ЭТАП 1" },
        { path: "/new-voucher-step2", title: "ЭТАП 2" },
        { path: "/new-voucher-step3", title: "ЭТАП 3" },
        { path: "/new-voucher-step4", title: "ЭТАП 4" },
        { path: "/new-voucher-step5", title: "ЭТАП 5" }
      ]

  const hasDataStep1 =
    newVoucherData?.type &&
    newVoucherData?.plotId &&
    newVoucherData?.duration &&
    newVoucherData?.dailyLimit &&
    newVoucherData?.imageUrl &&
    newVoucherData?.rulesUrl

  const hasDataStep2 =
    newVoucherData?.huntsmenIds && newVoucherData?.huntsmenIds?.length > 0

  const hasDataStep3 =
    typeof newVoucherData?.standardPrice === "number" &&
    newVoucherData?.standardPrice >= 0 &&
    typeof newVoucherData?.membershipPrice === "number" &&
    newVoucherData?.membershipPrice >= 0
  typeof newVoucherData?.preferentialPrice === "number" &&
    newVoucherData?.preferentialPrice >= 0
  typeof newVoucherData?.specialPrice === "number" &&
    newVoucherData?.specialPrice >= 0

  const hasDataStep4 = newVoucherData?.animals.every(
    animal => !hasEmptyValue(animal)
  )

  const getFormButton = () => {
    switch (true) {
      case pathname.includes("voucher-step1"):
        if (hasDataStep1) {
          return (
            <Button
              onClick={() =>
                navigate(
                  voucherId
                    ? `/edit-voucher-step2/${voucherId}`
                    : "/new-voucher-step2"
                )
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("voucher-step2"):
        if (hasDataStep1 && hasDataStep2) {
          return (
            <Button
              onClick={() =>
                navigate(
                  voucherId
                    ? `/edit-voucher-step3/${voucherId}`
                    : "/new-voucher-step3"
                )
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("voucher-step3"):
        if (hasDataStep1 && hasDataStep2 && hasDataStep3) {
          return (
            <Button
              onClick={() =>
                navigate(
                  voucherId
                    ? `/edit-voucher-step4/${voucherId}`
                    : "/new-voucher-step4"
                )
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("voucher-step4"):
        if (hasDataStep1 && hasDataStep2 && hasDataStep3 && hasDataStep4) {
          return (
            <Button
              onClick={() =>
                navigate(
                  voucherId
                    ? `/edit-voucher-step5/${voucherId}`
                    : "/new-voucher-step5"
                )
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("voucher-step5"):
        return <Button onClick={onSubmit}>Сохранить</Button>
      default:
        break
    }
  }

  const onSubmit = async () => {
    let result
    if (voucher?.id && newVoucherData) {
      const updatedLimits = newVoucherData.animals.map(animals => ({
        ...animals,
        startDate: convertToISO(animals.huntingStartDate),
        endDate: convertToISO(animals.huntingEndDate)
      }))
      result = await dispatch(
        editMeCompanyVoucher(
          {
            ...newVoucherData,
            animals: updatedLimits
          },
          voucher.id
        )
      )
    } else if (newVoucherData) {
      const updatedAnimals = newVoucherData.animals.map(animal => ({
        ...animal,
        huntingStartDate: convertToISO(animal.huntingStartDate),
        huntingEndDate: convertToISO(animal.huntingEndDate)
      }))

      result = await dispatch(
        createMeCompanyVoucher({
          ...newVoucherData,
          animals: updatedAnimals
        })
      )
    }
    result && navigate("/vouchers")
  }

  return (
    <FormHeader
      steps={steps}
      pathname={pathname}
      getFormButton={getFormButton}
    />
  )
}

export default VoucherFormHeader
