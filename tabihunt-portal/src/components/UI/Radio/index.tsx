import "./style.scss"

interface RadioProps {
  label: React.ReactNode
  value?: string
  name?: string
  checked: boolean
  onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Radio = ({
  label,
  value,
  name,
  checked,
  onChangeHandler
}: RadioProps) => {
  return (
    <label className="radio">
      <span className="radio-label">{label}</span>
      <input
        className="real-radio"
        type="radio"
        name={name}
        value={value ?? label?.toString()}
        checked={checked}
        onChange={onChangeHandler}
      />
      <span className="custom-radio"></span>
    </label>
  )
}

export default Radio
