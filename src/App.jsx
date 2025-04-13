import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Products from "./components/Products.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container">
                <Routes>
                    {/* Temporary rendering Products for homepage */}
                    <Route path="/" element={<Products />}>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

createRoot(document.querySelector("#root")).render(<React.StrictMode><App /></React.StrictMode>);