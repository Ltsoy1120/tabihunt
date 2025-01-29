import { Link } from "react-router-dom"
import Icon from "../../Icon"
import "./style.scss"

interface LinkButtonProps {
  path: string
  children: React.ReactNode
  endIcon?: string
}
const LinkButton: React.FC<LinkButtonProps> = ({ path, children, endIcon }) => {
  return (
    <Link className="link-button" to={path}>
      {children}
      {endIcon && <Icon name={endIcon} size={16} />}
    </Link>
  )
}
export default LinkButton
