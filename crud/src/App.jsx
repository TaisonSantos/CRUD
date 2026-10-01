import FormCadastroProd from "./assets/componentes/produtos/FormCadastroProd";
import ListaProdutos from "./assets/componentes/produtos/ListaProdutos";



function App() {
    return (
        <main className="min-h-screen bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-6xl">

                <h1 className="mb-6 text-2xl font-bold text-gray-800 sm:text-3xl">
                    Sistema de Produtos
                </h1>

                <FormCadastroProd />

                <ListaProdutos />

            </div>

        </main>
    );
}

export default App;