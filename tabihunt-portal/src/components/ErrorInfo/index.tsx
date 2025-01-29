import "./style.scss"

interface ErrorInfoProps {
  textError: string
}

const ErrorInfo = ({ textError }: ErrorInfoProps) => {
  return <span className="error-info">{textError}</span>
}

export default ErrorInfo
