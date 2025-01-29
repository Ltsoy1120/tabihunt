import { Dispatch, SetStateAction } from "react"
import { useNavigate } from "react-router-dom"
import Map from "../../../../components/Map"
import DeleteButton from "../../../../components/UI/buttons/DeleteButton"
import EditButton from "../../../../components/UI/buttons/EditButton"
import { getHuntsmanFullName } from "../../../../helpers/common"
import { HuntsmanDto } from "../../../../models/huntsmen"
import { useAppDispatch } from "../../../../store"
import { deleteMeCompanyHuntsman } from "../../../../store/actions/huntsmenActions"
import "./style.scss"

interface HuntsmanCardProps {
  huntsmanShow: HuntsmanDto
  fetchHuntsmen: () => void
  setHuntsmanShow: Dispatch<SetStateAction<HuntsmanDto | null>>
}

const HuntsmanCard = ({
  huntsmanShow,
  fetchHuntsmen,
  setHuntsmanShow
}: HuntsmanCardProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const huntsmanState = [
    {
      title: "Номер",
      value: huntsmanShow?.user.phoneNumber
    },
    { title: "Почта", value: huntsmanShow?.user.email },
    {
      title: "Показать в путевке",
      value: huntsmanShow?.displayInVouchers ? "Да" : "Нет"
    }
  ]

  const locationState = [
    { title: "Участок", value: huntsmanShow?.firstname },
    {
      title: "Домик",
      value: `${huntsmanShow?.latitude}, ${huntsmanShow?.longitude}`
    }
  ]

  const center =
    huntsmanShow.latitude !== null && huntsmanShow.longitude !== null
      ? { lat: huntsmanShow.latitude, lng: huntsmanShow.longitude }
      : undefined

  const editHandler = (huntsman: HuntsmanDto) => {
    navigate(`/edit-huntsman-step1/${huntsman.id}`)
  }

  const deleteHandler = (huntsmanId: string) => {
    dispatch(deleteMeCompanyHuntsman(huntsmanId))
    fetchHuntsmen()
    setHuntsmanShow(null)
  }

  return (
    <div className="huntsman-card">
      <div className="huntsman-card__head">
        <div className="huntsman-card__head-title">
          <h2>{getHuntsmanFullName(huntsmanShow)}</h2>
        </div>
        <div className="btns">
          <EditButton onClick={() => editHandler(huntsmanShow)} />
          <DeleteButton onClick={() => deleteHandler(huntsmanShow.id)} />
        </div>
      </div>
      <div className="huntsman-card__info">
        <div className="block">
          <h3>
            {huntsmanShow?.position === "SENIOR"
              ? "Старший егерь"
              : "Младший егерь"}
          </h3>
          {huntsmanState.map(item => (
            <div key={item.title} className="block__item">
              <span>{item.title}</span>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
        <div className="block">
          <h3>Месторасположение</h3>
          {locationState.map(item => (
            <div key={item.title} className="block__item">
              <span>{item.title}</span>
              <p>{item.value}</p>
            </div>
          ))}
          <div className="map">
            <Map center={center} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HuntsmanCard
