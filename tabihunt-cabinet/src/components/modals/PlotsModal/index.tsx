import { Dispatch, SetStateAction } from "react"
import { PlotDto } from "../../../models/plots"
import { useAppSelector } from "../../../store"
import Modal from "../../UI/Modal"
import Radio from "../../UI/Radio"
import "./style.scss"

interface PlotsModalProps {
  activePlot: PlotDto | null
  setActivePlot: Dispatch<SetStateAction<PlotDto | null>>
  close: () => void
}

const PlotsModal = ({ activePlot, setActivePlot, close }: PlotsModalProps) => {
  const { plots } = useAppSelector(state => state.plots)

  return (
    <Modal size={"360px"} close={close}>
      <div className="plots-modal">
        <h2 className="plots-modal__title">Участки</h2>
        <div className="plots-modal__list">
          <Radio
            label={"Все участки"}
            checked={!activePlot}
            onChangeHandler={() => setActivePlot(null)}
          />
          {plots &&
            plots.length &&
            plots.map(plot => (
              <Radio
                key={plot.id}
                label={plot.name}
                checked={plot.id === activePlot?.id}
                onChangeHandler={() => setActivePlot(plot)}
              />
            ))}
        </div>
      </div>
    </Modal>
  )
}

export default PlotsModal
