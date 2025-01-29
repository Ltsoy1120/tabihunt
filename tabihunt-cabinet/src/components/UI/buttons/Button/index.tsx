import Icon from "../../Icon"
import "./style.scss"

interface ButtonProps {
  type?: "button" | "submit" | "reset" | undefined
  disabled?: boolean
  className?: string
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  endIcon?: string
}
const Button: React.FC<ButtonProps> = ({
  type,
  disabled,
  className,
  onClick,
  children,
  endIcon
}) => {
  return (
    <button
      className={className ? `button ${className}` : "button"}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      {endIcon && <Icon name={endIcon} size={16} />}
    </button>
  )
}
export default Button
