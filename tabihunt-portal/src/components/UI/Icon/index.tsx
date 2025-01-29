import { SVGAttributes } from "react"
import "./style.scss"

interface IconProps extends Exclude<SVGAttributes<SVGElement>, "aria-hidden"> {
  size?: string | number
  name?: string
  className?: string
  // href?: string
  alt?: string
  onClick?: () => void
}

function Icon(props: IconProps) {
  return (
    <svg
      {...props}
      aria-hidden="true"
      width={props.size}
      height={props.size}
      className={`icon ${props.className ?? ""}`}
      onClick={props.onClick}
    >
      <use href={`/static/icons.svg#${props.name}`} />
    </svg>
  )
}

export default Icon
