import { classMerge } from "../../../../helpers/common"
import Icon from "../../Icon"
import "./style.scss"

interface DeleteButtonProps {
  disabled?: boolean
  className?: string
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void
}
const DeleteButton: React.FC<DeleteButtonProps> = ({
  disabled,
  className,
  onClick
}) => {
  return (
    <button
      className={classMerge("delete-button", className)}
      disabled={disabled}
      onClick={onClick}
    >
      Удалить
      <Icon name="delete" size={16} />
    </button>
  )
}
export default DeleteButton
