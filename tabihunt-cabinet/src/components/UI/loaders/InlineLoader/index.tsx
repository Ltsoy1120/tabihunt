import './style.scss'

type Props = {
    // width: number
    height: number
}
const InlineLoader = (props: Props) => {
    return (
        <div style={{ height: `${props.height}px` }} className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    )
}
export default InlineLoader