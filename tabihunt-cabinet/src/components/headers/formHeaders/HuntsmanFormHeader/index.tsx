import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../store"
import {
  createMeCompanyHuntsman,
  editMeCompanyHuntsman
} from "../../../../store/actions/huntsmenActions"
import Button from "../../../UI/buttons/Button"
import TextButton from "../../../UI/buttons/TextButton"
import FormHeader from "../FormHeader"

const HuntsmanFormHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { huntsmanId } = useParams()
  const { pathname } = useLocation()
  const { huntsman, newHuntsmanData } = useAppSelector(state => state.huntsmen)
  const steps = huntsmanId
    ? [
        { path: `/edit-huntsman-step1/${huntsmanId}`, title: "ЭТАП 1" },
        { path: `/edit-huntsman-step2/${huntsmanId}`, title: "ЭТАП 2" },
        { path: `/edit-huntsman-step3/${huntsmanId}`, title: "ЭТАП 3" },
        { path: `/edit-huntsman-step4/${huntsmanId}`, title: "ЭТАП 4" }
      ]
    : [
        { path: "/new-huntsman-step1", title: "ЭТАП 1" },
        { path: "/new-huntsman-step2", title: "ЭТАП 2" },
        { path: "/new-huntsman-step3", title: "ЭТАП 3" },
        { path: "/new-huntsman-step4", title: "ЭТАП 4" }
      ]

  const hasDataStep1 =
    newHuntsmanData?.firstname &&
    newHuntsmanData.lastname &&
    newHuntsmanData.position &&
    newHuntsmanData?.user?.phoneNumber

  const hasDataStep2 =
    hasDataStep1 &&
    newHuntsmanData?.plotId &&
    newHuntsmanData.latitude &&
    newHuntsmanData.longitude

  const hasDataStep3 =
    newHuntsmanData?.user.email &&
    newHuntsmanData.user.password &&
    hasDataStep1 &&
    hasDataStep2

  const getFormButton = () => {
    switch (true) {
      case pathname.includes("huntsman-step1"):
        if (hasDataStep1) {
          return (
            <Button
              onClick={() =>
                navigate(
                  huntsmanId
                    ? `/edit-huntsman-step2/${huntsmanId}`
                    : "/new-huntsman-step2"
                )
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("huntsman-step2"):
        if (hasDataStep2) {
          return (
            <Button
              onClick={() =>
                navigate(
                  huntsmanId
                    ? `/edit-huntsman-step3/${huntsmanId}`
                    : "/new-huntsman-step3"
                )
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("huntsman-step3"):
        if (hasDataStep3) {
          return (
            <Button
              onClick={() =>
                navigate(
                  huntsmanId
                    ? `/edit-huntsman-step4/${huntsmanId}`
                    : "/new-huntsman-step4"
                )
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("huntsman-step4"):
        return <Button onClick={onSubmit}>Сохранить</Button>
      default:
        break
    }
  }

  const onSubmit = async () => {
    let result
    if (huntsman?.id && newHuntsmanData) {
      result = await dispatch(
        editMeCompanyHuntsman(newHuntsmanData, huntsman.id)
      )
    } else if (newHuntsmanData) {
      result = await dispatch(createMeCompanyHuntsman(newHuntsmanData))
    }

    result && navigate("/huntsmen")
  }

  return (
    <FormHeader
      steps={steps}
      pathname={pathname}
      getFormButton={getFormButton}
    />
  )
}

export default HuntsmanFormHeader
