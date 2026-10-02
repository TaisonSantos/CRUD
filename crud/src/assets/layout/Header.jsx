import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="flex h-16 w-full items-center justify-between bg-gray-900 px-6 shadow-md">

            {/* LOGO */}

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


            {/* USUÁRIO */}

            <Link
                to="/login"
                className="flex items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-gray-800"
            >

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700">

                    <span className="material-symbols-outlined text-2xl text-gray-200">
                        person
                    </span>

                </div>

                <div className="hidden text-right sm:block">

                    <p className="text-sm font-semibold text-white">
                        Usuário
                    </p>

                    <p className="text-xs text-gray-400">
                        Minha conta
                    </p>

                </div>

            </Link>

        </header>
    );
}

export default Header;