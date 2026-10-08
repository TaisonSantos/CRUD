import { useContext } from "react";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

import { ProdutoContext } from "../context/ProdutosContext";

import ListaProdutosEmLista from "../componentes/produtos/ListaProdutosEmLista";


function Dashboard() {

    const { produtos } = useContext(ProdutoContext);


    // ==========================================
    // TOTAL DE UNIDADES
    // ==========================================

    const totalProdutos = produtos.reduce(
        (total, produto) =>
            total + Number(produto.quantidade),
        0
    );


    // ==========================================
    // VALOR TOTAL DO ESTOQUE
    // ==========================================

    const valorTotalEstoque = produtos.reduce(
        (total, produto) =>
            total +
            Number(produto.preco) *
            Number(produto.quantidade),
        0
    );


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
    // PRODUTOS CADASTRADOS
    // ==========================================

    const produtosCadastrados = produtos.length;


    // ==========================================
    // PRODUTOS COM ESTOQUE BAIXO
    // ==========================================

    const produtosEstoqueBaixo = produtos.filter(
        (produto) =>
            Number(produto.quantidade) <= 5
    );


    const quantidadeEstoqueBaixo =
        produtosEstoqueBaixo.length;


    // ==========================================
    // DADOS DO GRÁFICO
    // ==========================================

    const dadosCategorias = categorias.map(
        (categoria) => {

            const quantidade = produtos
                .filter(
                    (produto) =>
                        produto.categoria === categoria
                )
                .reduce(
                    (total, produto) =>
                        total +
                        Number(produto.quantidade),
                    0
                );

            return {
                name: categoria,
                quantidade: quantidade
            };
        }
    );


    // ==========================================
    // CORES DO GRÁFICO
    // ==========================================

    const cores = [
        "#38bdf8",
        "#4ade80",
        "#a78bfa",
        "#fbbf24",
        "#fb7185",
        "#f472b6",
        "#60a5fa",
        "#2dd4bf"
    ];


    // ==========================================
    // FORMATAR MOEDA
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

        <div className="mx-auto w-full max-w-[1500px] px-6 py-4 lg:px-8 xl:px-10">


            {/* =====================================
                CABEÇALHO
            ===================================== */}

            <div className="mb-8">

                <h1 className="text-3xl font-bold tracking-tight text-gray-800">
                    Dashboard
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Visão geral do seu estoque
                </p>

            </div>


            {/* =====================================
                CARDS PRINCIPAIS
            ===================================== */}

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">


                {/* =================================
                    PRODUTOS CADASTRADOS
                ================================= */}

                <div className="rounded-2xl border border-gray-100 bg-white px-7 py-6 shadow-sm">

                    <div className="flex items-center justify-center gap-5">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-sky-50">

                            <span className="text-xl font-bold text-sky-500">
                                P
                            </span>

                        </div>

                        <div>

                            <p className="text-sm font-medium text-gray-500">
                                Produtos
                            </p>

                            <h2 className="mt-1 text-3xl font-bold text-gray-800">
                                {produtosCadastrados}
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                Produtos cadastrados
                            </p>

                        </div>

                    </div>

                </div>


                {/* =================================
                    TOTAL DE UNIDADES
                ================================= */}

                <div className="rounded-2xl border border-gray-100 bg-white px-7 py-6 shadow-sm">

                    <div className="flex items-center justify-center gap-5">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50">

                            <span className="text-xl font-bold text-blue-500">
                                Q
                            </span>

                        </div>

                        <div>

                            <p className="text-sm font-medium text-gray-500">
                                Total de unidades
                            </p>

                            <h2 className="mt-1 text-3xl font-bold text-gray-800">
                                {totalProdutos.toLocaleString("pt-BR")}
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                Quantidade total em estoque
                            </p>

                        </div>

                    </div>

                </div>


                {/* =================================
                    VALOR DO ESTOQUE
                ================================= */}

                <div className="rounded-2xl border border-gray-100 bg-white px-7 py-6 shadow-sm">

                    <div className="flex items-center justify-center gap-5">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-emerald-50">

                            <span className="text-sm font-bold text-emerald-500">
                                R$
                            </span>

                        </div>

                        <div>

                            <p className="text-sm font-medium text-gray-500">
                                Valor do estoque
                            </p>

                            <h2 className="mt-1 text-3xl font-bold text-gray-800">
                                {formatarMoeda(valorTotalEstoque)}
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                Valor total dos produtos
                            </p>

                        </div>

                    </div>

                </div>


                {/* =================================
                    ESTOQUE BAIXO
                ================================= */}

                <div
                    className={`rounded-2xl border px-7 py-6 shadow-sm ${
                        quantidadeEstoqueBaixo > 0
                            ? "border-amber-100 bg-amber-50/40"
                            : "border-gray-100 bg-white"
                    }`}
                >

                    <div className="flex items-center justify-center gap-5">

                        <div
                            className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${
                                quantidadeEstoqueBaixo > 0
                                    ? "bg-amber-100"
                                    : "bg-gray-50"
                            }`}
                        >

                            <span
                                className={`material-symbols-outlined ${
                                    quantidadeEstoqueBaixo > 0
                                        ? "text-amber-500"
                                        : "text-gray-400"
                                }`}
                            >
                                warning
                            </span>

                        </div>

                        <div>

                            <p className="text-sm font-medium text-gray-500">
                                Estoque baixo
                            </p>

                            <h2
                                className={`mt-1 text-3xl font-bold ${
                                    quantidadeEstoqueBaixo > 0
                                        ? "text-amber-600"
                                        : "text-gray-800"
                                }`}
                            >
                                {quantidadeEstoqueBaixo}
                            </h2>

                            <p className="mt-1 text-xs text-gray-400">
                                Produtos com até 5 unidades
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================
                GRÁFICO + RESUMO
            ===================================== */}

            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">


                {/* =================================
                    GRÁFICO
                ================================= */}

                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm lg:col-span-3">

                    <div className="mb-5">

                        <h2 className="text-xl font-bold text-gray-800">
                            Produtos por categoria
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Distribuição da quantidade de produtos no estoque
                        </p>

                    </div>


                    {produtos.length === 0 ? (

                        <div className="flex h-[400px] items-center justify-center">

                            <div className="text-center">

                                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">

                                    <span className="text-xl font-bold text-gray-400">
                                        ?
                                    </span>

                                </div>

                                <p className="mt-4 font-semibold text-gray-600">
                                    Nenhum produto cadastrado
                                </p>

                                <p className="mt-2 text-sm text-gray-400">
                                    Cadastre produtos para visualizar o gráfico.
                                </p>

                            </div>

                        </div>

                    ) : (

                        <div className="mx-auto h-[400px] w-full max-w-[650px]">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <PieChart>

                                    <Pie
                                        data={dadosCategorias}
                                        dataKey="quantidade"
                                        nameKey="name"
                                        cx="50%"
                                        cy="45%"
                                        outerRadius={130}
                                        innerRadius={62}
                                        paddingAngle={3}
                                        label={({ quantidade }) =>
                                            quantidade
                                        }
                                    >

                                        {dadosCategorias.map(
                                            (entry, index) => (

                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        cores[
                                                            index %
                                                            cores.length
                                                        ]
                                                    }
                                                />

                                            )
                                        )}

                                    </Pie>


                                    <Tooltip
                                        formatter={(value) => [
                                            `${value} unidades`,
                                            "Quantidade"
                                        ]}
                                    />


                                    <Legend
                                        verticalAlign="bottom"
                                        height={35}
                                    />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    )}

                </div>


                {/* =================================
                    RESUMO
                ================================= */}

                <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm lg:col-span-2">

                    <div className="mb-6">

                        <h2 className="text-xl font-bold text-gray-800">
                            Resumo
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Informações rápidas do estoque
                        </p>

                    </div>


                    <div className="space-y-4">


                        {/* PRODUTOS */}

                        <div className="rounded-xl border border-gray-100 bg-gray-50/70 px-5 py-4">

                            <p className="text-sm text-gray-500">
                                Produtos cadastrados
                            </p>

                            <strong className="mt-1 block text-2xl font-bold text-gray-800">
                                {produtosCadastrados}
                            </strong>

                        </div>


                        {/* CATEGORIAS */}

                        <div className="rounded-xl border border-gray-100 bg-gray-50/70 px-5 py-4">

                            <p className="text-sm text-gray-500">
                                Categorias
                            </p>

                            <strong className="mt-1 block text-2xl font-bold text-gray-800">
                                {categorias.length}
                            </strong>

                        </div>


                        {/* UNIDADES */}

                        <div className="rounded-xl border border-gray-100 bg-gray-50/70 px-5 py-4">

                            <p className="text-sm text-gray-500">
                                Unidades em estoque
                            </p>

                            <strong className="mt-1 block text-2xl font-bold text-gray-800">
                                {totalProdutos.toLocaleString("pt-BR")}
                            </strong>

                        </div>


                        {/* ESTOQUE BAIXO */}

                        <div
                            className={`rounded-xl border px-5 py-4 ${
                                quantidadeEstoqueBaixo > 0
                                    ? "border-amber-100 bg-amber-50"
                                    : "border-gray-100 bg-gray-50/70"
                            }`}
                        >

                            <p className="text-sm text-gray-500">
                                Produtos com estoque baixo
                            </p>

                            <strong
                                className={`mt-1 block text-2xl font-bold ${
                                    quantidadeEstoqueBaixo > 0
                                        ? "text-amber-600"
                                        : "text-gray-800"
                                }`}
                            >
                                {quantidadeEstoqueBaixo}
                            </strong>

                        </div>


                        {/* VALOR */}

                        <div className="rounded-xl border border-cyan-100 bg-cyan-50/60 px-5 py-4">

                            <p className="text-sm font-medium text-cyan-700">
                                Valor total do estoque
                            </p>

                            <strong className="mt-1 block text-2xl font-bold text-cyan-700">
                                {formatarMoeda(valorTotalEstoque)}
                            </strong>

                        </div>

                    </div>

                </div>

            </div>


            {/* =====================================
                PRODUTOS COM ESTOQUE BAIXO
            ===================================== */}

            {quantidadeEstoqueBaixo > 0 && (

                <div className="mt-8 rounded-2xl border border-amber-100 bg-white p-8 shadow-sm">

                    <div className="mb-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">

                                <span className="material-symbols-outlined text-amber-500">
                                    warning
                                </span>

                            </div>

                            <div>

                                <h2 className="text-xl font-bold text-gray-800">
                                    Estoque baixo
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Produtos que precisam de atenção
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                        {produtosEstoqueBaixo.map(
                            (produto) => (

                                <div
                                    key={produto.id}
                                    className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/70 px-5 py-4"
                                >

                                    <div>

                                        <p className="font-semibold text-gray-800">
                                            {produto.nome}
                                        </p>

                                        <p className="mt-1 text-xs text-gray-500">
                                            {produto.categoria}
                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-lg font-bold text-amber-600">
                                            {produto.quantidade}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            unidades
                                        </p>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>

            )}


            {/* =====================================
                LISTA DE PRODUTOS
            ===================================== */}

            <div className="mt-8">

                <ListaProdutosEmLista />

            </div>

        </div>

    );
}


export default Dashboard;