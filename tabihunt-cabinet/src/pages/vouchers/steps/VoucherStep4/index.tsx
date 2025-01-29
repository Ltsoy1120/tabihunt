import { useEffect, useState } from "react"
import Button from "../../../../components/UI/buttons/Button"
import Input from "../../../../components/UI/Input"
import Loader from "../../../../components/UI/loaders/Loader"
import Tabs from "../../../../components/UI/Tabs"
import { limitsTabs } from "../../../../components/UI/Tabs/tabs"
import useVoucherState from "../../../../hooks/useVoucherState"
import { VoucherAnimalData } from "../../../../models/vouchers"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { getMeCompanyPlotById } from "../../../../store/actions/plotsActions"
import SelectedAnimalCard from "../../components/SelectedAnimalCard"
import "./style.scss"
import { getMeCompanyLimitedAnimals } from "../../../../store/actions/limitedAnimalsActions"
import { PlotDto } from "../../../../models/plots"

const VoucherStep4 = () => {
  const dispatch = useAppDispatch()
  const [activeAnimalType, setActiveAnimalType] = useState("FEATHERED")
  const [plotById, setPlotById] = useState<PlotDto>()
  const { animals, loading } = useAppSelector(state => state.limitedAnimals)
  const { voucher } = useAppSelector(state => state.vouchers)
  const [searchLimit, setSearchLimit] = useState("")

  const [state, setState] = useVoucherState()
  const [selectedAnimals, setSelectedAnimals] = useState<VoucherAnimalData[]>(
    state.animals ?? []
  )

  useEffect(() => {
    const getPlotById = async () => {
      const plot = await dispatch(getMeCompanyPlotById(state.plotId))
      if (plot) {
        setPlotById(plot)
      }
    }
    if (state.plotId) {
      getPlotById()
    }
  }, [state.plotId, dispatch])

  useEffect(() => {
    dispatch(
      getMeCompanyLimitedAnimals({
        animalType: activeAnimalType,
        ...(state.plotId && { plotId: state.plotId }),
        ...(searchLimit && { name: searchLimit })
      })
    )
  }, [state.plotId, activeAnimalType, searchLimit, dispatch])

  useEffect(() => {
    setSelectedAnimals(state.animals)
  }, [state.animals])

  useEffect(() => {
    setState(prevState => ({ ...prevState, animals: selectedAnimals }))
  }, [selectedAnimals])

  const searchLimitHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLimit(event.target.value)
  }

  const voucherLimitsChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    animalId: string
  ) => {
    const { name, value } = event.target
    setSelectedAnimals(prevLimits =>
      prevLimits.map(voucherAnimal =>
        voucherAnimal.animalId === animalId
          ? {
              ...voucherAnimal,
              [name]:
                name.includes("Price") || name === "limitHeads"
                  ? Number(value)
                  : value
            }
          : voucherAnimal
      )
    )
  }

  const addAnimalHandler = (animalId: string) => {
    const isAnimalAdded = selectedAnimals.some(
      animal => animal.animalId === animalId
    )
    if (!isAnimalAdded) {
      const voucherAnimal: VoucherAnimalData = {
        animalId: animalId,
        huntingStartDate: "",
        huntingEndDate: "",
        limitHeads: 0,
        standardPrice: 0,
        membershipPrice: 0,
        preferentialPrice: 0,
        specialPrice: 0
      }
      setSelectedAnimals([...selectedAnimals, voucherAnimal])
    }
  }

  const deleteAnimalHandler = (voucherAnimal: VoucherAnimalData) => {
    setSelectedAnimals(
      selectedAnimals.filter(item => item.animalId !== voucherAnimal.animalId)
    )
  }

  return (
    <div className="new-voucher-step4">
      <div className="add-limit-block">
        <h2>{`Выберите дичь по участку ${
          voucher ? voucher.plot.name : plotById?.name
        }`}</h2>
        <Tabs
          optionTabs={limitsTabs}
          activeTab={activeAnimalType}
          setActiveTab={setActiveAnimalType}
        />
        <Input
          placeholder="Поиск по названию животного"
          value={searchLimit}
          onChange={searchLimitHandler}
          endIcon="search"
        />
        <div className="limits-list">
          {!loading ? (
            animals.length > 0 &&
            animals.map(animal => (
              <div key={animal.id} className="limits-list__item">
                <div>
                  <p>{animal.name}</p>
                  <span>Данный вид дичи имеет лимиты</span>
                </div>
                {!selectedAnimals
                  .map(animal => animal.animalId)
                  .includes(animal.id) ? (
                  <Button
                    onClick={() => {
                      addAnimalHandler(animal.id)
                    }}
                    endIcon="dark-plus"
                  >
                    Добавить
                  </Button>
                ) : (
                  <p className="chosen">Добавлено</p>
                )}
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
      {selectedAnimals.length > 0 && (
        <div className="selected-limits-block">
          {selectedAnimals.map(selectedAnimal => (
            <SelectedAnimalCard
              key={selectedAnimal.animalId}
              selectedAnimal={selectedAnimal}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                voucherLimitsChangeHandler(e, selectedAnimal.animalId)
              }
              deleteAnimalHandler={() => deleteAnimalHandler(selectedAnimal)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default VoucherStep4
