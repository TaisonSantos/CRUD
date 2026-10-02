import { useContext, useState } from "react";
import { ProdutoContext } from "../../context/ProdutosContext";

function ListaProdutosEmLista() {

    const { produtos } = useContext(ProdutoContext);

    const [categoriaSelecionada, setCategoriaSelecionada] = useState("todas");

    const [ordemPreco, setOrdemPreco] = useState("nenhuma");


    // PEGAR CATEGORIAS SEM REPETIR

    const categorias = [
        ...new Set(
            produtos.map((produto) => produto.categoria)
        )
    ];


    // FILTRAR PRODUTOS

    let produtosFiltrados = produtos.filter((produto) => {

        if (categoriaSelecionada === "todas") {
            return true;
        }

        return produto.categoria === categoriaSelecionada;

    });


    // ORDENAR PELO PREÇO

    if (ordemPreco === "maior") {

        produtosFiltrados.sort(
            (a, b) => b.preco - a.preco
        );

    }


    if (ordemPreco === "menor") {

        produtosFiltrados.sort(
            (a, b) => a.preco - b.preco
        );

    }


    return (

        <section className="mt-8 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">


            {/* CABEÇALHO */}

            <div className="border-b border-gray-200 px-6 py-5">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-100">

                                <span className="material-symbols-outlined text-cyan-600">
                                    inventory_2
                                </span>

                            </div>

                            <div>

                                <h2 className="text-xl font-bold text-gray-800">
                                    Lista de Produtos
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Gerencie e visualize seus produtos
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* CONTADOR */}

                    <div className="rounded-lg bg-gray-100 px-4 py-2">

                        <span className="text-sm text-gray-500">
                            Produtos:
                        </span>

                        <strong className="ml-2 text-gray-800">
                            {produtosFiltrados.length}
                        </strong>

                    </div>

                </div>

            </div>


            {/* FILTROS */}

            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">

                <div className="flex flex-col gap-4 md:flex-row md:items-end">


                    {/* CATEGORIA */}

                    <div className="flex-1">

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Categoria
                        </label>

                        <div className="relative">

                            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                category
                            </span>

                            <select
                                value={categoriaSelecionada}
                                onChange={(e) =>
                                    setCategoriaSelecionada(e.target.value)
                                }
                                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                            >

                                <option value="todas">
                                    Todas as categorias
                                </option>

                                {categorias.map((categoria) => (

                                    <option
                                        key={categoria}
                                        value={categoria}
                                    >
                                        {categoria}
                                    </option>

                                ))}

                            </select>

                        </div>

                    </div>


                    {/* PREÇO */}

                    <div className="flex-1">

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Ordenar por preço
                        </label>

                        <div className="relative">

                            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                payments
                            </span>

                            <select
                                value={ordemPreco}
                                onChange={(e) =>
                                    setOrdemPreco(e.target.value)
                                }
                                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                            >

                                <option value="nenhuma">
                                    Ordenação padrão
                                </option>

                                <option value="maior">
                                    Maior preço
                                </option>

                                <option value="menor">
                                    Menor preço
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* LIMPAR */}

                    <button
                        onClick={() => {
                            setCategoriaSelecionada("todas");
                            setOrdemPreco("nenhuma");
                        }}
                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                    >

                        <span className="material-symbols-outlined text-lg">
                            filter_alt_off
                        </span>

                        Limpar filtros

                    </button>

                </div>

            </div>


            {/* TABELA */}

            <div className="overflow-x-auto">

                <table className="w-full min-w-[700px] text-left">


                    {/* CABEÇALHO DA TABELA */}

                    <thead>

                        <tr className="border-b border-gray-200 bg-gray-50">

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                                Produto
                            </th>

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                                Categoria
                            </th>

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                                Preço
                            </th>

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                                Quantidade
                            </th>

                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                                Valor Total
                            </th>

                        </tr>

                    </thead>


                    {/* CORPO */}

                    <tbody>

                        {produtosFiltrados.map((produto) => (

                            <tr
                                key={produto.id}
                                className="border-b border-gray-100 transition hover:bg-cyan-50/40"
                            >


                                {/* PRODUTO */}

                                <td className="px-6 py-4">

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">

                                            <span className="material-symbols-outlined text-gray-500">
                                                inventory_2
                                            </span>

                                        </div>

                                        <span className="font-semibold text-gray-800">
                                            {produto.nome}
                                        </span>

                                    </div>

                                </td>


                                {/* CATEGORIA */}

                                <td className="px-6 py-4">

                                    <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
                                        {produto.categoria}
                                    </span>

                                </td>


                                {/* PREÇO */}

                                <td className="px-6 py-4 font-medium text-gray-700">

                                    {produto.preco.toLocaleString(
                                        "pt-BR",
                                        {
                                            style: "currency",
                                            currency: "BRL"
                                        }
                                    )}

                                </td>


                                {/* QUANTIDADE */}

                                <td className="px-6 py-4">

                                    <span className="font-semibold text-gray-700">
                                        {produto.quantidade}
                                    </span>

                                </td>


                                {/* VALOR TOTAL */}

                                <td className="px-6 py-4">

                                    <span className="font-bold text-gray-800">

                                        {(produto.preco * produto.quantidade).toLocaleString(
                                            "pt-BR",
                                            {
                                                style: "currency",
                                                currency: "BRL"
                                            }
                                        )}

                                    </span>

                                </td>

                            </tr>

                        ))}


                        {/* NENHUM RESULTADO */}

                        {produtosFiltrados.length === 0 && (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="px-6 py-16 text-center"
                                >

                                    <span className="material-symbols-outlined text-5xl text-gray-300">
                                        search_off
                                    </span>

                                    <p className="mt-3 font-semibold text-gray-600">
                                        Nenhum produto encontrado
                                    </p>

                                    <p className="mt-1 text-sm text-gray-400">
                                        Tente alterar os filtros selecionados.
                                    </p>

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </section>
    );
}

export default ListaProdutosEmLista;