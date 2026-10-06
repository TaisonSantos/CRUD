import { useContext, useState } from "react";

import { ProdutoContext } from "../../context/ProdutosContext";


function ListaProdutosEmLista() {

    const { produtos } =
        useContext(ProdutoContext);


    const [categoriaSelecionada, setCategoriaSelecionada] =
        useState("todas");


    const [ordemPreco, setOrdemPreco] =
        useState("nenhuma");


    // ==========================================
    // CATEGORIAS
    // ==========================================

    const categorias = [
        ...new Set(
            produtos.map(
                (produto) => produto.categoria
            )
        )
    ];


    // ==========================================
    // FILTRAR
    // ==========================================

    let produtosFiltrados =
        produtos.filter((produto) => {

            if (
                categoriaSelecionada === "todas"
            ) {

                return true;

            }

            return (
                produto.categoria ===
                categoriaSelecionada
            );

        });


    // ==========================================
    // ORDENAR
    // ==========================================

    if (ordemPreco === "maior") {

        produtosFiltrados.sort(
            (a, b) =>
                Number(b.preco) -
                Number(a.preco)
        );

    }


    if (ordemPreco === "menor") {

        produtosFiltrados.sort(
            (a, b) =>
                Number(a.preco) -
                Number(b.preco)
        );

    }


    // ==========================================
    // MOEDA
    // ==========================================

    function formatarMoeda(valor) {

        return Number(valor).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

    }


    return (

        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">


            {/* =================================
                CABEÇALHO
            ================================= */}

            <div className="border-b border-gray-100 px-8 py-6">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">


                    <div>

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50">

                                <span className="text-lg font-bold text-cyan-500">
                                    P
                                </span>

                            </div>


                            <div>

                                <h2 className="text-xl font-bold text-gray-800">
                                    Lista de Produtos
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Gerencie e visualize seus produtos
                                </p>

                            </div>

                        </div>

                    </div>


                    {/* CONTADOR */}

                    <div className="rounded-xl bg-gray-50 px-4 py-2.5">

                        <span className="text-sm text-gray-500">
                            Produtos
                        </span>

                        <strong className="ml-2 text-gray-800">
                            {produtosFiltrados.length}
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================
                FILTROS
            ================================= */}

            <div className="border-b border-gray-100 bg-gray-50/60 px-8 py-5">

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">


                    {/* CATEGORIA */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Categoria
                        </label>

                        <select
                            value={categoriaSelecionada}
                            onChange={(e) =>
                                setCategoriaSelecionada(
                                    e.target.value
                                )
                            }
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
                        >

                            <option value="todas">
                                Todas as categorias
                            </option>


                            {categorias.map(
                                (categoria) => (

                                    <option
                                        key={categoria}
                                        value={categoria}
                                    >
                                        {categoria}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* PREÇO */}

                    <div>

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Ordenar por preço
                        </label>

                        <select
                            value={ordemPreco}
                            onChange={(e) =>
                                setOrdemPreco(
                                    e.target.value
                                )
                            }
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/10"
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


                    {/* LIMPAR */}

                    <div className="flex items-end">

                        <button
                            type="button"
                            onClick={() => {

                                setCategoriaSelecionada(
                                    "todas"
                                );

                                setOrdemPreco(
                                    "nenhuma"
                                );

                            }}
                            className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-100 hover:text-gray-800"
                        >
                            Limpar filtros
                        </button>

                    </div>

                </div>

            </div>


            {/* =================================
                TABELA
            ================================= */}

            <div className="overflow-x-auto">

                <table className="w-full min-w-[800px]">


                    {/* CABEÇALHO */}

                    <thead>

                        <tr className="border-b border-gray-200 bg-gray-50/70">

                            <th className="px-8 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                Produto
                            </th>

                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">
                                Categoria
                            </th>

                            <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                                Preço
                            </th>

                            <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                                Quantidade
                            </th>

                            <th className="px-8 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500">
                                Valor total
                            </th>

                        </tr>

                    </thead>


                    {/* CORPO */}

                    <tbody>

                        {produtosFiltrados.map(
                            (produto) => (

                                <tr
                                    key={produto.id}
                                    className="border-b border-gray-100 transition hover:bg-cyan-50/30"
                                >


                                    {/* PRODUTO */}

                                    <td className="px-8 py-5">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-50">

                                                <span className="text-sm font-bold text-gray-400">
                                                    P
                                                </span>

                                            </div>


                                            <div>

                                                <p className="font-semibold text-gray-800">
                                                    {produto.nome}
                                                </p>

                                                <p className="mt-0.5 text-xs text-gray-400">
                                                    Produto #{produto.id}
                                                </p>

                                            </div>

                                        </div>

                                    </td>


                                    {/* CATEGORIA */}

                                    <td className="px-6 py-5">

                                        <span className="inline-flex rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-600">
                                            {produto.categoria}
                                        </span>

                                    </td>


                                    {/* PREÇO */}

                                    <td className="px-6 py-5 text-right">

                                        <span className="font-medium text-gray-700">
                                            {formatarMoeda(
                                                produto.preco
                                            )}
                                        </span>

                                    </td>


                                    {/* QUANTIDADE */}

                                    <td className="px-6 py-5 text-right">

                                        <span className="font-semibold text-gray-700">
                                            {Number(
                                                produto.quantidade
                                            ).toLocaleString(
                                                "pt-BR"
                                            )}
                                        </span>

                                    </td>


                                    {/* VALOR TOTAL */}

                                    <td className="px-8 py-5 text-right">

                                        <span className="font-bold text-gray-800">

                                            {formatarMoeda(
                                                Number(
                                                    produto.preco
                                                ) *
                                                Number(
                                                    produto.quantidade
                                                )
                                            )}

                                        </span>

                                    </td>

                                </tr>

                            )
                        )}


                        {/* NENHUM PRODUTO */}

                        {produtosFiltrados.length === 0 && (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="px-8 py-16 text-center"
                                >

                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">

                                        <span className="text-xl font-bold text-gray-400">
                                            ?
                                        </span>

                                    </div>


                                    <p className="mt-4 font-semibold text-gray-600">
                                        Nenhum produto encontrado
                                    </p>


                                    <p className="mt-2 text-sm text-gray-400">
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