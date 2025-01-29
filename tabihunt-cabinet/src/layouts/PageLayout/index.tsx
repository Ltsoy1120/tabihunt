import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom"
import PageHeader from "../../components/headers/PageHeader"
import Button from "../../components/UI/buttons/Button"
import LinkButton from "../../components/UI/buttons/LinkButton"
import { useAppDispatch, useAppSelector } from "../../store"
import { editMeCompanyLimit } from "../../store/actions/limitsActions"
import "./style.scss"

const PageLayout: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { limitId } = useParams()
  const { voucherId } = useParams()
  const { plotDescriptionId } = useParams()
  const { pathname } = useLocation()
  const { newLimitData } = useAppSelector(state => state.limits)
  const { plotDescription } = useAppSelector(state => state.plots)

  const getTitleHeader = () => {
    switch (true) {
      case pathname.includes("/edit-limit"):
        return "Лимит"
      case pathname.includes("/huntsman"):
        return ""
      case pathname.includes("/voucher"):
        return "Путевка"
      case pathname.includes("/membership"):
        return ""
      case pathname.includes("/plot-description"):
        return `${plotDescription?.plot.name ?? "Описание угодья"}`
      default:
        break
    }
  }

  const getFormButton = () => {
    switch (true) {
      case pathname.includes("/edit-limit"):
        return <Button onClick={onLimitSubmit}>Сохранить</Button>
      case pathname.includes("/huntsman"):
        return <LinkButton path="/huntsman-step1">Редактировать</LinkButton>
      case pathname.includes("/voucher"):
        return (
          <LinkButton path={`/edit-voucher-step1/${voucherId}`}>
            Редактировать
          </LinkButton>
        )
      case pathname.includes("/membership"):
        return <LinkButton path="/membership-step1">Редактировать</LinkButton>
      case pathname.includes("/plot-description"):
        return (
          <LinkButton
            path={`/edit-plot-description-step1/${plotDescriptionId}`}
          >
            Редактировать
          </LinkButton>
        )
      default:
        break
    }
  }

  const onLimitSubmit = async () => {
    if (newLimitData && limitId) {
      const result = await dispatch(
        editMeCompanyLimit(
          {
            ...newLimitData,
          },
          limitId
        )
      )
      result && navigate("/limits")
    }
  }

  return (
    <div className="form-layout">
      <PageHeader titlePage={getTitleHeader()} getFormButton={getFormButton} />
      <div className="wrapper">
        <Outlet />
      </div>
    </div>
  )
}

export default PageLayout
