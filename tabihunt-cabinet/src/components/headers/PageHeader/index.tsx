import Back from "../../Back"
import "./style.scss"

interface FormHeaderProps {
  titlePage?: string
  getFormButton: () => JSX.Element | undefined
}

const PageHeader = ({ titlePage, getFormButton }: FormHeaderProps) => {
  return (
    <header className="form-header">
      <Back />
      {titlePage && <h1>{titlePage}</h1>}
      {getFormButton()}
    </header>
  )
}

export default PageHeader
