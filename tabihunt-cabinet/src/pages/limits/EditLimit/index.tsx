import { useState, useEffect } from "react"
import Input from "../../../components/UI/Input"
import Select from "../../../components/UI/Select"
import { getPlotsOptions } from "../../../helpers/common"
import useLimitState from "../../../hooks/useLimitState"
import { PlotDto } from "../../../models/plots"
import { useAppDispatch, useAppSelector } from "../../../store"
import {
  getMeCompanyPlotById,
  getMeCompanyPlots
} from "../../../store/actions/plotsActions"
import "./style.scss"

const EditLimit = () => {
  const dispatch = useAppDispatch()
  const { plots } = useAppSelector(state => state.plots)
  const { limit } = useAppSelector(state => state.limits)
  const [state, setState] = useLimitState()
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

    if (["availableHeads", "reservedHeads"].includes(name)) {
      setState(prev => ({ ...prev, [name]: Number(value) }))
    } else {
      setState(prev => ({ ...prev, [name]: value }))
    }
  }

  const handlePlotChange = (plot: { value: string; title: string }) => {
    setState(prev => ({ ...prev, plotId: plot.value }))
  }

  return (
    <div className="new-limit-step2">
      {limit && (
        <h2>
          {limit.animal.name} № {limit.number}
        </h2>
      )}
      <h3>Участок</h3>
      <Select
        options={getPlotsOptions(plots)}
        label="Выберите участок"
        selected={{ value: state.plotId, title: plotById?.name || "" }}
        onChange={handlePlotChange}
      />
      <div className="inputs-row">
        <div className="input-box">
          <h3>Разрешение</h3>
          <Input
            placeholder="Голов"
            name="availableHeads"
            type="number"
            value={String(state.availableHeads)}
            onChange={handleChange}
          />
        </div>
        <div className="input-box">
          <h3>Удержать</h3>
          <Input
            placeholder="Голов"
            name="reservedHeads"
            type="number"
            value={String(state.reservedHeads)}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default EditLimit
