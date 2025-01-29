import Button from "../Button"
import "./style.scss"

interface EditButtonProps {
  type?: "button" | "submit" | "reset" | undefined
  disabled?: boolean
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void
}
const EditButton: React.FC<EditButtonProps> = ({ type, disabled, onClick }) => {
  return (
    <Button
      className={"edit-button"}
      type={type}
      disabled={disabled}
      onClick={onClick}
      endIcon="edit"
    >
      Править
    </Button>
  )
}
export default EditButton
