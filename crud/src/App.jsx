import {
    Route,
    Routes
} from "react-router-dom";

import {
    ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./App.css";


import Layout
    from "./assets/layout/Loyalt";

import Dashboard
    from "./assets/layout/Dashboard";

import ListaProdutos
    from "./assets/componentes/produtos/ListaProdutosCard";

import FormCadastroProd
    from "./assets/componentes/produtos/FormCadastroProd";

import Login
    from "./assets/componentes/Login/Login";

import Cadastro
    from "./assets/componentes/Login/Cadastro";

import ProtectedRoute
    from "./assets/componentes/ProtectedRoute";


function App() {

    return (

        <>

            <Routes>

                {/* ROTAS PÚBLICAS */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/cadastro"
                    element={<Cadastro />}
                />


                {/* ROTAS PROTEGIDAS */}

                <Route
                    element={<ProtectedRoute />}
                >

                    <Route
                        path="/"
                        element={<Layout />}
                    >

                        <Route
                            path="dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="produtos"
                            element={<ListaProdutos />}
                        />

                        <Route
                            path="cadastro-produto"
                            element={<FormCadastroProd />}
                        />

                    </Route>

                </Route>

            </Routes>


            {/* TOAST GLOBAL */}

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                theme="dark"
            />

        </>

    );

}


export default App;