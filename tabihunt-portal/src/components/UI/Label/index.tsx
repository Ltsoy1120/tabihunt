import "./style.scss"

interface LabelProps {
  children: React.ReactNode
}
const Label = ({ children }: LabelProps) => {
  return <div className="label">{children}</div>
}

export default Label
