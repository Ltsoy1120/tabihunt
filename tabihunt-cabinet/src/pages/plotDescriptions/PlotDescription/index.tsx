import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Loader from "../../../components/UI/loaders/Loader"
import { useAppDispatch, useAppSelector } from "../../../store"
import { getMeCompanyPlotDescriptionById } from "../../../store/actions/plotsActions"
import PlotDescriptionInfo from "../components/PlotDescriptionInfo"
import "./style.scss"

const PlotDescription = () => {
  const dispatch = useAppDispatch()
  const { plotDescriptionId } = useParams()
  const { plotDescription } = useAppSelector(state => state.plots)

  useEffect(() => {
    plotDescriptionId &&
      dispatch(getMeCompanyPlotDescriptionById(plotDescriptionId))
  }, [plotDescriptionId, dispatch])

  return (
    <>
      {plotDescription ? (
        <PlotDescriptionInfo
          plotDescription={plotDescription}
          animals={plotDescription?.animals.map(animal => animal.name)}
          plot={plotDescription.plot}
        />
      ) : (
        <Loader />
      )}
    </>
  )
}

export default PlotDescription
