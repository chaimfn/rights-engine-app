import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Ready from "./Ready";


export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="ready" element={<Ready />} />
                <Route path="hz" element={"hz"} />
            </Routes>
        </BrowserRouter>
    );
}
