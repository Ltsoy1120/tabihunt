import "./style.scss"

interface ZoomControlProps {
  zoomIn: () => void
  zoomOut: () => void
}

const ZoomControl: React.FC<ZoomControlProps> = ({ zoomIn, zoomOut }) => {
  return (
    <div className="zoom-control">
      <button onClick={zoomIn}>+</button>
      <button onClick={zoomOut}>-</button>
    </div>
  )
}

export default ZoomControl
