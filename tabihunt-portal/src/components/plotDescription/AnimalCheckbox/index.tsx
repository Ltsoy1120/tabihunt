import "./style.scss"

interface AnimalCheckboxProps {
  label: React.ReactNode
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AnimalCheckbox = ({ label, checked, onChange }: AnimalCheckboxProps) => {
  return (
    <label className="animal-checkbox">
      <span className="animal-checkbox-label">{label}</span>
      <input
        className="real-animal-checkbox"
        type="checkbox"
        // name={name}
        checked={checked}
        onChange={onChange}
      />
      <span className="custom-animal-checkbox"></span>
    </label>
  )
}

export default AnimalCheckbox
