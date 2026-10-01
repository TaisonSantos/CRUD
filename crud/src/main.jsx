import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import {BrowserRouter} from "react-router-dom"

import { ProdutosProvider } from "./assets/context/ProdutosContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>    
            <ProdutosProvider>
                <App />
            </ProdutosProvider>
        </BrowserRouter>
    </StrictMode>
);