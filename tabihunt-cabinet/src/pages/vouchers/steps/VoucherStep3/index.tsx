import Input from "../../../../components/UI/Input"
import useVoucherState from "../../../../hooks/useVoucherState"
import "./style.scss"

const VoucherStep3 = () => {
  const [state, setState] = useVoucherState()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (
      [
        "standardPrice",
        "membershipPrice",
        "preferentialPrice",
        "specialPrice"
      ].includes(name)
    ) {
      setState(prev => ({ ...prev, [name]: Number(value) }))
    } else {
      setState(prev => ({ ...prev, [name]: value }))
    }
  }

  return (
    <div className="new-voucher-step1">
      <h2>Создание цены</h2>
      <div className="form">
        <h3>Стандартная</h3>
        <Input
          placeholder="₸"
          name="standardPrice"
          type="number"
          value={String(state.standardPrice)}
          onChange={handleChange}
          endIcon="tenge"
        />
        <h3>Член охотничьего общества</h3>
        <Input
          placeholder="₸"
          name="membershipPrice"
          type="number"
          value={String(state.membershipPrice)}
          onChange={handleChange}
          endIcon="tenge"
        />
        <h3>Льготная (Пенсионер)</h3>
        <Input
          placeholder="₸"
          name="preferentialPrice"
          type="number"
          value={String(state.preferentialPrice)}
          onChange={handleChange}
          endIcon="tenge"
        />
        <h3>Специальная</h3>
        <Input
          placeholder="₸"
          name="specialPrice"
          type="number"
          value={String(state.specialPrice)}
          onChange={handleChange}
          endIcon="tenge"
        />
      </div>
    </div>
  )
}

export default VoucherStep3
