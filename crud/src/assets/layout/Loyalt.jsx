
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";

function Loyalt() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Header />

      <div className="flex flex-1 min-h-0">
        <Nav />

        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Loyalt;
