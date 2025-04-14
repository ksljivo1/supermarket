import Button from "./Button.jsx"
import {useOutletContext} from "react-router-dom"

export default function ProductDetailInfo() {
    const {description, price} = useOutletContext()

    return (
        <>
            <p>
                {description} sold at <strong>{price}</strong> per piece.
            </p>
            <Button className="btn-outline">${price}</Button>
        </>
    )
}