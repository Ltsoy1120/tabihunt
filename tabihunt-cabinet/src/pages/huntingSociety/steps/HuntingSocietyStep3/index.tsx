import Input from "../../../../components/UI/Input"
import useHuntingSocietyDescriptionState from "../../../../hooks/useHuntingSociety"
import "./style.scss"

const HuntingSocietyStep3 = () => {
    const [state,setState] = useHuntingSocietyDescriptionState()

    const formatPhoneNumber = (phone:string) => {
        return phone.replace(/[()\s_]/g, '');
      };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value, name} = e.target
        if(name === "phoneNumber") {
            const number = formatPhoneNumber(value)
            setState(prev => ({...prev, [name]: number}))
        }else {
            setState(prev => ({...prev, [name]: value}))
        }
    }

    return (
        <div className="new-hunting-society-step3">
            <h2>Контактные данные</h2>
            <div className="new-hunting-society-step3__form">
                <div className="new-hunting-society-formItem">
                    <h3>Адрес</h3>
                        <Input
                            placeholder="ул. Примерная, д.123"
                            name="address"
                            type="text"
                            value={state.address} 
                            onChange={(e) => onChangeHandler(e)} 
                        />
                </div>
                <div className="new-hunting-society-formItem">
                    <h3>Номер телефона</h3>
                        <Input
                            placeholder="+7(xxx)xxx-xx-xx"
                            name="phoneNumber"
                            type="tel"
                            value={state.phoneNumber} 
                            onChange={(e) => onChangeHandler(e)}
                        />
                </div>
                <div className="new-hunting-society-formItem">
                    <h3>Почта</h3>
                        <Input
                            placeholder="example@gmail.com"
                            name="email"
                            type="email"
                            value={state.email} // state.name ?? ""
                            onChange={(e) => onChangeHandler(e)} // handleChangeName
                        />
                </div>
            </div>
        </div>
    )
}
export default HuntingSocietyStep3