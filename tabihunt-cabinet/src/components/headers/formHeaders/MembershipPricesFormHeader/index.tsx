import { useLocation, useNavigate } from "react-router-dom"
import { hasEmptyValue } from "../../../../helpers/common"
import { UpdateCurrentCompanyData } from "../../../../models/companies"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { updateMeCompanyMembership } from "../../../../store/actions/companyActions"
import Button from "../../../UI/buttons/Button"
import TextButton from "../../../UI/buttons/TextButton"
import FormHeader from "../FormHeader"

const steps = [
  { path: "/new-membership-step1", title: "ЭТАП 1" },
  { path: "/new-membership-step2", title: "ЭТАП 2" }
]

const MembershipPricesFormHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { membershipPrice } = useAppSelector(state => state.company)

  const getFormButton = () => {
    switch (pathname) {
      case "/settings-membership-prices-step1":
        if (!hasEmptyValue(membershipPrice)) {
          return (
            <Button
              onClick={() => navigate("/settings-membership-prices-step2")}
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>

      case "/settings-membership-prices-step2":
        return (
          <Button onClick={updateMeCompanyMembershipPrice}>Сохранить</Button>
        )
      default:
        break
    }
  }

  const updateMeCompanyMembershipPrice = async () => {
    if (!hasEmptyValue(membershipPrice)) {
      const result = await dispatch(
        updateMeCompanyMembership(membershipPrice as UpdateCurrentCompanyData)
      )
      result && navigate("/memberships")
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

export default MembershipPricesFormHeader
