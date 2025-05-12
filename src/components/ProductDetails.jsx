import {useParams, NavLink, Outlet} from "react-router-dom"
import useFetch from "../hooks/useFetch.js"
import {useEffect, useState} from "react"

export default function ProductDetails() {
    const params = useParams()
    const [details, setDetails] = useState({})
    const {get} = useFetch("http://localhost:5255/api/Products/")

    useEffect(() => {
        get(`${params.id}`).then(result => setDetails(result))
    }, [])

    return (
        <div className="product-details-layout">
            <div>
                <h2>{details.name}</h2>
                <img width="125" height="125" className="product-details-image" alt="product name here" src={details.image}
                />
            </div>
            <div>
                <div className="tabs">
                    <ul>
                        <li>
                            <NavLink to="" className={({isActive}) => isActive ? "tab-active" : ""} end>Details</NavLink>
                        </li>
                        <li>
                            <NavLink to="storage" className={({isActive}) => isActive ? "tab-active" : ""} >Storage</NavLink>
                        </li>
                    </ul>
                </div>
                <Outlet context={details}/>
            </div>
        </div>
    )
}