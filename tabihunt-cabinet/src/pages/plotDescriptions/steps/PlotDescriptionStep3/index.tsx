import Input from "../../../../components/UI/Input"
import usePlotDescriptionState from "../../../../hooks/usePlotDescriptionState"
import "./style.scss"

const PlotDescriptionStep3 = () => {
  const [state, setState] = usePlotDescriptionState()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState(prevState => {
      if (name === "phoneNumber") {
        return {
          ...prevState,
          phoneNumber: `+${value.replace(/\D/g, "")}`
        }
      } else {
        return {
          ...prevState,
          [name]: value
        }
      }
    })
  }

  return (
    <div className="new-plot-description-step3">
      <h2>Контактные данные</h2>
      <div className="new-plot-description-step3__form">
        <h3>Адрес</h3>
        <Input
          placeholder="Обязательно"
          name="address"
          value={state.address}
          onChange={handleChange}
        />
        <h3>Номер телефона</h3>
        <Input
          placeholder="Обязательно"
          name="phoneNumber"
          type="tel"
          value={state.phoneNumber ?? ""}
          onChange={handleChange}
        />
        <h3>Почта</h3>
        <Input
          placeholder="Обязательно"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default PlotDescriptionStep3
