import React, { useState, useEffect } from "react";
import {createRoot} from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Products from "./components/Products.jsx";
import ProductDetails from "./components/ProductDetails.jsx";
import ProductDetailInfo from "./components/ProductDetailInfo.jsx";
import ProductDetailNutrition from "./components/ProductDetailNutrition.jsx";
import ProductDetailStorage from "./components/ProductDetailStorage.jsx";
import Cart from "./components/Cart.jsx";

export default function App() {
    const [cart, setCart] = useState(() => {
        const storedCart = localStorage.getItem("cart")
        return storedCart ? JSON.parse(storedCart) : []
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])

    function handleProductAdd(newProduct) {
        // check if item exists
        const existingProduct = cart.find(
            (product) => product.id === newProduct.id
        );
        if (existingProduct) {
            // increase quantity
            const updatedCart = cart.map((product) => {
                if (product.id === newProduct.id) {
                    return {
                        ...product,
                        quantity: product.quantity + 1,
                    };
                }
                return product;
            });
            setCart(updatedCart);
        } else {
            // product is new to the cart
            setCart([
                ...cart,
                {
                    ...newProduct,
                    quantity: 1,
                },
            ]);
        }
    }

    function handleProductDelete(id) {
        const updatedCart = cart.filter((product) => product.id !== id);
        setCart(updatedCart);
    }

    return (
        <BrowserRouter>
            <Navbar cart={cart} />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />}>
                    </Route>
                    <Route path="/about" element={<About />}>
                    </Route>
                    <Route path="/products" element={<Products
                        cart={cart}
                        onProductAdd={handleProductAdd}
                        onProductDelete={handleProductDelete}
                    />}>
                    </Route>
                    <Route
                        path="/products/:id/"
                        element={<ProductDetails />}
                    >
                        <Route
                            path=""
                            element={<ProductDetailInfo onProductAdd={handleProductAdd} />}
                        ></Route>

                        <Route
                            path="nutrition"
                            element={<ProductDetailNutrition />}
                        ></Route>

                        <Route path="storage" element={<ProductDetailStorage />}></Route>
                    </Route>
                    <Route path="/cart" element={<Cart cart={cart} />}>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

createRoot(document.querySelector("#root")).render(<React.StrictMode><App /></React.StrictMode>);