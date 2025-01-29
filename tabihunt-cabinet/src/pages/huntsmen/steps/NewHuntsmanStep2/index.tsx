import { useState, useEffect } from "react"
import Map from "../../../../components/Map"
import Input from "../../../../components/UI/Input"
import Select from "../../../../components/UI/Select"
import { getPlotsOptions } from "../../../../helpers/common"
import useHuntsmanState from "../../../../hooks/useHuntsmanState"
import { PlotDto } from "../../../../models/plots"
import { useAppDispatch, useAppSelector } from "../../../../store"
import {
  getMeCompanyPlotById,
  getMeCompanyPlots
} from "../../../../store/actions/plotsActions"
import "./style.scss"

const NewHuntsmanStep2 = () => {
  const dispatch = useAppDispatch()
  const { plots } = useAppSelector(state => state.plots)
  const [state, setState] = useHuntsmanState()
  const [plotById, setPlotById] = useState<PlotDto>()

  useEffect(() => {
    if (!plots.length) {
      dispatch(getMeCompanyPlots())
    }
    const getPlotById = async () => {
      const plot = await dispatch(getMeCompanyPlotById(state.plotId))
      if (plot) {
        setPlotById(plot)
      }
    }
    if (state.plotId) {
      getPlotById()
    }
  }, [state.plotId, plots, dispatch])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState(prevState => ({ ...prevState, [name]: value }))
  }

  const handlePlotChange = (plot: { value: string; title: string }) => {
    setState(prev => ({ ...prev, plotId: plot.value }))
  }

  // обработчик клика по карте с получением координат
  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const latitude = parseFloat(event.latLng.lat().toFixed(4))
      const longitude = parseFloat(event.latLng.lng().toFixed(4))
      setState(prevState => ({ ...prevState, latitude, longitude }))
    }
  }

  return (
    <div className="new-huntsman-step2">
      <div className="map-wrapper">
        <h2>Укажите на карте</h2>
        <div className="map">
          <Map onMapClick={handleMapClick} hasSearch={true} />
        </div>
      </div>
      <div className="coordinate">
        <h2>Координаты домика</h2>
        <div className="form">
          <h3>Участок</h3>
          <Select
            options={getPlotsOptions(plots)}
            label="Выберите участок"
            selected={{ value: state.plotId, title: plotById?.name || "" }}
            onChange={handlePlotChange}
          />
          <div className="row">
            <div className="input-box">
              <h3>Широта</h3>
              <Input
                placeholder="Обязательно"
                name="latitude"
                type="number"
                value={String(state.latitude)}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <h3>Долгота</h3>
              <Input
                placeholder="Обязательно"
                name="longitude"
                type="number"
                value={String(state.longitude)}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewHuntsmanStep2
