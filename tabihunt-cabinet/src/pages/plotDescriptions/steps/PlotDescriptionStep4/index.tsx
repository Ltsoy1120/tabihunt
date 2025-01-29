import Textarea from "../../../../components/UI/Textarea"
import usePlotDescriptionState from "../../../../hooks/usePlotDescriptionState"
import "./style.scss"

const PlotDescriptionStep4 = () => {
  const [state, setState] = usePlotDescriptionState()

  const handleServiceChange = (index: number, value: string) => {
    setState(prevState => {
      const updatedService = [...prevState.servicesTranslations]
      updatedService[index] = {
        ...updatedService[index],
        services: value
      }
      return {
        ...prevState,
        servicesTranslations: updatedService
      }
    })
  }

  return (
    <div className="new-plot-description-step3">
      <h2>Услуги и инфраструктура</h2>
      <div className="new-plot-description-step3__form">
        <h3>Услуги</h3>
        <span>Перечислите услуги, которые Вы предоставляете</span>
        <Textarea
          value={state.servicesTranslations[0].services}
          placeholder="На русском"
          onChange={e => handleServiceChange(0, e.target.value)}
        />
        <Textarea
          value={state.servicesTranslations[1].services}
          placeholder="На казахском"
          onChange={e => handleServiceChange(1, e.target.value)}
        />
      </div>
    </div>
  )
}

export default PlotDescriptionStep4
