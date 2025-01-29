import Icon from "../../Icon"
import "./style.scss"

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined
  disabled?: boolean
  className?: string
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  startIcon?: string
  endIcon?: string
}
const Button: React.FC<ButtonProps> = ({
  type,
  disabled,
  className,
  onClick,
  children,
  startIcon,
  endIcon
}) => {
  return (
    <button
      className={className ? `button ${className}` : "button"}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {startIcon && <Icon name={startIcon} className="start-icon" size={16} />}
      {children}
      {endIcon && <Icon name={endIcon} className="end-icon" size={16} />}
    </button>
  )
}
export default Button
