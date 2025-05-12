import { useState, useEffect } from "react";
import Product from "./Product.jsx";
import useFetch from "../hooks/useFetch.js";
import Loader from "./Loader.jsx";

export default function Products() {
    const baseUrl = "http://localhost:5255/api/" ///"https://react-tutorial-demo.firebaseio.com/"
    const url = "products" ///"supermarket.json"
    const [products, setProducts] = useState([]);
    const { get, loading } = useFetch(baseUrl);

    useEffect(() => {
        get(url)
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => console.log("Could not load products", error));
    }, []);

    return (
        <div className="products-layout">
            <h1>Products</h1>
            <p>Take a look at our products</p>
            <div className="products-grid">
                {loading && <Loader />}
                {products.length !== 0 && products.map((product) => {
                    return (
                        <Product key={product.id} id={product.id} details={product} />
                    );
                })}
            </div>
        </div>
    );
}