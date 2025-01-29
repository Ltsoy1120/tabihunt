import Icon from "../../Icon"
import "./style.scss"

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined
  disabled?: boolean
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  startIcon?: string
  endIcon?: string
}
const FilterButton: React.FC<ButtonProps> = ({
  type,
  disabled,
  onClick,
  children
}) => {
  return (
    <button
      className={"filter-button"}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      <span className="circle">
        <Icon name="arrow-down" size={16} />
      </span>
    </button>
  )
}
export default FilterButton
