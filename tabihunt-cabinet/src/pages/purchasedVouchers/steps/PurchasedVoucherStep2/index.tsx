import { ChangeEvent, useEffect, useState } from "react";
import Loader from "../../../../components/UI/loaders/Loader";
import Input from "../../../../components/UI/Input";
import Select, {Option} from "../../../../components/UI/Select";
import "./style.scss"
import { useAppDispatch, useAppSelector } from "../../../../store";
import { getPurchasedData } from "../../../../store/actions/purchasedVoucherAction";
import { useParams } from "react-router-dom";
import usePurchaseVoucherState from "../../../../hooks/usePurchasedVoucherState";

const PurchasedVoucherStep2 = () => {
    const [loading] = useState(false);
    const dispatch = useAppDispatch()
    const {voucherData} = useAppSelector(state => state.purchasedVoucher)
    const [select, setSelect] = useState<Option>({title:"", value:""})
    const [selectArr, setSelectArr] = useState<Option[]>([])
    const [state, setState] = usePurchaseVoucherState()
    const {purchasedId} = useParams()



    useEffect(() => {
        dispatch(getPurchasedData(purchasedId!))
    },[])

    useEffect(() => {
        setSelectArr([
            {title:`Стандарная`, value:voucherData?.standardPrice.toString()??"", priceType:"STANDARD"},
            {title:"Член охотничьего общества", value:voucherData?.membershipPrice.toString()??"",priceType:"MEMBERSHIP" },
            {title:"Льготная", value:voucherData?.preferentialPrice.toString()??"", priceType:"PREFERENTIAL"},
            {title:"Специальная", value:voucherData?.specialPrice.toString()??"", priceType:"SPECIAL"}
        ])
    },[dispatch, voucherData])
    
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      const selectChange = (e: Option) => {
        setSelect(e)
        setState((prevState) => ({
          ...prevState,
          priceType: e.priceType??"",
        }));        
      };

    return (
        <>
            {!loading ? (
                <div className="new-purchased-voucher-step2">
                    <h2>Характеристика</h2>
                    <h3>Период</h3>
                        <div className="purchased-voucher-btnGroup">
                        <Input
                            type="date"
                            name="startDate"
                            value={state.startDate}
                            onChange={(e) => handleInputChange(e)}
                        />
                        <Input
                                placeholder="По"
                                type="date"
                                name="endDate"
                                value={state.endDate}
                                onChange={(e) => handleInputChange(e)}
                            />
                        </div>
                    <h3>Выберите тариф</h3>
                    <Select
                        options={selectArr}
                        label="Выберите из списка"
                        onChange={selectChange} selected={select}/>
                    {
                        select.value!==""?<div className="totalPrice">
                            <h3>{select.value} ₸</h3>
                            <span>Цена</span>   
                        </div>:""
                    }
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default PurchasedVoucherStep2;
