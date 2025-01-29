import Icon from "../../Icon"
import "./style.scss"

interface OutlineButtonProps {
  type?: "button" | "submit" | "reset" | undefined
  disabled?: boolean
  className?: string
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  endIcon?: string
}
const OutlineButton: React.FC<OutlineButtonProps> = ({
  type,
  disabled,
  className,
  onClick,
  children,
  endIcon
}) => {
  return (
    <button
      className={className ? `outline-button ${className}` : "outline-button"}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
      {endIcon && (
        <span className="end-icon">
          <Icon name={endIcon} size={20} />
        </span>
      )}
    </button>
  )
}
export default OutlineButton
