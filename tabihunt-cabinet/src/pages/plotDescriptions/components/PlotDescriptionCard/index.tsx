import { useNavigate } from "react-router-dom"
import Button from "../../../../components/UI/buttons/Button"
import DeleteButton from "../../../../components/UI/buttons/DeleteButton"
import EditButton from "../../../../components/UI/buttons/EditButton"
import { PlotDescriptionDto } from "../../../../models/plots"
import { API_URL } from "../../../../services/http.service"
import { store, useAppDispatch } from "../../../../store"
import { deleteMeCompanyPlotDescription } from "../../../../store/actions/plotsActions"
import { setPlotDescription } from "../../../../store/slices/plotsSlice"
import "./style.scss"

interface PlotDescriptionCardProps {
  plotDescription: PlotDescriptionDto
}

const PlotDescriptionCard = ({ plotDescription }: PlotDescriptionCardProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const editHandler = (plotDescription: PlotDescriptionDto) => {
    dispatch(setPlotDescription(plotDescription))
    navigate(`/edit-plot-description-step1/${plotDescription.id}`)
  }

  const deleteHandler = (plotDescriptionId: string) => {
    dispatch(deleteMeCompanyPlotDescription(plotDescriptionId))
  }

  return (
    <div className="plot-description-card">
      <div className="plot-description-card__img">
        <img
          src={`${API_URL}files/${plotDescription?.imageUrl}`}
          alt="plot-image"
        />
      </div>
      <div className="plot-description-card__info">
        <div className="plot-description-card__info-description">
          <div>
            <h3>{plotDescription.plot.name}</h3>
            <span>
              {
                plotDescription.aboutTranslations.find(
                  t => t.language.toLowerCase() === store.getState().auth.lang
                )?.about
              }
            </span>
          </div>
          <div className="plot-description-card__actions">
            <EditButton onClick={() => editHandler(plotDescription)} />
            <DeleteButton onClick={() => deleteHandler(plotDescription.id)} />
          </div>
        </div>
        <div className="plot-description-card__info-animals">
          <div>
            <span>Охотничьи виды</span>
            <p>
              {plotDescription.animals.map(animal => animal.name).join(", ")}
            </p>
          </div>
          <Button
            onClick={() => navigate(`/plot-description/${plotDescription.id}`)}
          >
            Подробнее
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PlotDescriptionCard
