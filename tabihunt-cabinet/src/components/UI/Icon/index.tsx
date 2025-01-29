import { SVGAttributes } from "react"
import "./style.scss"

export type IconName =
  | ("close-eye" | "open-eye" | "check" | "plus" | "arrow-right")
  | (string & {})

interface IconProps extends Exclude<SVGAttributes<SVGElement>, "aria-hidden"> {
  size?: string | number
  name?: IconName
  className?: string
  href?: string
  alt?: string
  stroke?: string
  onClick?: () => void
}

function Icon(props: IconProps) {
  if (props.href) {
    return (
      <img
        src={props.href}
        aria-hidden="true"
        className={`icon ${props.className ?? ""}`}
        alt={props.alt}
      />
    )
  }

  return (
    <svg
      {...props}
      aria-hidden="true"
      width={props.size}
      height={props.size}
      className={`icon ${props.className ?? ""}`}
      stroke={props.stroke}
      onClick={props.onClick}
    >
      <use href={`/static/icons.svg#${props.name}`} />
    </svg>
  )
}

export default Icon
