import { useState, useEffect } from "react";
import "./style.scss"
type TProps = {
    huntingStartDate: string;
    huntingEndDate: string;
    name: string;
    price: string;
    quantity: number; 
    actualHeads: number;
    removeItem: () => void; 
    minusFunc?: () => void
    plusFunc?: () => void
    className?: string
};

export const AnimalCartCard = (props: TProps) => {
    const [quantity, setQuantity] = useState<number>(props.quantity);

    useEffect(() => {
        setQuantity(props.quantity); 
    }, [props.quantity]);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            props.removeItem(); 
        }
    };

    const handleIncrease = () => {
        if (quantity < props.actualHeads) {
            setQuantity(quantity + 1);
        }
    };

    return (
        <div className={props.className?props.className:"CartAnimalWrapper"}>
            <div className="CartAnimalTitle">
                <h2>{props.name}</h2>
                <span>{`С ${(props.huntingStartDate).replace(/-/g, '.').split('.').reverse().join('.')} По ${(props.huntingEndDate).replace(/-/g, '.').split('.').reverse().join('.')}`}</span>
            </div>
            <div className="CartAnimalDescription">
                <h2>{props.price as string}₸</h2>
                <div className="CounterBtnCart">
                    <button onClick={props.minusFunc?props.minusFunc:handleDecrease}>–</button>
                    <p>{quantity}</p>
                    <button onClick={props.plusFunc?props.plusFunc:handleIncrease}>+</button>
                </div>
            </div>
        </div>
    );
};
