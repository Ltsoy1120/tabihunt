import { Dispatch, SetStateAction } from "react"
import { TypeOptions } from "../../../pages/vouchers/Vouchers"
import Modal from "../../UI/Modal"
import Radio from "../../UI/Radio"
import "./style.scss"

interface AnimalTypesModalProps {
  activeAnimalType: TypeOptions
  setActiveAnimalType: Dispatch<SetStateAction<TypeOptions>>
  close: () => void
}

const AnimalTypesModal = ({
  activeAnimalType,
  setActiveAnimalType,
  close
}: AnimalTypesModalProps) => {
  const animalTypes = [
    { label: "Все", value: null },
    { label: "Пернатые, пушные", value: "FEATHERED" },
    { label: "Копытные", value: "UNGULATE" }
  ]

  return (
    <Modal size={"360px"} close={close}>
      <div className="voucher-type-modal">
        <h2 className="voucher-type-modal__title">Вид дичи</h2>
        <div className="voucher-type-modal__list">
          {animalTypes.map(type => (
            <Radio
              key={type.label}
              label={type.label}
              checked={type.value === activeAnimalType.value}
              onChangeHandler={() => setActiveAnimalType(type)}
            />
          ))}
        </div>
      </div>
    </Modal>
  )
}

export default AnimalTypesModal
