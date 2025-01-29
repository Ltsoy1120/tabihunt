import Icon from "../../../../components/UI/Icon"
import { classMerge } from "../../../../helpers/common"
import { LimitDto } from "../../../../models/limits"
import { PlotDto } from "../../../../models/plots"
import "./style.scss"

interface LimitsListProps {
  limits: LimitDto[]
  activePlot: PlotDto | null
  activeLimit?: LimitDto | null
  handleClick: (limit: LimitDto) => void
}

const LimitsList = ({
  limits,
  activePlot,
  activeLimit,
  handleClick
}: LimitsListProps) => {
  return (
    <div className="limits-list">
      {limits.length > 0 ? (
        limits.map(limit => (
          <div
            key={limit.id}
            className="limits-list__item"
            onClick={() => handleClick(limit)}
          >
            <div
              className={classMerge(
                "limits-list__item-info",
                activeLimit?.id === limit.id ? "active" : ""
              )}
            >
              <p>
                {limit.animal.name} № {limit.number}{" "}
              </p>
              <div className="row">
                <span>Доступно: {limit.availableHeads}</span>
                <span>Продано: {limit.soldHeads}</span>
                <span>Удержано: {limit.reservedHeads}</span>
              </div>
            </div>

            <Icon name="arrow-right" size={16} />
          </div>
        ))
      ) : (
        <p>По участку {activePlot?.name} лимитов нет</p>
      )}
    </div>
  )
}

export default LimitsList
