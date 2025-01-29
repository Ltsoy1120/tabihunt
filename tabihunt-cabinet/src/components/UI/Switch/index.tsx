import "./style.scss"

interface SwitchProps {
  label: string
  checked: boolean
  onChange: () => void
}

const Switch: React.FC<SwitchProps> = ({ label, checked, onChange }) => {
  return (
    <div className="switch">
      <span className="switch__text">{label}</span>
      <label className="switch__label">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="switch__input"
        />
        <span className="switch__slider"></span>
      </label>
    </div>
  )
}

export default Switch
