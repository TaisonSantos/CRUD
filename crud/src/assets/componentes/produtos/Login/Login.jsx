import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { fazerLogin } from "../../../service/authService";


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [carregando, setCarregando] = useState(false);
    const [erro, setErro] = useState("");


    // ==========================================
    // LOGIN
    // ==========================================

    async function entrar(event) {

        event.preventDefault();

        setErro("");


        if (!email.trim()) {

            setErro("Digite seu e-mail.");

            return;

        }


        if (!senha) {

            setErro("Digite sua senha.");

            return;

        }


        setCarregando(true);


        const resultado = await fazerLogin(
            email.trim(),
            senha
        );


        setCarregando(false);


        if (!resultado.sucesso) {

            setErro("E-mail ou senha incorretos.");

            return;

        }


        navigate("/dashboard");

    }


    return (

        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-10">


            {/* =====================================
                CONTAINER
            ===================================== */}

            <div className="w-full max-w-[440px]">


                {/* =================================
                    LOGO / MARCA
                ================================= */}

                <div className="mb-8 text-center">


                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500 shadow-lg shadow-cyan-500/20">

                        <span className="text-2xl font-bold text-white">
                            P
                        </span>

                    </div>


                    <h1 className="mt-5 text-2xl font-bold tracking-tight text-gray-800">
                        ProductSystem
                    </h1>


                    <p className="mt-2 text-sm text-gray-500">
                        Gerenciamento de produtos
                    </p>

                </div>


                {/* =================================
                    CARD
                ================================= */}

                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/60">


                    {/* CABEÇALHO */}

                    <div className="border-b border-gray-100 px-8 py-7">

                        <h2 className="text-2xl font-bold text-gray-800">
                            Bem-vindo de volta
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Entre na sua conta para continuar.
                        </p>

                    </div>


                    {/* FORMULÁRIO */}

                    <form
                        onSubmit={entrar}
                        className="px-8 py-8"
                    >


                        {/* =================================
                            ERRO
                        ================================= */}

                        {erro && (

                            <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3">

                                <p className="text-sm font-medium text-red-600">
                                    {erro}
                                </p>

                            </div>

                        )}


                        {/* =================================
                            EMAIL
                        ================================= */}

                        <div className="mb-6">

                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                E-mail
                            </label>


                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                placeholder="seu@email.com"
                                autoComplete="email"
                                className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                            />

                        </div>


                        {/* =================================
                            SENHA
                        ================================= */}

                        <div className="mb-7">

                            <div className="mb-2 flex items-center justify-between">

                                <label
                                    htmlFor="senha"
                                    className="text-sm font-semibold text-gray-700"
                                >
                                    Senha
                                </label>

                            </div>


                            <input
                                type="password"
                                id="senha"
                                value={senha}
                                onChange={(e) =>
                                    setSenha(e.target.value)
                                }
                                placeholder="Digite sua senha"
                                autoComplete="current-password"
                                className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                            />

                        </div>


                        {/* =================================
                            BOTÃO
                        ================================= */}

                        <button
                            type="submit"
                            disabled={carregando}
                            className="h-12 w-full rounded-xl bg-cyan-500 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-600 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {carregando
                                ? "Entrando..."
                                : "Entrar"
                            }

                        </button>


                        {/* =================================
                            CADASTRO
                        ================================= */}

                        <div className="mt-7 border-t border-gray-100 pt-6 text-center">

                            <p className="text-sm text-gray-500">
                                Ainda não possui uma conta?
                            </p>


                            <Link
                                to="/cadastro"
                                className="mt-2 inline-block text-sm font-semibold text-cyan-600 transition hover:text-cyan-700"
                            >
                                Criar uma conta
                            </Link>

                        </div>


                    </form>

                </section>


                {/* RODAPÉ */}

                <p className="mt-6 text-center text-xs text-gray-400">
                    ProductSystem • Gerenciamento de produtos
                </p>


            </div>

        </main>

    );

}

export default Login