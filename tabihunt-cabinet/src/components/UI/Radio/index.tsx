import "./style.scss"

interface RadioProps {
  label: string
  name?: string
  checked: boolean
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Radio = ({ label, name, checked, onChangeHandler }: RadioProps) => {
  return (
    <label className="radio">
      <input
        className="real-radio"
        type="radio"
        name={name}
        value={label}
        checked={checked}
        onChange={onChangeHandler}
      />
      <span className="custom-radio"></span>
      <span className="radio-label">{label}</span>
    </label>
  )
}

export default Radio
