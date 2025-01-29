import { useNavigate } from "react-router-dom"
import DeleteButton from "../../../../components/UI/buttons/DeleteButton"
import EditButton from "../../../../components/UI/buttons/EditButton"
import { useAppDispatch, useAppSelector } from "../../../../store"
import { deleteLimitById } from "../../../../store/actions/limitsActions"
import "./style.scss"

interface LimitCardProps {
  fetchLimits: () => void
}

const LimitCard = ({ fetchLimits }: LimitCardProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { limit } = useAppSelector(state => state.limits)

  const editHandler = (limitId: string) => {
    navigate(`/edit-limit/${limitId}`)
  }

  const deleteLimitHandler = async (limitId: string) => {
    const result = await dispatch(deleteLimitById(limitId))
    if (result) {
      fetchLimits()
    }
  }

  return (
    <>
      {limit && (
        <div className="limits-card">
          <div className="limits-card__head">
            <div className="limits-card__head-title">
              <h3>
                {limit.animal.name} № {limit.number}
              </h3>
            </div>
            <div className="btns">
              <EditButton onClick={() => editHandler(limit.id)} />
              <DeleteButton onClick={() => deleteLimitHandler(limit.id)} />
            </div>
          </div>
          <div className="limits-card__info">
            <div className="limits-card__info-item">
              <span>Разрешено:</span>
              <p>{limit.availableHeads}</p>
            </div>
            <div className="limits-card__info-item">
              <span>Продано:</span>
              <p>{limit.soldHeads}</p>
            </div>
            <div className="limits-card__info-item">
              <span>Удержано:</span>
              <p>{limit.reservedHeads}</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LimitCard
