import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";

function Layout() {
    return (
        <div className="min-h-screen bg-gray-100">

            <Header />

            <div className="flex min-h-[calc(100vh-64px)]">

                <Nav />

                <main className="flex-1 overflow-auto p-6">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default Layout;