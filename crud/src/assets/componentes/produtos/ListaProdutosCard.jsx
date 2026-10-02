import { useContext } from "react";
import { ProdutoContext } from "../../context/ProdutosContext";
import Card from "./Card";

function ListaProdutos() {

    const { produtos } = useContext(ProdutoContext);

    return (
        <section>

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-gray-800">
                    Produtos cadastrados
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    {produtos.length} produto(s) cadastrado(s)
                </p>

            </div>


            {produtos.length === 0 ? (

                <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white">

                    <div className="text-center">

                        <span className="material-symbols-outlined text-6xl text-gray-300">
                            inventory_2
                        </span>

                        <h3 className="mt-4 text-xl font-semibold text-gray-600">
                            Nenhum produto cadastrado
                        </h3>

                        <p className="mt-2 text-sm text-gray-400">
                            Cadastre um produto para ele aparecer aqui.
                        </p>

                    </div>

                </div>

            ) : (

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                    {produtos.map((produto) => (

                        <Card
                            key={produto.id}
                            produto={produto}
                        />

                    ))}

                </div>

            )}

        </section>
    );
}

export default ListaProdutos;