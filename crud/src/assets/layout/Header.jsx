import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="flex w-full items-center justify-between bg-gray-700 px-6 py-3">

            <Link
                to="/"
                className="text-xl font-bold text-white"
            >
                LOGO
            </Link>

            <Link
                to="/login"
                className="text-white"
            >
                <span className="material-symbols-outlined text-3xl">
                    person
                </span>
            </Link>

        </header>
    );
}

export default Header;