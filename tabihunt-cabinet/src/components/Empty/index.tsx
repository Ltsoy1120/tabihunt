import { useState } from "react"
import { useLocation } from "react-router-dom"
import { useAppSelector } from "../../store"
import CheckList from "../CheckList"
import "./style.scss"

const Empty = () => {
  const { pathname } = useLocation()
  const checkList = useAppSelector(state => state.company.checklist)
  const [isHelp, setHelp] = useState(false)

  const getEmptyMessage = () => {
    switch (pathname) {
      case "/limits":
        return "Сейчас у вас нет лимитов"
      case "/vouchers":
        return "Сейчас у вас нет путевок"
      case "/huntsmen":
        return "Сейчас у вас нет егерей"
      case "/memberships":
        return "В вашем сообществе нет охотников"
      case "/plot-descriptions":
        return "У Вас пока нет описаний угодий. Добавьте их, чтобы охотники выбрали именно Вас"
      default:
        return ""
    }
  }

  return (
    <div className="empty">
      {isHelp && checkList && <CheckList checkList={checkList} />}
      <div className="empty__content">
        <h2>{getEmptyMessage()}</h2>
      </div>
      {["/limits", "/vouchers", "/huntsmen"].includes(pathname) && (
        <div className="help" onClick={() => setHelp(!isHelp)}>
          <img
            src={`static/images/${isHelp ? "help-close.png" : "help.png"}`}
            alt="help-icon"
          />
        </div>
      )}
    </div>
  )
}

export default Empty
