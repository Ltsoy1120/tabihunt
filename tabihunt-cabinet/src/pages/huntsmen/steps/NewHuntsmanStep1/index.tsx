import Input from "../../../../components/UI/Input"
import Select from "../../../../components/UI/Select"
import Switch from "../../../../components/UI/Switch"
import useHuntsmanState from "../../../../hooks/useHuntsmanState"
import "./style.scss"

const positionOptions = [
  { value: "JUNIOR", title: "Младший егерь" },
  { value: "SENIOR", title: "Старший егерь" }
]

const NewHuntsmanStep1 = () => {
  const [state, setState] = useHuntsmanState()

  const handleToggle = () => {
    setState(prev => ({ ...prev, displayInVouchers: !state.displayInVouchers }))
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setState(prevState => {
      if (name === "phoneNumber") {
        return {
          ...prevState,
          user: {
            ...prevState.user,
            phoneNumber: `+${value.replace(/\D/g, "")}`
          }
        }
      } else {
        return {
          ...prevState,
          [name]: value
        }
      }
    })
  }

  const handlePositionChange = (position: { value: string; title: string }) => {
    setState(prev => ({ ...prev, position: position.value }))
  }

  return (
    <div className="new-huntsman-step1">
      <h2>Контактная информация</h2>
      <div className="form">
        <h3>Фамилия</h3>
        <Input
          placeholder="Обязательно"
          name="lastname"
          value={state.lastname}
          onChange={handleChange}
        />
        <h3>Имя</h3>
        <Input
          placeholder="Обязательно"
          name="firstname"
          value={state.firstname}
          onChange={handleChange}
        />
        <h3>Отчество</h3>
        <Input
          placeholder="Не обязательно"
          name="patronymic"
          value={state.patronymic ?? ""}
          onChange={handleChange}
        />
        <h3>Номер телефона</h3>
        <Input
          placeholder="Обязательно"
          name="phoneNumber"
          type="tel"
          value={state?.user?.phoneNumber ?? ""}
          onChange={handleChange}
        />
        <h3>Должность</h3>
        <Select
          options={positionOptions}
          label="Обязательно"
          selected={{
            value: state.position,
            title:
              state.position === "JUNIOR"
                ? "Младший егерь"
                : state.position === "SENIOR"
                ? "Старший егерь"
                : ""
          }}
          onChange={handlePositionChange}
        />
        <Switch
          label="Показать егеря в путевке"
          checked={state.displayInVouchers}
          onChange={handleToggle}
        />
      </div>
    </div>
  )
}

export default NewHuntsmanStep1
