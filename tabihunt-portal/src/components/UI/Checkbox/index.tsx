import "./style.scss"

interface CheckboxProps {
  label: React.ReactNode
  name: string
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Checkbox = ({ label, name, checked, onChange }: CheckboxProps) => {
  return (
    <label className="checkbox">
      <input
        className="real-checkbox"
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <span className="custom-checkbox"></span>
      <span className="checkbox-label">{label}</span>
    </label>
  )
}

export default Checkbox
