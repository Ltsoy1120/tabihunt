import React, { useState } from "react";
import Button from "../../UI/buttons/Button";
import Modal from "../../UI/Modal";
import "./style.scss";
import { RadioPrice } from "../../../pages/purchasedVouchers/components/radioBtnPrice";

interface CartModalProps {
  close: () => void;
  title: string;
  actualHeads: number;
  standardPrice: number;
  membershipPrice: number;
  preferentialPrice: number;
  specialPrice: number;
  huntingStartDate: string
  huntingEndDate: string
  onSave: (quantity: number, huntingStartDate: string, huntingEndDate: string, priceType:string) => void;
}

interface PriceOption {
    label: string, 
    value: number,
    priceType:string
}

export const CartAnimalModal: React.FC<CartModalProps> = ({
  close,
  title,
  actualHeads,
  standardPrice,
  membershipPrice,
  preferentialPrice,
  specialPrice,
  huntingStartDate,
  huntingEndDate,
  onSave,
}) => {
  const [quantity, setQuantity] = useState(1);
  const voucherTypes = [
    { label: "Стандартная", value: standardPrice, priceType: "STANDARD"},
    { label: "Член Охот. Общ", value: membershipPrice, priceType: "MEMBERSHIP" },
    { label: "Льготная", value: preferentialPrice, priceType: "PREFERENTIAL"},
    { label: "Специальная", value: specialPrice, priceType:"SPECIAL" }
  ]
  const [selectedPrice, setSelectedPrice] = useState<PriceOption>({label: "Стандартная" , 
    value: standardPrice,
    priceType:"STANDARD"}) 

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < actualHeads) setQuantity(quantity + 1);
  };

  const handleSave = () => {
    onSave(quantity, huntingStartDate,
      huntingEndDate,selectedPrice?.priceType??"");
    close();
  };

  return (
    <Modal size={"600px"} close={close}>
      <div className="cartModal">
        <h2>{title}</h2>
        <div className="titleTextCart">
          <h4>Лимит голов на путевку</h4>
          <h2>{actualHeads} голов</h2>
        </div>
        <div className="selectPriceModalText">
          <span className="selectPriceModalText-title">Выбор цены</span>
          <div className="priceBlockCart">
            {
              voucherTypes.map((item,index) => {
                return (
                  <RadioPrice
                    key={index}
                    label={item.label}
                    price={item.value}
                    checked={item.label===selectedPrice?.label}
                    onChangeHandler={() => setSelectedPrice(item)}
                  />
                )
              })
            }

          </div>
        </div>


        <div className="line"></div>
        <div className="CounterBtnModal">
          <button onClick={handleDecrease}>–</button>
          <p>{quantity}</p>
          <button onClick={handleIncrease}>+</button>
        </div>
        <Button onClick={handleSave}>Добавить в корзину</Button>
      </div>
    </Modal>
  );
};
