import { NavLink } from "react-router-dom";

function Nav() {

    const links = [
        {
            to: "/dashboard",
            icon: "dashboard",
            nome: "Dashboard"
        },
        {
            to: "/produtos",
            icon: "inventory_2",
            nome: "Produtos"
        },
        {
            to: "/cadastro",
            icon: "add_box",
            nome: "Cadastrar"
        }
    ];


    return (

        <aside className="w-56 shrink-0 border-r border-gray-700 bg-gray-900">

            <div className="p-4">

                <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Menu
                </p>


                <nav className="space-y-2">

                    {links.map((link) => (

                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all
                                ${
                                    isActive
                                        ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`
                            }
                        >

                            <span className="material-symbols-outlined">
                                {link.icon}
                            </span>

                            <span>
                                {link.nome}
                            </span>

                        </NavLink>

                    ))}

                </nav>

            </div>


            {/* PARTE INFERIOR */}

            <div className="absolute bottom-0 w-56 border-t border-gray-800 p-4">

                <div className="rounded-lg bg-gray-800 p-3">

                    <p className="text-xs text-gray-500">
                        Sistema
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-300">
                        Controle de Produtos
                    </p>

                </div>

            </div>

        </aside>
    );
}

export default Nav;