import React, { useEffect, useState } from "react";
import Tabs from "../../../../components/UI/Tabs";
import { limitsTabs } from "../../../../components/UI/Tabs/tabs";
import "./style.scss";
import { AnimalCard } from "../../components/animalCard/animalCard";
import { CartAnimalModal } from "../../../../components/modals/CartAnimalModal";
import { useAppDispatch, useAppSelector } from "../../../../store";
import { AnimalCartCard } from "../../components/animalCartCard";
import { Animal } from "../../../../models/purchasedVoucher";
import { VoucherAnimalData } from "../../../../models/vouchers";
import usePurchaseVoucherState from "../../../../hooks/usePurchasedVoucherState";
import { setCartAnimal } from "../../../../store/slices/PurchaseVoucherSlice";

export interface CartItem {
    animal: Animal;
    quantity: number;
    huntingStartDate: string;
    huntingEndDate: string;
    priceType:string
}

export type PriceType = "standardPrice" | "membershipPrice" | "preferentialPrice" | "specialPrice";

const PurchasedVoucherStep3: React.FC = () => {
    const [activeAnimalType, setActiveAnimalType] = useState<string>("FEATHERED");
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [_, setState] = usePurchaseVoucherState()
    const [addedAnimals, setAddedAnimals] = useState<Set<string>>(new Set());
    const dispatch = useAppDispatch()
    const { voucherData, cartAnimalData} = useAppSelector((state) => state.purchasedVoucher);

    useEffect(() => {
        setCart(cartAnimalData)
    }, []);
    const addToCart = (animal: Animal, quantity: number, huntingStartDate: string, huntingEndDate: string, priceType:string) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart, { animal, quantity, huntingStartDate, huntingEndDate, priceType}];            
            dispatch(setCartAnimal(updatedCart)); 
            return updatedCart; 
        });
        setAddedAnimals((prev) => new Set(prev).add(animal.id));        
        setState((prevState) => ({
            ...prevState,
            animals: [
                ...prevState.animals,
                {
                    voucherAnimalId: animal.id,
                    priceType,
                    heads: quantity
                }
            ]
        }));
    };
    

    const openModal = (animal: VoucherAnimalData) => {
        setSelectedAnimal(animal as Animal);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleAddToCart = (quantity: number, huntingStartDate: string, huntingEndDate: string, priceType:string) => {
        if (selectedAnimal) {
            addToCart(selectedAnimal, quantity, huntingStartDate, huntingEndDate, priceType);
            closeModal();
        }
    };

    const handleRemoveItem = (index: number) => {
        const removedAnimalId = cart[index].animal.id;
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
        setAddedAnimals((prev) => {
            const newSet = new Set(prev);
            newSet.delete(removedAnimalId);
            return newSet;
        });
    };

    const handleQuantityChange = (index: number, change: number) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.map((item, i) =>
                i === index ? { ...item, quantity: item.quantity + change } : item
            );
            const filteredCart = updatedCart.filter(item => item.quantity > 0);
            const updatedAddedAnimals = new Set(addedAnimals);
            if (updatedCart[index].quantity + change <= 0) {
                updatedAddedAnimals.delete(prevCart[index].animal.id);
            }    
            setAddedAnimals(updatedAddedAnimals);
            dispatch(setCartAnimal(filteredCart)); 
    
            return filteredCart;
        });
    };
    
    return (
        <>
            {modalVisible && selectedAnimal && (
                <CartAnimalModal
                    close={closeModal}
                    title={selectedAnimal.animal.name}
                    actualHeads={selectedAnimal.limitHeads!}
                    standardPrice={selectedAnimal.standardPrice}
                    membershipPrice={selectedAnimal.membershipPrice}
                    preferentialPrice={selectedAnimal.preferentialPrice}
                    specialPrice={selectedAnimal.specialPrice}
                    onSave={handleAddToCart}
                    huntingStartDate={selectedAnimal.huntingStartDate}
                    huntingEndDate={selectedAnimal.huntingEndDate}
                />
            )}

            <div className="PurchasedWrapper">
                <div className="animalsBlockPurchased">
                    <Tabs
                        optionTabs={limitsTabs}
                        activeTab={activeAnimalType}
                        setActiveTab={setActiveAnimalType}
                    />
                    {voucherData?.animals
                        .filter(item => item.animal!.type === activeAnimalType)
                        .map((item) => (
                            <AnimalCard
                                key={item.id}
                                name={item.animal!.name}
                                actualHeads={item.limitHeads}
                                addToCart={() => openModal(item)}
                                disabled={addedAnimals.has(item.id ?? "")}
                            />
                        ))}
                </div>

                <div className="animalsBlockPurchased">
                    <h2>Корзина</h2>
                    <ul>
                        {cart.map((cartItem, index) => {
                                const priceType = cartItem?.priceType?.toLowerCase() + "Price" as PriceType;
                                const price = priceType ? cartItem.animal[priceType] : 0;
                            return (
                                <AnimalCartCard
                                    key={cartItem.animal.id}
                                    huntingStartDate={cartItem.huntingStartDate}
                                    huntingEndDate={cartItem.huntingEndDate}
                                    name={cartItem.animal.animal.name}
                                    price={price ? price.toString() : price.toString()}
                                    quantity={cartItem.quantity}
                                    actualHeads={cartItem.animal.limitHeads!}
                                    removeItem={() => handleRemoveItem(index)}
                                    minusFunc={() => handleQuantityChange(index, -1)} 
                                    plusFunc={() => handleQuantityChange(index, 1)}  
                                />
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default PurchasedVoucherStep3;
