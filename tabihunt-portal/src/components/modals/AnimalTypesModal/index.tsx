import Button from "@/components/UI/buttons/Button"
import { AnimalType } from "@/models/animals"
import { useTranslation } from "react-i18next"
import Modal from "../../UI/Modal"
import Radio from "../../UI/Radio"
import "./style.scss"

interface AnimalTypesModalProps {
  activeAnimalType: AnimalType
  selectAnimalType: (animalType: AnimalType) => void
  close: () => void
  onSubmit: () => void
}

const AnimalTypesModal = ({
  activeAnimalType,
  selectAnimalType,
  close,
  onSubmit
}: AnimalTypesModalProps) => {
  const { t } = useTranslation()
  const animalTypes: AnimalType[] = ["FEATHERED", "UNGULATE"]

  return (
    <Modal size={"360px"} close={close}>
      <div className="animalTypes-modal">
        <h2 className="animalTypes-modal__title">
          {t("main.animal-type-select.title")}
        </h2>
        <div className="animalTypes-modal__list">
          <Radio
            label={t("main.animal-type-select.modal.all")}
            checked={!activeAnimalType}
            onChangeHandler={() => selectAnimalType(null)}
          />
          {animalTypes.map(animalType => (
            <Radio
              key={animalType}
              label={
                animalType === "FEATHERED"
                  ? t("main.animal-type-select.feathered")
                  : t("main.animal-type-select.ungulate")
              }
              checked={animalType === activeAnimalType}
              onChangeHandler={() => selectAnimalType(animalType)}
            />
          ))}
        </div>
        <Button onClick={onSubmit}>
          {t("main.animal-type-select.modal.button")}
        </Button>
      </div>
    </Modal>
  )
}

export default AnimalTypesModal
