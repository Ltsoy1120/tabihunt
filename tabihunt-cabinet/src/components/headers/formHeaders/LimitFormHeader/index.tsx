import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { createMeCompanyLimit } from "../../../../store/actions/limitsActions"
import Button from "../../../UI/buttons/Button"
import TextButton from "../../../UI/buttons/TextButton"
import FormHeader from "../FormHeader"

const steps = [
  { path: "limit-step1", title: "ЭТАП 1" },
  { path: "limit-step2", title: "ЭТАП 2" },
  { path: "limit-step3", title: "ЭТАП 3" }
]

const LimitFormHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { newLimitData } = useAppSelector(state => state.limits)

  const getFormButton = () => {
    switch (true) {
      case pathname.includes("limit-step1"):
        if (newLimitData?.animalId) {
          return (
            <Button onClick={() => navigate("/new-limit-step2")}>Далее</Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("limit-step2"):
        if (newLimitData?.number && newLimitData?.plotId) {
          return (
            <Button onClick={() => navigate("/new-limit-step3")}>Далее</Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("limit-step3"):
        return <Button onClick={onSubmit}>Сохранить</Button>
      default:
        break
    }
  }

  const onSubmit = async () => {
    if (newLimitData) {
      const result = await dispatch(
        createMeCompanyLimit({
          ...newLimitData
        })
      )
      result && navigate("/limits")
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

export default LimitFormHeader
