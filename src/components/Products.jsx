import Product from "./Product.jsx"
import useFetch from "../hooks/useFetch.js"
import {useEffect, useState} from "react"
import Loader from "./Loader.jsx"

export default function Products() {
    const {get, loading} = useFetch("https://react-tutorial-demo.firebaseio.com/")
    const [products, setProducts] = useState([])

    useEffect(() => {
        get("supermarket.json").then(result => setProducts(result))
    }, [])

    return (
        <div className="products-layout">
            <h1>Products</h1>
            <p>Take a look at our products</p>
            <div className="products-grid">
                {loading && <Loader />}
                {products && products.map((product) => {
                    return <div key={product.id} className="products-grid"><Product image={product.image} name={product.name} description={product.description} price={product.price}/></div>
                })}
            </div>
        </div>
    )
}
