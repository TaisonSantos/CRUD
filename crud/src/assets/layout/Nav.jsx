import { Link } from "react-router-dom";

function Nav() {
    return (
        <nav className="w-48 bg-gray-800">
            <ul>

                <li>
                    <Link
                        to="/dashboard"
                        className="block p-4 text-white hover:bg-gray-700"
                    >
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link
                        to="/produtos"
                        className="block p-4 text-white hover:bg-gray-700"
                    >
                        Produtos
                    </Link>
                </li>

                <li>
                    <Link
                        to="/cadastro"
                        className="block p-4 text-white hover:bg-gray-700"
                    >
                        Cadastro
                    </Link>
                </li>

            </ul>
        </nav>
    );
}

export default Nav;