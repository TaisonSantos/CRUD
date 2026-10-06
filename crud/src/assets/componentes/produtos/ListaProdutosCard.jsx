import { useContext } from "react";
import { ProdutoContext } from "../../context/ProdutosContext";
import Card from "./Card";


function ListaProdutos() {

    const { produtos } = useContext(ProdutoContext);


    return (

        <section className="w-full">


            {/* =====================================
                CABEÇALHO
            ===================================== */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800">
                    Produtos
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    {produtos.length} produto(s) cadastrado(s)
                </p>

            </div>


            {/* =====================================
                PRODUTOS
            ===================================== */}

            {produtos.length === 0 ? (

                <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white">

                    <div className="text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">

                            <span className="text-2xl font-bold text-gray-400">
                                P
                            </span>

                        </div>


                        <h3 className="mt-5 text-xl font-semibold text-gray-600">
                            Nenhum produto cadastrado
                        </h3>


                        <p className="mt-2 text-sm text-gray-400">
                            Cadastre um produto para ele aparecer aqui.
                        </p>

                    </div>

                </div>

            ) : (

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

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