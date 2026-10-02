import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./assets/layout/Loyalt";
import Dashboard from "./assets/layout/Dashboard";

import ListaProdutos from "./assets/componentes/produtos/ListaProdutosCard";
import FormCadastroProd from "./assets/componentes/produtos/FormCadastroProd";

function App() {
    return (
        <Routes>

            <Route path="/" element={<Layout />}>

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/produtos"
                    element={<ListaProdutos />}
                />

                <Route
                    path="/cadastro"
                    element={<FormCadastroProd />}
                />

            </Route>

        </Routes>
    );
}

export default App;