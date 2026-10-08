import { Route, Routes } from "react-router-dom";

import "./App.css";

import Layout from "./assets/layout/Loyalt";
import Dashboard from "./assets/layout/Dashboard";

import ListaProdutos from "./assets/componentes/produtos/ListaProdutosCard";
import FormCadastroProd from "./assets/componentes/produtos/FormCadastroProd";

import Login from "./assets/componentes/produtos/Login/Login";
import Cadastro from "./assets/componentes/produtos/Login/Cadastro";

import ProtectedRoute from "./assets/componentes/ProtectedRoute";


function App() {

    return (

        <Routes>

            {/* =====================================
                ROTAS PÚBLICAS
            ===================================== */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/cadastro"
                element={<Cadastro />}
            />


            {/* =====================================
                ROTAS PROTEGIDAS
            ===================================== */}

            <Route element={<ProtectedRoute />}>

                <Route
                    path="/"
                    element={<Layout />}
                >

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/produtos"
                        element={<ListaProdutos />}
                    />

                    <Route
                        path="/cadastro-produto"
                        element={<FormCadastroProd />}
                    />

                </Route>

            </Route>

        </Routes>

    );

}


export default App;