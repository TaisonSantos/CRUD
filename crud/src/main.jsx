import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { ProdutosProvider } from "./assets/context/ProdutosContext";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ProdutosProvider>
            <App />
        </ProdutosProvider>
    </StrictMode>
);