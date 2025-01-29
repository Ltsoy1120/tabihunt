import { useState } from "react"
import { useTranslation } from "react-i18next"
import AnimalCheckbox from "@/components/plotDescription/AnimalCheckbox"
import Button from "@/components/UI/buttons/Button"
import Input from "@/components/UI/Input"
import Modal from "@/components/UI/Modal"
import Radio from "@/components/UI/Radio"
import { AnimalDto } from "@/models/animals"
import "./style.scss"

interface AnimalTypesModalProps {
  animals: AnimalDto[]
  activeAnimals: AnimalDto[]
  setActiveAnimals: (animals: AnimalDto[]) => void
  close: () => void
  onSubmit: (animals: AnimalDto[]) => void
}

const AnimalNamesModal = ({
  animals,
  activeAnimals,
  setActiveAnimals,
  close,
  onSubmit
}: AnimalTypesModalProps) => {
  const { t } = useTranslation()
  const [searchAnimal, setSearchAnimal] = useState<string>("")
  const [selectedAnimals, setSelectedAnimals] = useState<AnimalDto[]>(
    activeAnimals ?? []
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnimals([])
    setSearchAnimal(event.target.value)
  }

  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(searchAnimal.toLowerCase())
  )

  const onChangeAnimalSelection = (animal: AnimalDto) => {
    setSelectedAnimals(prevSelected =>
      prevSelected.includes(animal)
        ? prevSelected.filter(item => item.id !== animal.id)
        : [...prevSelected, animal]
    )
  }

  const setAnimalHandler = () => {
    setActiveAnimals(selectedAnimals)
    onSubmit(selectedAnimals)
  }

  return (
    <Modal size={"360px"} hasScroll close={close}>
      <div className="animalNames-modal">
        <h2 className="animalNames-modal__title">
          {t("main.animal-name-select.title")}
        </h2>
        <Input
          placeholder={t("main.animal-name-select.modal.search")}
          name=""
          value={searchAnimal}
          onChange={handleChange}
          endIcon="search"
        />
        <div className="animalNames-modal__list">
          <Radio
            label={t("main.animal-type-select.modal.all")}
            checked={selectedAnimals.length === 0}
            onChangeHandler={() => setSelectedAnimals([])}
          />
          {filteredAnimals.length > 0 ? (
            filteredAnimals.map(animal => (
              <AnimalCheckbox
                key={animal.id}
                label={animal.name}
                checked={selectedAnimals.some(a => a.id === animal.id)}
                onChange={() => onChangeAnimalSelection(animal)}
              />
            ))
          ) : (
            <p>{t("main.animal-type-select.empty")}</p>
          )}
        </div>
        <Button onClick={setAnimalHandler}>
          {t("main.animal-name-select.modal.button")}
        </Button>
      </div>
    </Modal>
  )
}

export default AnimalNamesModal
