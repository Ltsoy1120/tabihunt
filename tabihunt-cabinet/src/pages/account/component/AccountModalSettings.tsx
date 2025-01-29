import Modal from "../../../components/UI/Modal"
import '../AccountPage/style.scss'


type DataType = {
    text: string
    subText: string
    canClick: boolean
    onClick: Function
}
type Props = {
    show: boolean
    onClose: Function
    title: string
    dataList: DataType[]
}
const AccountModalSettings = (props: Props) => {
    return (
        <>
            {!props.show
                ? <></>
                : <Modal close={() => props.onClose()}>
                    <p className="account__settings-modal-title">
                        {props.title}
                    </p>
                    <div className="account__settings-modal">
                        {props.dataList.map(el => {
                            return (
                                <div key={el.text + el.subText}
                                    className="account__settings-modal-btn"
                                    onClick={el.canClick
                                        ? () => el.onClick()
                                        : () => { }
                                    }
                                >
                                    <p className="account__settings-modal-btn-text">{el.text}</p>
                                    {!el.canClick
                                        ? <></>
                                        : <div>
                                            <p className="account__settings-modal-btn-text account__settings-modal-btn-text--grey">
                                                {el.subText}</p>
                                            <img className="account__settings-modal-btn-img"
                                                src="static/images/arrow-right.png" alt="right-arrow" />
                                        </div>
                                    }
                                </div>
                            )
                        })}
                    </div>
                </Modal>
            }
        </>
    )
}
export default AccountModalSettings