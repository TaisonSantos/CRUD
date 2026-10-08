import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";


function ProtectedRoute() {

    const {
        usuario,
        carregando
    } = useContext(AuthContext);


    // Ainda estamos verificando a sessão
    if (carregando) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-950">

                <p className="text-gray-400">
                    Verificando autenticação...
                </p>

            </div>
        );

    }


    // Não está logado
    if (!usuario) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // Está logado
    return <Outlet />;

}


export default ProtectedRoute;