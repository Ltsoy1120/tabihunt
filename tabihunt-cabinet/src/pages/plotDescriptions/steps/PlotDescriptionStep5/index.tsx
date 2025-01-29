import { useState, useEffect } from "react"
import Loader from "../../../../components/UI/loaders/Loader"
import { PlotDto } from "../../../../models/plots"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { getMeCompanyPlotById } from "../../../../store/actions/plotsActions"
import PlotDescriptionInfo from "../../components/PlotDescriptionInfo"
import "./style.scss"

const PlotDescriptionStep5 = () => {
  const dispatch = useAppDispatch()
  // const { limits } = useAppSelector(state => state.limits)
  const { plotDescriptionData } = useAppSelector(state => state.plots)
  // const [animals, setAnimals] = useState<string[]>([])
  const [plot, setPlot] = useState<PlotDto>()

  // useEffect(() => {
  //   const fetchAnimals = async () => {
  //     const uniqueAnimalIds = new Set<string>()
  //     const names = limits
  //       .filter(limit => {
  //         if (
  //           !uniqueAnimalIds.has(limit.animal.id) &&
  //           plotDescriptionData?.animalIds.includes(limit.animal.id)
  //         ) {
  //           uniqueAnimalIds.add(limit.animal.id)
  //           return true
  //         }
  //         return false
  //       })
  //       .map(limit => limit.animal.name)

  //     setAnimals(names)
  //   }

  //   if (plotDescriptionData?.animalIds.length) {
  //     fetchAnimals()
  //   }
  // }, [plotDescriptionData?.animalIds])

  useEffect(() => {
    const fetchPlotById = async () => {
      const plot =
        plotDescriptionData?.plotId &&
        (await dispatch(getMeCompanyPlotById(plotDescriptionData?.plotId)))
      plot && setPlot(plot)
    }

    if (plotDescriptionData?.plotId) {
      fetchPlotById()
    }
  }, [plotDescriptionData?.plotId])

  return (
    <>
      {plotDescriptionData && plot ? (
        <PlotDescriptionInfo
          plotDescription={plotDescriptionData}
          // animals={animals}
          plot={plot}
        />
      ) : (
        <Loader />
      )}
    </>
  )
}

export default PlotDescriptionStep5
