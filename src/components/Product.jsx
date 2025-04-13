import Button from "./Button.jsx"

export default function Product(props) {
    const {name, description, price, image} = props

    return (
        <div className="product">
            <div className="product-image-container">
                <img width="100" height="100" className="product-image" alt={name} src={image}
                />
                <div className="product-quantity-container">
                    <div className="product-quantity">0</div>
                </div>
            </div>
            <div className="product-info">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
            <div className="product-checkout">
                <div>
                    <Button className="product-delete btn-outline">x</Button>
                </div>
                <Button className="btn-outline">${price}</Button>
            </div>
        </div>
    )
}