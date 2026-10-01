import { useContext } from "react";
import { ProdutoContext } from "../../context/ProdutosContext";

function Card({ produto }) {

    const { removerProduto } = useContext(ProdutoContext);

    const {
        id,
        nome,
        quantidade,
        preco,
        categoria
    } = produto;

    return (
        <article
            className="rounded-xl bg-white p-4 shadow-md
                       transition hover:shadow-lg sm:p-5"
        >

            <div className="mb-4 flex items-start justify-between gap-3">

                <h3 className="text-lg font-bold text-gray-800">
                    {nome}
                </h3>

                <span
                    className="shrink-0 rounded-full bg-blue-100
                               px-2.5 py-1 text-xs font-semibold
                               text-blue-700"
                >
                    {categoria}
                </span>

            </div>

            <div className="space-y-2 text-sm text-gray-600">

                <p>
                    <strong className="text-gray-700">
                        Quantidade:
                    </strong>{" "}
                    {quantidade}
                </p>

                <p>
                    <strong className="text-gray-700">
                        Preço:
                    </strong>{" "}
                    R$ {Number(preco).toFixed(2)}
                </p>

            </div>

            <button
                type="button"
                className="mt-5 w-full rounded-lg bg-gray-800
                           py-2.5 text-sm font-semibold text-white
                           transition hover:bg-gray-900
                           active:scale-[0.98]"
            >
                Editar
            </button>

            <button
                onClick={() => removerProduto(id)}
                type="button"
                className="mt-3 w-full rounded-lg bg-red-600
                           py-2.5 text-sm font-semibold text-white
                           transition hover:bg-red-700
                           active:scale-[0.98]"
            >
                Remover
            </button>

        </article>
    );
}

export default Card;