import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import { AuthProvider } from "./assets/context/AuthContext";
import { ProdutosProvider } from "./assets/context/ProdutosContext";


createRoot(document.getElementById("root")).render(

    <StrictMode>

        <BrowserRouter>

            <AuthProvider>

                <ProdutosProvider>

                    <App />

                </ProdutosProvider>

            </AuthProvider>

        </BrowserRouter>

    </StrictMode>

);