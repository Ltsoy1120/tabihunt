import { useEffect } from "react"
import Empty from "../../../components/Empty"
import Loader from "../../../components/UI/loaders/Loader"
import { useAppDispatch, useAppSelector } from "../../../store"
import { getMeCompanyPlotDescriptions } from "../../../store/actions/plotsActions"
import {
  setPlotDescription,
  setPlotDescriptionData
} from "../../../store/slices/plotsSlice"
import PlotDescriptionCard from "../components/PlotDescriptionCard"
import "./style.scss"

const PlotDescriptions = () => {
  const dispatch = useAppDispatch()
  const { plotDescriptions, loading } = useAppSelector(state => state.plots)

  useEffect(() => {
    dispatch(getMeCompanyPlotDescriptions())
    dispatch(setPlotDescriptionData(null))
    dispatch(setPlotDescription(null))
  }, [dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {plotDescriptions.length > 0 ? (
            <div className="plot-descriptions">
              {plotDescriptions.map(plot => (
                <PlotDescriptionCard key={plot.id} plotDescription={plot} />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </>
      )}
    </>
  )
}

export default PlotDescriptions
