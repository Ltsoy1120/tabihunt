import { useNavigate } from "react-router-dom"
import { ChecklistDto } from "../../../models/companies"
import Icon from "../../UI/Icon"
import "./style.scss"

interface SectionCardProps {
  section: { title: string; text: string }
  checkList: ChecklistDto
}

const SectionCard = ({ section, checkList }: SectionCardProps) => {
  const navigate = useNavigate()
  const getPath = () => {
    switch (section.title) {
      case "Лимиты":
        return "/limits"
      case "Путевки":
        return "/vouchers"
      case "Егеря":
        return "/huntsmen"
      default:
        return ""
    }
  }

  const renderIcon = () => {
    if (section.title === "Егеря" && checkList.huntsmen) {
      return <Icon name="check" size={32} />
    } else if (section.title === "Лимиты" && checkList.limits) {
      return <Icon name="check" size={32} />
    } else if (section.title === "Путевки" && checkList.vouchers) {
      return <Icon name="check" size={32} />
    } else {
      return <span className="empty-check"></span>
    }
  }

  return (
    <div className="section-card">
      {renderIcon()}
      <div className="section-card__content">
        <h2>{section.title}</h2>
        <p>{section.text}</p>
      </div>
      <Icon name="arrow-right" size={16} onClick={() => navigate(getPath())} />
    </div>
  )
}

export default SectionCard
