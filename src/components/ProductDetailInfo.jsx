import {useOutletContext} from "react-router-dom";
import Button from "./Button.jsx";
import {AppContext} from "../contexts/AppContext.jsx"
import React, {useContext} from "react";

export default function ProductDetailInfo() {
    const {onProductAdd} = useContext(AppContext);
    const product = useOutletContext();

    return (
        <>
            <p>
                {product.description} sold at <strong>${product.price}</strong> per
                piece.
            </p>
            <Button onClick={() => onProductAdd(product)}>${product.price}</Button>
        </>
    );
}