import Icon from "../../Icon"
import "./style.scss"

interface TextButtonProps {
  type?: "button" | "submit" | "reset" | undefined
  disabled?: boolean
  className?: string
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  endIcon?: string
}
const TextButton: React.FC<TextButtonProps> = ({
  type,
  disabled,
  className,
  onClick,
  children,
  endIcon
}) => {
  return (
    <button
      className={className ? `text-button ${className}` : "text-button"}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      {endIcon && <Icon name={endIcon} size={16} />}
    </button>
  )
}
export default TextButton
