import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../../store"
import Button from "../../UI/buttons/Button"
import "./style.scss"

const navLinks = [
  { path: "/purchased-vouchers", label: "Продажа" },
  { path: "/vouchers", label: "Путевки" },
  { path: "/memberships", label: "Членство" },
  { path: "/huntsmen", label: "Егеря" },
  { path: "/limits", label: "Лимиты" },
  { path: "/reports", label: "Отчеты" },
  { path: "/plot-descriptions", label: "Описания угодий" },
  { path: "/account", label: "Аккаунт" },
  { path: "/hunting-society", label: "Описание охотобщества" }
]

const Header = () => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const hunterSociety = useAppSelector(
    state => state.huntingSociety.huntingDescription
  )
  const checkList = useAppSelector(state => state.company.checklist)
  const { memberships } = useAppSelector(state => state.memberships)

  const getCreateBtn = () => {
    switch (pathname) {
      case "/limits":
        if (!checkList?.limits) {
          return (
            <Button onClick={() => navigate("/new-limit-step1")} endIcon="plus">
              Создать
            </Button>
          )
        }
        break
      case "/huntsmen":
        if (!checkList?.huntsmen) {
          return (
            <Button
              onClick={() => navigate("/new-huntsman-step1")}
              endIcon="plus"
            >
              Создать
            </Button>
          )
        }
        break

      case "/vouchers":
        return (
          <Button onClick={() => navigate("/new-voucher-step1")} endIcon="plus">
            {!checkList?.vouchers ? "Создать" : "Добавить"}
          </Button>
        )
      case "/memberships":
        if (memberships.length === 0) {
          return (
            <Button
              onClick={() => navigate("/new-membership-step1")}
              endIcon="plus"
            >
              Создать
            </Button>
          )
        }
        break
      case "/plot-descriptions":
        return (
          <Button
            onClick={() => navigate("/new-plot-description-step1")}
            endIcon="plus"
          >
            Добавить
          </Button>
        )
      case "/hunting-society":
        return (
          <Button
            onClick={() =>
              navigate(
                hunterSociety
                  ? "/edit-hunting-society-step1/"
                  : "/new-hunting-society-step1"
              )
            }
            endIcon={hunterSociety ? "" : "plus"}
          >
            {hunterSociety
              ? "Редактировать"
              : !checkList?.vouchers
              ? "Создать"
              : "Добавить"}
          </Button>
        )
      default:
        break
    }
  }

  const logoutHandler = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    navigate("/")
  }

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/main")}>
        <img src="/static/images/logo.png" alt="logo" />
      </div>
      <nav className="nav">
        {navLinks.map(link => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      {getCreateBtn()}
      <Button className="logout-btn" onClick={logoutHandler}>
        Выйти
      </Button>
    </header>
  )
}

export default Header
