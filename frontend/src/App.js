import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Ready from "./Ready";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="ready" element={<Ready />} />
            </Routes>
        </BrowserRouter>
    );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);