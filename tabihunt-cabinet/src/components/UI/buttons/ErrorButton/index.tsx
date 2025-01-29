import "./style.scss"

interface ErrorButtonProps {
  text: string
}

const ErrorButton = ({ text }: ErrorButtonProps) => {
  return (
    <button className="error-button" disabled={true}>
      {text}
    </button>
  )
}

export default ErrorButton
