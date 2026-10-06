import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { cadastrarUsuario } from "../../../service/authService";


function Cadastro() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);


    async function cadastrar(event) {

        event.preventDefault();

        setErro("");
        setSucesso("");


        if (!email.trim()) {

            setErro("Digite seu e-mail.");

            return;

        }


        if (senha.length < 6) {

            setErro(
                "A senha deve possuir pelo menos 6 caracteres."
            );

            return;

        }


        if (senha !== confirmarSenha) {

            setErro("As senhas não são iguais.");

            return;

        }


        setCarregando(true);


        const resultado = await cadastrarUsuario(
            email.trim(),
            senha
        );


        setCarregando(false);


        if (!resultado.sucesso) {

            setErro(
                "Não foi possível realizar o cadastro."
            );

            return;

        }


        setSucesso("Conta criada com sucesso!");


        setTimeout(() => {

            navigate("/login");

        }, 1500);

    }


    return (

        <main className="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-10">


            <div className="w-full max-w-[440px]">


                {/* LOGO */}

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


                {/* CARD */}

                <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg shadow-gray-200/60">


                    {/* CABEÇALHO */}

                    <div className="border-b border-gray-100 px-8 py-7">

                        <h2 className="text-2xl font-bold text-gray-800">
                            Criar sua conta
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Preencha os dados para começar.
                        </p>

                    </div>


                    {/* FORM */}

                    <form
                        onSubmit={cadastrar}
                        className="px-8 py-8"
                    >


                        {/* ERRO */}

                        {erro && (

                            <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3">

                                <p className="text-sm font-medium text-red-600">
                                    {erro}
                                </p>

                            </div>

                        )}


                        {/* SUCESSO */}

                        {sucesso && (

                            <div className="mb-6 rounded-xl border border-green-100 bg-green-50 px-4 py-3">

                                <p className="text-sm font-medium text-green-600">
                                    {sucesso}
                                </p>

                            </div>

                        )}


                        {/* EMAIL */}

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


                        {/* SENHA */}

                        <div className="mb-6">

                            <label
                                htmlFor="senha"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Senha
                            </label>


                            <input
                                type="password"
                                id="senha"
                                value={senha}
                                onChange={(e) =>
                                    setSenha(e.target.value)
                                }
                                placeholder="Mínimo de 6 caracteres"
                                autoComplete="new-password"
                                className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                            />

                        </div>


                        {/* CONFIRMAR SENHA */}

                        <div className="mb-7">

                            <label
                                htmlFor="confirmarSenha"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Confirmar senha
                            </label>


                            <input
                                type="password"
                                id="confirmarSenha"
                                value={confirmarSenha}
                                onChange={(e) =>
                                    setConfirmarSenha(
                                        e.target.value
                                    )
                                }
                                placeholder="Digite a senha novamente"
                                autoComplete="new-password"
                                className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                            />

                        </div>


                        {/* BOTÃO */}

                        <button
                            type="submit"
                            disabled={carregando}
                            className="h-12 w-full rounded-xl bg-cyan-500 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-600 hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                        >

                            {carregando
                                ? "Criando conta..."
                                : "Criar conta"
                            }

                        </button>


                        {/* LOGIN */}

                        <div className="mt-7 border-t border-gray-100 pt-6 text-center">

                            <p className="text-sm text-gray-500">
                                Já possui uma conta?
                            </p>


                            <Link
                                to="/login"
                                className="mt-2 inline-block text-sm font-semibold text-cyan-600 transition hover:text-cyan-700"
                            >
                                Voltar para o login
                            </Link>

                        </div>

                    </form>

                </section>


                <p className="mt-6 text-center text-xs text-gray-400">
                    ProductSystem • Gerenciamento de produtos
                </p>

            </div>

        </main>

    );

}


export default Cadastro;