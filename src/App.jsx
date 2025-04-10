import {createRoot} from "react-dom/client";
import Input from "./components/Input.jsx";

export default function App() {
    function handleLastNameInput() {
        console.log("Last name changed");
    }

    return (<div style={{display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap"}}>
        <Input placeholder="First name" />
        <Input placeholder="Last name" onInput={handleLastNameInput} />
        <Input placeholder="Email" type="email" required />
    </div>);
}

createRoot(document.querySelector("#root")).render(<App />);