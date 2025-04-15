export default function Cart({cart}) {
    const emptyCart = <p>You have not added any product to your cart yet.</p>
    const cartWithProducts = <table className="table table-cart">
        <thead>
        <tr>
            <th width="25%" className="th-product">Product</th>
            <th width="20%">Unit price</th>
            <th width="10%">Quanity</th>
            <th width="25%">Total</th>
        </tr>
        </thead>
        <tbody>
        {cart.map(product => {
            return (
                <tr key={product.id}>
                    <td>
                        <img width="30" height="30" alt={product.name} src={product.image} />
                        {product.name}
                    </td>
                    <td>${cart.find(product1 => product1.id === product.id).price}</td>
                    <td>{cart.find(product1 => product1.id === product.id).quantity}</td>
                    <td><strong>${cart.find(product1 => product1.id === product.id).price * cart.find(product1 => product1.id === product.id).quantity}</strong></td>
                </tr>
            )
        })}
        </tbody>
        <tfoot>
        <tr>
            <th colSpan="2"></th>
            <th className="cart-highlight">Total</th>
            <th className="cart-highlight">${cart.reduce((acc, currentProduct) => acc + currentProduct.price * currentProduct.quantity, 0)}</th>
        </tr>
        </tfoot>
    </table>

    return (
        <div className="cart-layout">
            <div>
                <h1>Your Cart</h1>
                {cart.length === 0 ? emptyCart : cartWithProducts}
            </div>
        </div>
    );
}
