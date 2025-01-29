import { usePathname } from "next/navigation"
import Back from "../../Back"
import "./style.scss"

interface FormHeaderProps {
  stages?: { path: string; title: string }[]
  titlePage?: string
  titlePageMobile?: string
  getFormButton?: () => JSX.Element | undefined
}

const FormHeader = ({
  stages,
  titlePage,
  titlePageMobile,
  getFormButton
}: FormHeaderProps) => {
  const pathname = usePathname()

  return (
    <header className="form-header">
      <Back />
      {stages && (
        <div className="stages">
          {stages.map((stage, index) => (
            <div key={index} className="stages__item">
              <h2
                className={`stages__item-text ${
                  pathname.includes(stage.path) ? "active" : ""
                }`}
              >
                {stage.title}
              </h2>

              <span className={"stages__item-dot"}></span>
            </div>
          ))}
        </div>
      )}
      {titlePage && <h1 className="title-page">{titlePage}</h1>}
      {titlePageMobile && (
        <h1 className="title-page-mobile">{titlePageMobile}</h1>
      )}
      <div className="form-btn">{getFormButton && getFormButton()}</div>
    </header>
  )
}

export default FormHeader
