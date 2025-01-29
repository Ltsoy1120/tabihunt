import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Header from "../../components/headers/Header"
import { useAppDispatch } from "../../store"
import { getMeCompaniesChecklist } from "../../store/actions/companyActions"
import { getMeCompanyPlots } from "../../store/actions/plotsActions"
import "./style.scss"

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = localStorage.getItem("accessToken")

  useEffect(() => {
    if (!isAuth) {
      navigate("/")
    }
  }, [isAuth])

  useEffect(() => {
    dispatch(getMeCompaniesChecklist())
    dispatch(getMeCompanyPlots())
  }, [])

  return (
    <div className="main-layout">
      <Header />
      <div className="wrapper">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
