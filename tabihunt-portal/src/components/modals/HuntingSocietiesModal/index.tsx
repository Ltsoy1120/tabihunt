import Button from "@/components/UI/buttons/Button"
import { HuntingSocietyDto } from "@/models/huntingSociety"
import { PlotDto } from "@/models/plots"
import { SetStateAction } from "react"
import { useTranslation } from "react-i18next"
import Modal from "../../UI/Modal"
import Radio from "../../UI/Radio"
import "./style.scss"

interface HuntingSocietiesModalProps {
  activeHuntingSociety: "all" | "me"
  setActiveHuntingSociety: (value: SetStateAction<"all" | "me">) => void
  close: () => void
  onSubmit: () => void
}

const HuntingSocietiesModal = ({
  activeHuntingSociety,
  setActiveHuntingSociety,
  close,
  onSubmit
}: HuntingSocietiesModalProps) => {
  const { t } = useTranslation()
  return (
    <Modal size={"360px"} close={close}>
      <div className="hunting-societies-modal">
        <h2 className="hunting-societies-modal__title">{t("select.title")}</h2>
        <div className="hunting-societies-modal__list">
          <Radio
            label={t("select.all")}
            checked={activeHuntingSociety === "all"}
            onChangeHandler={() => setActiveHuntingSociety("all")}
          />
          <Radio
            label={t("select.me")}
            checked={activeHuntingSociety === "me"}
            onChangeHandler={() => setActiveHuntingSociety("me")}
          />
        </div>
        <Button onClick={onSubmit}>{t("select.button")}</Button>
      </div>
    </Modal>
  )
}

export default HuntingSocietiesModal
