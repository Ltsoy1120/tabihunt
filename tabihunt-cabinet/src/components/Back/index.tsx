import { useNavigate } from "react-router-dom"
import Icon from "../UI/Icon"
import "./style.scss"

const Back = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="back" onClick={handleBack}>
      <Icon name="arrow-back" size={16} />
      <span>Вернуться</span>
    </div>
  )
}

export default Back
