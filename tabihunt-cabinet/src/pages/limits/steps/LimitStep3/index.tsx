import { getPlotById } from "../../../../helpers/common"
import { useAppSelector } from "../../../../store"
import "./style.scss"

const LimitStep3 = () => {
  const { limitAnimalType, limitAnimal, newLimitData } = useAppSelector(
    state => state.limits
  )
  const { plots } = useAppSelector(state => state.plots)

  const limitState = [
    { title: "Номер", value: newLimitData?.number },
    {
      title: "Дичь",
      value: limitAnimalType === "FEATHERED" ? "Пернатые, пушные" : "Копытные"
    },
    {
      title: "Название",
      value: limitAnimal?.name
    },
    {
      title: "Участок",
      value: newLimitData?.plotId
        ? getPlotById(newLimitData?.plotId, plots)?.name
        : ""
    },
    { title: "Доступно", value: newLimitData?.availableHeads },
    { title: "Продано", value: newLimitData?.soldHeads },
    { title: "Удержание", value: newLimitData?.reservedHeads },
  ]

  return (
    <div className="new-limit-step3">
      <h2>Лимит</h2>
      <div className="limit__info">
        {limitState.map(item => (
          <div key={item.title} className="limit__info-item">
            <span>{item.title}</span>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LimitStep3
