import { useEffect, useState } from "react"
import Icon from "../../../../components/UI/Icon"
import Input from "../../../../components/UI/Input"
import Loader from "../../../../components/UI/loaders/Loader"
import Tabs from "../../../../components/UI/Tabs"
import { limitsTabs } from "../../../../components/UI/Tabs/tabs"
import useLimitState from "../../../../hooks/useLimitState"
import { AnimalDto } from "../../../../models/animals"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { getAnimals } from "../../../../store/actions/animalsActions"
import { setlimitAnimal } from "../../../../store/slices/limitsSlice"
import "./style.scss"

const LimitStep1 = () => {
  const dispatch = useAppDispatch()
  const [, setState] = useLimitState()

  const [activeAnimalType, setActiveAnimalType] = useState("FEATHERED")
  const { animals, loading } = useAppSelector(state => state.animals)
  const [animal, setAnimal] = useState("")

  useEffect(() => {
    const payload = {
      animalType: activeAnimalType,
      ...(animal && { name: animal })
    }
    dispatch(getAnimals(payload))
  }, [activeAnimalType, animal, dispatch])

  useEffect(() => {
    setAnimal("")
    setState(prev => ({ ...prev, animalId: "" }))
  }, [activeAnimalType, setState])

  useEffect(() => {
    if (
      animals.length === 1 &&
      animals[0].name.toLocaleLowerCase() === animal.toLocaleLowerCase()
    ) {
      setState(prev => ({ ...prev, animalId: animals[0].id }))
    }
  }, [animals, setState])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(prev => ({ ...prev, animalId: "" }))
    setAnimal(event.target.value)
  }

  const handleClick = (animal: AnimalDto) => {
    setState(prev => ({ ...prev, animalId: animal.id }))
    setAnimal(animal.name)
    dispatch(setlimitAnimal(animal))
  }

  return (
    <div className="new-limit-step1">
      <h2>Выберите дичь из справочника</h2>
      <Tabs
        optionTabs={limitsTabs}
        activeTab={activeAnimalType}
        setActiveTab={setActiveAnimalType}
      />
      <Input
        placeholder="Поиск животного по названию"
        name=""
        value={animal}
        onChange={handleChange}
        endIcon="search"
      />
      <div className="animals-list">
        {!loading ? (
          animals.length > 0 &&
          animals.map(animal => (
            <div
              key={animal.id}
              className="animals-list__item"
              onClick={() => handleClick(animal)}
            >
              <p>{animal.name}</p>
              <Icon name="arrow-right" size={16} />
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}

export default LimitStep1
