import Icon from "../../../../components/UI/Icon"
import { classMerge, getHuntsmanFullName } from "../../../../helpers/common"
import { HuntsmanDto } from "../../../../models/huntsmen"
import { PlotDto } from "../../../../models/plots"
import "./style.scss"

interface HuntsmenListProps {
  huntsmen: HuntsmanDto[]
  activePlot: PlotDto | null
  activeHuntsman?: HuntsmanDto | null
  handleClick: (searchHuntsman: HuntsmanDto) => void
}

const HuntsmenList = ({
  huntsmen,
  activePlot,
  activeHuntsman,
  handleClick
}: HuntsmenListProps) => {
  return (
    <div className="huntsmen-list">
      {huntsmen.length > 0 ? (
        huntsmen.map(huntsman => (
          <div
            key={huntsman.id}
            className="huntsmen-list__item"
            onClick={() => handleClick(huntsman)}
          >
            <div
              className={classMerge(
                "huntsmen-list__item-info",
                activeHuntsman?.id === huntsman.id ? "active" : ""
              )}
            >
              <p>{getHuntsmanFullName(huntsman)}</p>
              <div className="row">
                <span>
                  Должность:{" "}
                  {huntsman.position === "SENIOR"
                    ? "Старший егерь"
                    : "Младший егерь"}
                </span>
              </div>
            </div>

            <Icon name="arrow-right" size={16} />
          </div>
        ))
      ) : (
        <p>По участку {activePlot?.name} егерей нет</p>
      )}
    </div>
  )
}

export default HuntsmenList
