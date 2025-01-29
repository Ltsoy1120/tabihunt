import Button from "../../../../components/UI/buttons/Button"
import "./animalCard.scss"
type TProps = {
    name:string
    actualHeads: number
    addToCart: () => void; 
    disabled?: boolean;
}

export const AnimalCard = (props:TProps) => {
    return (
        <div className="cartAnimalCard">
            <div className="titleCartAnimalCard">
                <h1>{props.name}</h1>
                <span>кол-во голов на путевку: {props.actualHeads}</span>
            </div>
            {
                props.disabled?"Добавлено":<Button onClick={props.addToCart} endIcon="plus">
                Добавить
            </Button>
            }
        </div>
    )
}
