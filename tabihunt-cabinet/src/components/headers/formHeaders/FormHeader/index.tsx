import Back from "../../../Back"
import "./style.scss"

interface FormHeaderProps {
  steps?: { path: string; title: string }[]
  titlePage?: string
  pathname: string
  getFormButton: () => JSX.Element | undefined
}

const FormHeader = ({
  steps,
  titlePage,
  pathname,
  getFormButton
}: FormHeaderProps) => {
  return (
    <header className="form-header">
      <Back />
      {steps && (
        <div className="steps">
          {steps.map((step, index) => (
            
            
            <div key={index} className="steps__item">
              <h2
                className={`steps__item-text ${
                  pathname.includes(step.path) ? "active" : ""
                }`}
              >
                {step.title}
              </h2>
              <span className={"steps__item-dot"}></span>
            </div>
          ))}
        </div>
      )}
      {titlePage && <h1>{titlePage}</h1>}
      {getFormButton()}
    </header>
  )
}

export default FormHeader
