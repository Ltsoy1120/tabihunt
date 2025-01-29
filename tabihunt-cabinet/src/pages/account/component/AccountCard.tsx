import InlineLoader from '../../../components/UI/loaders/InlineLoader'
import '../AccountPage/style.scss'

type Data = {
    name: string
    value: string | number
}
type Props = {
    isLoading: boolean
    title: string
    subTitle: string
    data: Data[]
}

const AccountCard = (props: Props) => {
    return (
        <div key={props.title + props.subTitle} className="account__info-card">
            <p className="account__info-card-title">
                {props.title}
            </p>
            <p className="account__info-card-text">
                {props.subTitle}
            </p>
            <div className="account__info-card-divider"></div>
            {props.data.map(el => {
                return (
                    < div key={el.name + el.value} >
                        <div className="account__info-card-content">
                            <p className="account__info-card-text">
                                {el.name}
                            </p>
                            {props.isLoading
                                ? <InlineLoader height={16} />
                                : <p className="account__info-card-content-text">
                                    {el.value}
                                </p>
                            }
                        </div>
                        <div className="account__info-card-divider--vertical"></div>
                    </div>
                )
            })}
        </div>
    )
}
export default AccountCard