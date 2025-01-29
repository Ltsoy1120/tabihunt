import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../../store"
import {
  createMeCompanyPlotDescription,
  editMeCompanyPlotDescription
} from "../../../../store/actions/plotsActions"
import Button from "../../../UI/buttons/Button"
import TextButton from "../../../UI/buttons/TextButton"
import FormHeader from "../FormHeader"

const PlotDescriptionsFormHeader = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { plotDescriptionId } = useParams()
  const { plotDescriptionData } = useAppSelector(state => state.plots)

  const steps = plotDescriptionId
    ? [
        {
          path: `/edit-plot-description-step1/${plotDescriptionId}`,
          title: "ЭТАП 1"
        },
        {
          path: `/edit-plot-description-step2/${plotDescriptionId}`,
          title: "ЭТАП 2"
        },
        {
          path: `/edit-plot-description-step3/${plotDescriptionId}`,
          title: "ЭТАП 3"
        },
        {
          path: `/edit-plot-description-step4/${plotDescriptionId}`,
          title: "ЭТАП 4"
        },
        {
          path: `/edit-plot-description-step5/${plotDescriptionId}`,
          title: "ЭТАП 5"
        }
      ]
    : [
        { path: "/new-plot-description-step1", title: "ЭТАП 1" },
        { path: "/new-plot-description-step2", title: "ЭТАП 2" },
        { path: "/new-plot-description-step3", title: "ЭТАП 3" },
        { path: "/new-plot-description-step4", title: "ЭТАП 4" },
        { path: "/new-plot-description-step5", title: "ЭТАП 5" }
      ]

  const hasDataStep1 =
    plotDescriptionData?.plotId &&
    plotDescriptionData.aboutTranslations &&
    plotDescriptionData.imageUrl

  const isValidWorkingHours = () => {
    return (
      plotDescriptionData &&
      Object.values(plotDescriptionData?.workingHours).some(
        hours => hours.start !== "00:00" && hours.end !== "00:00"
      )
    )
  }
  const hasDataStep2 = hasDataStep1 && isValidWorkingHours()

  const hasDataStep3 = hasDataStep2 && plotDescriptionData.servicesTranslations
  const hasDataStep4 = hasDataStep3 && plotDescriptionData.servicesTranslations

  const getFormButton = () => {
    switch (true) {
      case pathname.includes("plot-description-step1"):
        if (hasDataStep1) {
          return (
            <Button
              onClick={() =>
                navigate(
                  plotDescriptionId
                    ? `/edit-plot-description-step2/${plotDescriptionId}`
                    : "/new-plot-description-step2"
                )
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("plot-description-step2"):
        if (hasDataStep2) {
          return (
            <Button
              onClick={() =>
                navigate(
                  plotDescriptionId
                    ? `/edit-plot-description-step3/${plotDescriptionId}`
                    : "/new-plot-description-step3"
                )
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("plot-description-step3"):
        if (hasDataStep3) {
          return (
            <Button
              onClick={() =>
                navigate(
                  plotDescriptionId
                    ? `/edit-plot-description-step4/${plotDescriptionId}`
                    : "/new-plot-description-step4"
                )
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("plot-description-step4"):
        if (hasDataStep4) {
          return (
            <Button
              onClick={() =>
                navigate(
                  plotDescriptionId
                    ? `/edit-plot-description-step5/${plotDescriptionId}`
                    : "/new-plot-description-step5"
                )
              }
            >
              Далее
            </Button>
          )
        }
        return <TextButton>Заполните данные</TextButton>
      case pathname.includes("plot-description-step5"):
        return <Button onClick={onSubmit}>Сохранить</Button>
      default:
        break
    }
  }

  const onSubmit = async () => {
    if (plotDescriptionData) {
      const areServicesEmpty = plotDescriptionData?.servicesTranslations.every(
        translation => translation.services === ""
      )

      let updatedPlotDescriptionData = { ...plotDescriptionData }

      if (areServicesEmpty) {
        updatedPlotDescriptionData = {
          ...updatedPlotDescriptionData,
          servicesTranslations: []
        }
      }

      let result
      if (plotDescriptionId) {
        result = await dispatch(
          editMeCompanyPlotDescription(
            updatedPlotDescriptionData,
            plotDescriptionId
          )
        )
      } else {
        result = await dispatch(
          createMeCompanyPlotDescription(updatedPlotDescriptionData)
        )
      }

      if (result) {
        navigate("/plot-descriptions")
      }
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

export default PlotDescriptionsFormHeader
