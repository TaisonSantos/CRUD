import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../service/supabase";


function Header() {

    const [usuario, setUsuario] = useState(null);

    const navigate = useNavigate();


    // ==========================================
    // BUSCAR USUÁRIO LOGADO
    // ==========================================

    useEffect(() => {

        async function buscarUsuario() {

            const {
                data: { user }
            } = await supabase.auth.getUser();

            setUsuario(user);
        }

        buscarUsuario();


        // Observa login / logout
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {

                setUsuario(session?.user ?? null);

            }
        );


        return () => {
            subscription.unsubscribe();
        };

    }, []);


    // ==========================================
    // DESLOGAR
    // ==========================================

    async function sair() {

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Erro ao sair:", error);
            return;
        }

        navigate("/login");
    }


    // ==========================================
    // NOME DO USUÁRIO
    // ==========================================

    const nome =
        usuario?.user_metadata?.nome ||
        usuario?.user_metadata?.name ||
        usuario?.email?.split("@")[0] ||
        "Usuário";


    return (

        <header className="flex h-16 w-full items-center justify-between bg-gray-900 px-6 shadow-md">

            {/* ==================================
                LOGO
            ================================== */}

            <Link
                to="/dashboard"
                className="flex items-center gap-3"
            >

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500 text-xl font-bold text-white shadow-lg">
                    P
                </div>

                <div>

                    <h1 className="text-lg font-bold text-white">
                        ProductSystem
                    </h1>

                    <p className="text-xs text-gray-400">
                        Gerenciamento
                    </p>

                </div>

            </Link>


            {/* ==================================
                USUÁRIO
            ================================== */}

            <div className="flex items-center gap-3">

                {/* INFORMAÇÕES DO USUÁRIO */}

                <div className="hidden text-right sm:block">

                    <p className="text-sm font-semibold text-white">
                        {nome}
                    </p>

                    <p className="text-xs text-gray-400">
                        {usuario?.email}
                    </p>

                </div>


                {/* ÍCONE */}

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">

                    <span className="material-symbols-outlined text-2xl text-gray-200">
                        person
                    </span>

                </div>


                {/* BOTÃO SAIR */}

                <button
                    type="button"
                    onClick={sair}
                    title="Sair"
                    className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                >

                    <span className="material-symbols-outlined">
                        logout
                    </span>

                </button>

            </div>

        </header>
    );
}

export default Header;