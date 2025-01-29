import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Empty from "../../../components/Empty"
import PlotsModal from "../../../components/modals/PlotsModal"
import Button from "../../../components/UI/buttons/Button"
import TextButton from "../../../components/UI/buttons/TextButton"
import Input from "../../../components/UI/Input"
import { HuntsmanDto } from "../../../models/huntsmen"
import { PlotDto } from "../../../models/plots"
import { useAppDispatch, useAppSelector } from "../../../store"
import { getMeCompanyHuntsmen } from "../../../store/actions/huntsmenActions"
import HuntsmanCard from "../components/HuntsmanCard"
import HuntsmenList from "../components/HuntsmenList"
import "./style.scss"

const Huntsmen = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const checkList = useAppSelector(state => state.company.checklist)
  const { huntsmen } = useAppSelector(state => state.huntsmen)
  const [activePlot, setActivePlot] = useState<PlotDto | null>(null)
  const [isOpenModal, setOpenModal] = useState(false)
  const [searchHuntsman, setSearchHuntsman] = useState("")
  const [huntsmanShow, setHuntsmanShow] = useState<HuntsmanDto | null>(null)

  const fetchHuntsmen = () => {
    dispatch(
      getMeCompanyHuntsmen({
        ...(activePlot && { plotId: activePlot.id }),
        ...(searchHuntsman && { fullname: searchHuntsman })
      })
    )
  }

  useEffect(() => {
    fetchHuntsmen()
  }, [activePlot, searchHuntsman])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchHuntsman(event.target.value)
  }

  const handleClick = (searchHuntsman: HuntsmanDto) => {
    setHuntsmanShow(searchHuntsman)
  }

  return (
    <>
      {checkList?.huntsmen ? (
        <>
          {isOpenModal && (
            <PlotsModal
              activePlot={activePlot}
              setActivePlot={setActivePlot}
              close={() => setOpenModal(false)}
            />
          )}
          <div className="huntsmen">
            <div className="huntsmen-info">
              <div className="huntsmen-info__head">
                <TextButton
                  endIcon="arrow-down"
                  onClick={() => setOpenModal(true)}
                >
                  {activePlot?.name ?? "Все участки"}
                </TextButton>
                <Button
                  endIcon="plus"
                  onClick={() => navigate("/new-huntsman-step1")}
                >
                  Добавить
                </Button>
              </div>

              <Input
                placeholder="Поиск егеря по ФИО"
                value={searchHuntsman}
                onChange={handleChange}
                endIcon="search"
              />
              <HuntsmenList
                huntsmen={huntsmen}
                activePlot={activePlot}
                activeHuntsman={huntsmanShow}
                handleClick={handleClick}
              />
            </div>

            {huntsmanShow && (
              <HuntsmanCard
                huntsmanShow={huntsmanShow}
                fetchHuntsmen={fetchHuntsmen}
                setHuntsmanShow={setHuntsmanShow}
              />
            )}
          </div>
        </>
      ) : (
        <Empty />
      )}
    </>
  )
}

export default Huntsmen
