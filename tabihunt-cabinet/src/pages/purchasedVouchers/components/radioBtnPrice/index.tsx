import "./style.scss"
interface RadioProps {
    label: string
    name?: string
    price:number
    checked: boolean
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
  

export const RadioPrice = ({ label, name, checked, onChangeHandler, price}: RadioProps) => {
    return (
      <label className="radioPrice">
        <input
          className="real-radio"
          type="radio"
          name={name}
          value={label}
          checked={checked}
          onChange={onChangeHandler}
        />
        <span className="custom-radio"></span>
        <div className="radioPriceTextGroup">
            <span className="radio-label">{label}</span>
            <h2 className="radio-label">{price} ₸</h2>
        </div>

      </label>
    )
  }