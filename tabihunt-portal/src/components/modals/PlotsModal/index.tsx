import Button from "@/components/UI/buttons/Button"
import { PlotDto } from "@/models/plots"
import { useTranslation } from "react-i18next"
import Modal from "../../UI/Modal"
import Radio from "../../UI/Radio"
import "./style.scss"

interface PlotsModalProps {
  plots: PlotDto[]
  activePlot: PlotDto | null
  selectPlot: (plot: PlotDto | null) => void
  close: () => void
  onSubmit: () => void
}

const PlotsModal = ({
  plots,
  activePlot,
  selectPlot,
  close,
  onSubmit
}: PlotsModalProps) => {
  const { t } = useTranslation()
  return (
    <Modal size={"360px"} hasScroll={true} close={close}>
      <div className="plots-modal">
        <h2 className="plots-modal__title">
          {t("main.plot-select.modal.title")}
        </h2>
        <div className="plots-modal__list">
          <Radio
            label="Все угодья"
            checked={!activePlot}
            onChangeHandler={() => selectPlot(null)}
          />
          {plots && plots.length > 0 ? (
            plots.map(plot => (
              <Radio
                key={plot.id}
                label={plot.name}
                checked={plot.id === activePlot?.id}
                onChangeHandler={() => selectPlot(plot)}
              />
            ))
          ) : (
            <p>{t("main.plot-select.modal.empty")}</p>
          )}
        </div>
        <Button onClick={onSubmit}>{t("main.plot-select.modal.button")}</Button>
      </div>
    </Modal>
  )
}

export default PlotsModal
