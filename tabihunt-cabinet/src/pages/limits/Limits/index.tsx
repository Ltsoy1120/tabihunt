import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Empty from "../../../components/Empty"
import Tabs from "../../../components/UI/Tabs"
import Button from "../../../components/UI/buttons/Button"
import TextButton from "../../../components/UI/buttons/TextButton"
import Input from "../../../components/UI/Input"
import { useAppDispatch, useAppSelector } from "../../../store"
import { getMeCompanyLimits } from "../../../store/actions/limitsActions"
import { LimitDto } from "../../../models/limits"
import LimitCard from "../components/LimitCard"
import LimitsList from "../components/LimitsList"
import PlotsModal from "../../../components/modals/PlotsModal"
import { PlotDto } from "../../../models/plots"
import { limitsTabs } from "../../../components/UI/Tabs/tabs"
import { setLimit, setNewLimitData } from "../../../store/slices/limitsSlice"
import "./style.scss"
import Loader from "../../../components/UI/loaders/Loader"
import { setPlot } from "../../../store/slices/plotsSlice"

const Limits = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const checkList = useAppSelector(state => state.company.checklist)
  const { limits, loading } = useAppSelector(state => state.limits)
  const [activePlot, setActivePlot] = useState<PlotDto | null>(null)
  const [activeAnimalType, setActiveAnimalType] = useState("FEATHERED")
  const [isOpenModal, setOpenModal] = useState(false)
  const [searchLimit, setSearchLimit] = useState("")
  const [activeLimit, setActiveLimit] = useState<LimitDto | null>(null)

  const fetchLimits = () => {
    dispatch(
      getMeCompanyLimits({
        animalType: activeAnimalType,
        ...(activePlot && { plotId: activePlot.id }),
        ...(searchLimit && { name: searchLimit })
      })
    )
  }

  useEffect(() => {
    fetchLimits()
  }, [activePlot, activeAnimalType, searchLimit])

  useEffect(() => {
    dispatch(setNewLimitData(null))
    dispatch(setLimit(null))
    dispatch(setPlot(null))
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLimit(event.target.value)
  }

  const handleClick = (limit: LimitDto) => {
    setActiveLimit(limit)
    dispatch(setLimit(limit))
  }

  return (
    <>
      {checkList?.limits ? (
        <>
          {isOpenModal && (
            <PlotsModal
              activePlot={activePlot}
              setActivePlot={setActivePlot}
              close={() => setOpenModal(false)}
            />
          )}
          <div className="limits">
            <div className="limits-info">
              <div className="limits-info__head">
                <TextButton
                  endIcon="arrow-down"
                  onClick={() => setOpenModal(true)}
                >
                  {activePlot?.name ?? "Все участки"}
                </TextButton>
                <Button
                  endIcon="plus"
                  onClick={() => navigate("/new-limit-step1")}
                >
                  Добавить
                </Button>
              </div>
              <Tabs
                optionTabs={limitsTabs}
                activeTab={activeAnimalType}
                setActiveTab={setActiveAnimalType}
              />
              <Input
                placeholder="Поиск лимита по названию животного"
                value={searchLimit}
                onChange={handleChange}
                endIcon="search"
              />
              {loading ? (
                <Loader />
              ) : (
                <LimitsList
                  limits={limits}
                  activePlot={activePlot}
                  activeLimit={activeLimit}
                  handleClick={handleClick}
                />
              )}
            </div>

            {activeLimit && <LimitCard fetchLimits={fetchLimits} />}
          </div>
        </>
      ) : (
        <Empty />
      )}
    </>
  )
}

export default Limits
