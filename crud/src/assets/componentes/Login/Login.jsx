import { useState } from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import { fazerLogin } from "../../service/authService";


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


        // ========================================
        // VALIDAÇÕES
        // ========================================

        if (!email.trim()) {

            setErro("Digite seu e-mail.");

            return;

        }


        if (!senha) {

            setErro("Digite sua senha.");

            return;

        }


        // ========================================
        // LOADING
        // ========================================

        setCarregando(true);


        const resultado = await fazerLogin(
            email.trim(),
            senha
        );


        setCarregando(false);


        // ========================================
        // ERRO
        // ========================================

        if (!resultado.sucesso) {

            setErro("E-mail ou senha incorretos.");

            return;

        }


        // ========================================
        // SUCESSO
        // ========================================

        navigate("/dashboard");

    }


    return (

        <main
            className="
                relative
                min-h-screen
                overflow-y-auto
                bg-gray-950
            "
        >

            {/* =====================================
                BACKGROUND
            ===================================== */}

            <img
                src="/Paisagem Montanhosa ao Pôr do Sol.png"
                alt=""
                className="
                    fixed
                    inset-0
                    h-full
                    w-full
                    object-cover
                "
            />


            {/* =====================================
                OVERLAY
            ===================================== */}

            <div
                className="
                    fixed
                    inset-0
                    bg-cyan-950/20
                "
            />


            {/* =====================================
                CONTAINER
            ===================================== */}

            <div
                className="
                    relative
                    z-10
                    flex
                    min-h-screen
                    items-center
                    justify-center
                    px-4
                    py-8
                "
            >

                {/* =================================
                    CARD
                ================================= */}

                <section
                    className="
                        w-full
                        max-w-[400px]
                        overflow-hidden
                        rounded-2xl
                        border
                        border-white/30
                        bg-gray-900/45
                        shadow-2xl
                        shadow-cyan-950/40
                        backdrop-blur-xl
                    "
                >

                    {/* =================================
                        CABEÇALHO
                    ================================= */}

                    <div
                        className="
                            px-7
                            pb-5
                            pt-7
                            text-center
                        "
                    >

                        {/* =================================
                            LOGO
                        ================================= */}

                        <div
                            className="
                                mx-auto
                                flex
                                h-13
                                w-13
                                items-center
                                justify-center
                                rounded-xl
                                bg-cyan-500
                                shadow-lg
                                shadow-cyan-500/30
                            "
                        >

                            <span
                                className="
                                    text-xl
                                    font-bold
                                    text-white
                                "
                            >
                                P
                            </span>

                        </div>


                        {/* =================================
                            NOME DO SISTEMA
                        ================================= */}

                        <h1
                            className="
                                mt-3
                                text-xl
                                font-bold
                                text-white
                            "
                        >
                            ProductSystem
                        </h1>


                        <p
                            className="
                                mt-1
                                text-xs
                                text-gray-300
                            "
                        >
                            Gerenciamento de produtos
                        </p>


                        {/* =================================
                            TÍTULO
                        ================================= */}

                        <h2
                            className="
                                mt-5
                                text-xl
                                font-bold
                                text-white
                            "
                        >
                            Bem-vindo de volta
                        </h2>


                        <p
                            className="
                                mt-1
                                text-xs
                                text-gray-300
                            "
                        >
                            Entre na sua conta para continuar.
                        </p>

                    </div>


                    {/* =================================
                        DIVISÓRIA
                    ================================= */}

                    <div
                        className="
                            border-t
                            border-white/10
                        "
                    />


                    {/* =================================
                        FORMULÁRIO
                    ================================= */}

                    <form
                        onSubmit={entrar}
                        className="
                            px-7
                            py-6
                        "
                    >

                        {/* =================================
                            MENSAGEM DE ERRO
                        ================================= */}

                        {erro && (

                            <div
                                className="
                                    mb-5
                                    rounded-xl
                                    border
                                    border-red-400/30
                                    bg-red-500/15
                                    px-4
                                    py-3
                                "
                            >

                                <p
                                    className="
                                        text-xs
                                        font-medium
                                        text-red-200
                                    "
                                >
                                    {erro}
                                </p>

                            </div>

                        )}


                        {/* =================================
                            E-MAIL
                        ================================= */}

                        <div
                            className="
                                mb-5
                            "
                        >

                            <label
                                htmlFor="email"
                                className="
                                    mb-2
                                    block
                                    text-xs
                                    font-semibold
                                    text-white
                                "
                            >
                                E-mail
                            </label>


                            <div
                                className="
                                    relative
                                "
                            >

                                {/* ÍCONE E-MAIL */}

                                <svg
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-4
                                        top-1/2
                                        h-5
                                        w-5
                                        -translate-y-1/2
                                        text-gray-300
                                    "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >

                                    <rect
                                        x="3"
                                        y="5"
                                        width="18"
                                        height="14"
                                        rx="2"
                                    />

                                    <path
                                        d="m3 7 9 6 9-6"
                                    />

                                </svg>


                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="seu@email.com"
                                    autoComplete="email"
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/30
                                        bg-white/10
                                        pl-11
                                        pr-4
                                        text-sm
                                        text-white
                                        outline-none
                                        transition
                                        placeholder:text-gray-400
                                        hover:border-white/50
                                        focus:border-cyan-400
                                        focus:bg-white/15
                                        focus:ring-2
                                        focus:ring-cyan-500/20
                                    "
                                />

                            </div>

                        </div>


                        {/* =================================
                            SENHA
                        ================================= */}

                        <div
                            className="
                                mb-4
                            "
                        >

                            <label
                                htmlFor="senha"
                                className="
                                    mb-2
                                    block
                                    text-xs
                                    font-semibold
                                    text-white
                                "
                            >
                                Senha
                            </label>


                            <div
                                className="
                                    relative
                                "
                            >

                                {/* ÍCONE CADEADO */}

                                <svg
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-4
                                        top-1/2
                                        h-5
                                        w-5
                                        -translate-y-1/2
                                        text-gray-300
                                    "
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                >

                                    <rect
                                        x="5"
                                        y="10"
                                        width="14"
                                        height="10"
                                        rx="2"
                                    />

                                    <path
                                        d="M8 10V7a4 4 0 0 1 8 0v3"
                                    />

                                </svg>


                                <input
                                    type="password"
                                    id="senha"
                                    value={senha}
                                    onChange={(e) =>
                                        setSenha(e.target.value)
                                    }
                                    placeholder="Digite sua senha"
                                    autoComplete="current-password"
                                    className="
                                        h-11
                                        w-full
                                        rounded-xl
                                        border
                                        border-white/30
                                        bg-white/10
                                        pl-11
                                        pr-4
                                        text-sm
                                        text-white
                                        outline-none
                                        transition
                                        placeholder:text-gray-400
                                        hover:border-white/50
                                        focus:border-cyan-400
                                        focus:bg-white/15
                                        focus:ring-2
                                        focus:ring-cyan-500/20
                                    "
                                />

                            </div>

                        </div>


                        {/* =================================
                            LEMBRAR / ESQUECI
                        ================================= */}

                        <div
                            className="
                                mb-6
                                mt-3
                                flex
                                min-h-8
                                items-center
                                justify-between
                                gap-4
                                px-1
                            "
                        >

                            {/* LEMBRAR */}

                            <label
                                className="
                                    flex
                                    cursor-pointer
                                    items-center
                                    gap-2
                                    whitespace-nowrap
                                    text-xs
                                    text-gray-200
                                "
                            >

                                <input
                                    type="checkbox"
                                    className="
                                        h-4
                                        w-4
                                        cursor-pointer
                                        rounded
                                        border-white/30
                                        accent-cyan-500
                                    "
                                />

                                <span>
                                    Lembrar de mim
                                </span>

                            </label>


                            {/* ESQUECI SENHA */}

                            <button
                                type="button"
                                className="
                                    whitespace-nowrap
                                    text-xs
                                    font-medium
                                    text-cyan-300
                                    transition
                                    hover:text-cyan-200
                                "
                            >
                                Esqueceu sua senha?
                            </button>

                        </div>


                        {/* =================================
                            BOTÃO ENTRAR
                        ================================= */}

                        <button
                            type="submit"
                            disabled={carregando}
                            className="
                                h-11
                                w-full
                                rounded-xl
                                bg-cyan-500
                                px-5
                                text-sm
                                font-bold
                                text-white
                                shadow-lg
                                shadow-cyan-500/20
                                transition
                                hover:bg-cyan-400
                                hover:shadow-cyan-500/30
                                active:scale-[0.98]
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >

                            {carregando
                                ? "Entrando..."
                                : "Entrar"
                            }

                        </button>


                        {/* =================================
                            CADASTRO
                        ================================= */}

                        <div
                            className="
                                mt-6
                            "
                        >

                            {/* DIVISÓRIA */}

                            <div
                                className="
                                    mb-4
                                    flex
                                    items-center
                                    gap-3
                                "
                            >

                                <div
                                    className="
                                        h-px
                                        flex-1
                                        bg-white/15
                                    "
                                />


                                <span
                                    className="
                                        whitespace-nowrap
                                        text-[11px]
                                        text-gray-300
                                    "
                                >
                                    Ainda não possui uma conta?
                                </span>


                                <div
                                    className="
                                        h-px
                                        flex-1
                                        bg-white/15
                                    "
                                />

                            </div>


                            {/* BOTÃO CADASTRO */}

                            <Link
                                to="/cadastro"
                                className="
                                    flex
                                    h-10
                                    w-full
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-cyan-400/80
                                    text-xs
                                    font-semibold
                                    text-white
                                    transition
                                    hover:bg-cyan-500/15
                                    hover:shadow-lg
                                    hover:shadow-cyan-500/10
                                "
                            >
                                Criar uma conta
                            </Link>

                        </div>

                    </form>

                </section>

            </div>

        </main>

    );
}


export default Login;