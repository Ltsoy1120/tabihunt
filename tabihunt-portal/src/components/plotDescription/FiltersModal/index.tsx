import Button from "@/components/UI/buttons/Button"
import { AnimalDto, AnimalType } from "@/models/animals"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Dispatch, SetStateAction } from "react"
import { useTranslation } from "react-i18next"
import Modal from "../../UI/Modal"
import "./style.scss"

interface FiltersModalProps {
  activeAnimalType: AnimalType
  activeAnimals: AnimalDto[]
  setActiveAnimals: (animals: AnimalDto[]) => void
  setOpenAnimalNamesModal: () => void
  setActiveAnimalType: Dispatch<SetStateAction<AnimalType>>
  setOpenAnimalTypesModal: () => void
  close: () => void
}

const FiltersModal = ({
  activeAnimalType,
  activeAnimals,
  setActiveAnimals,
  setActiveAnimalType,
  setOpenAnimalNamesModal,
  setOpenAnimalTypesModal,
  close
}: FiltersModalProps) => {
  const { t } = useTranslation()
  const { replace } = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const resetAnimalNames = () => {
    setActiveAnimals([])
    const params = new URLSearchParams(searchParams)
    params.delete("animalIds")
    replace(`${pathname}?${params.toString()}`)
  }

  const resetActiveAnimalType = () => {
    setActiveAnimalType(null)
    const params = new URLSearchParams(searchParams)
    params.delete("animalType")
    replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Modal size={"360px"} close={close}>
      <div className="filters-modal">
        <h2 className="filters-modal__title">
          {t("main.filter-select-title")}
        </h2>
        <div className="filters-modal__list">
          <Button
            endIcon={activeAnimalType ? "close" : "arrow-right"}
            onClick={
              activeAnimalType ? resetActiveAnimalType : setOpenAnimalTypesModal
            }
            className={activeAnimalType ? "active" : ""}
          >
            {activeAnimalType === "FEATHERED"
              ? t("main.animal-type-select.feathered")
              : activeAnimalType === "UNGULATE"
              ? t("main.animal-type-select.ungulate")
              : t("main.animal-type-select.title")}
          </Button>
          <Button
            endIcon={activeAnimals.length > 0 ? "close" : "arrow-right"}
            onClick={
              activeAnimals.length > 0
                ? resetAnimalNames
                : setOpenAnimalNamesModal
            }
            className={activeAnimals.length > 0 ? "active" : ""}
          >
            {activeAnimals.length > 0
              ? activeAnimals.map(animal => animal.name).join(", ")
              : t("main.animal-name-select.title")}
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default FiltersModal
