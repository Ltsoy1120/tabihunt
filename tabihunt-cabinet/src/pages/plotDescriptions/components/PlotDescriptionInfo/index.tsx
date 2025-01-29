import Map from "../../../../components/Map"
import { groupWorkingHours } from "../../../../helpers/common"
import {
  PlotDescriptionData,
  PlotDescriptionDto,
  PlotDto
} from "../../../../models/plots"
import { API_URL } from "../../../../services/http.service"
import "./style.scss"
import { store } from "../../../../store"

interface PlotDescriptionInfoProps {
  plotDescription: PlotDescriptionDto | PlotDescriptionData
  animals?: string[]
  plot: PlotDto
}

const PlotDescriptionInfo = ({
  plotDescription,
  animals,
  plot
}: PlotDescriptionInfoProps) => {
  return (
    <div className="plot-description-info">
      <img
        src={`${API_URL}files/${plotDescription?.imageUrl}`}
        alt="plot-image"
      />
      <div className="plot-description-info__section">
        <h2>Об угодье</h2>
        <p>
          {
            plotDescription?.aboutTranslations.find(
              translation =>
                translation.language.toLowerCase() ===
                store.getState().auth.lang
            )?.about
          }
        </p>
      </div>
      {animals && animals?.length > 0 && (
        <div className="plot-description-info__section">
          <h2>Охотничьи виды</h2>
          <div className="row">
            {animals.map((animal, index) => (
              <h4 key={index} className="badge">
                {animal}
              </h4>
            ))}
          </div>
        </div>
      )}
      {(plotDescription?.servicesTranslations[0].services ||
        plotDescription?.servicesTranslations[1].services) && (
        <div className="plot-description-info__section">
          <h2>Услуги и инфраструктура</h2>
          <p>
            {
              plotDescription?.servicesTranslations.find(
                translation =>
                  translation.language.toLowerCase() ===
                  store.getState().auth.lang
              )?.services
            }
          </p>
        </div>
      )}
      <div className="plot-description-info__section">
        <h2>Как нас найти</h2>
        <p>
          Наше охотничье угодье расположено по адресу:
          <br /> {plotDescription?.address}
        </p>
        <div className="row">
          <div className="map">
            <Map
              center={{
                lat: plot.coordinates[0].latitude,
                lng: plot.coordinates[0].longitude
              }}
              plot={plot}
            />
          </div>
          <div className="working-hours__block">
            <div className="working-hours__block-item">
              <img src="/static/images/clock.png" alt="clock-icon" />
              <div>
                {plotDescription &&
                  groupWorkingHours(plotDescription?.workingHours)
                    .split(", ")
                    .map((item, index) => <p key={index}>{item}</p>)}
              </div>
            </div>
            <div className="working-hours__block-item">
              <img src="/static/images/phone.png" alt="phone-icon" />
              <p>{plotDescription?.phoneNumber}</p>
            </div>
            <div className="working-hours__block-item">
              <img src="/static/images/email.png" alt="email-icon" />
              <p>{plotDescription?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlotDescriptionInfo
