import {createRoot} from "react-dom/client";
import Button from "./Components/Button.jsx";

export default function App() {
    function handleButtonClick() {
        console.log("Button clicked");
    }

    return (<div style={{display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap"}}>
        <Button>Normal</Button>
        <Button outline>Outline</Button>
        <Button className="extra-class" onClick={handleButtonClick}>Customizable</Button>
    </div>);
}

createRoot(document.querySelector("#root")).render(<App />);