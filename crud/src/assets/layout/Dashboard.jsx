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


function Dashboard() {

    const { produtos } = useContext(ProdutoContext);


    if (produtos.length === 0) {
        return (
            <>
                <h1 className="mb-6 text-4xl font-bold text-center">
                    Dashboard
                </h1>

                <main className="flex min-h-[80vh] items-center justify-center border-2">

                    <h1 className="text-3xl font-bold text-gray-500">
                        NENHUM produto cadastrado
                    </h1>

                </main>
            </>
        );
    }


    const quantidadeTotal = produtos.reduce(
        (total, produto) =>
            total + produto.quantidade,
        0
    );


    const valorTotal = produtos.reduce(
        (total, produto) =>
            total + produto.preco * produto.quantidade,
        0
    );


    const produtosPorCategoria = produtos.reduce(
        (resultado, produto) => {

            const categoria = produto.categoria;

            if (!resultado[categoria]) {
                resultado[categoria] = 0;
            }

            resultado[categoria] += produto.quantidade;

            return resultado;

        },
        {}
    );


    const dadosCategorias = Object.entries(
        produtosPorCategoria
    ).map(([categoria, quantidade]) => ({
        categoria,
        quantidade
    }));


    // GERA CORES ALEATÓRIAS
    const gerarCorAleatoria = () => {

        const letras = "0123456789ABCDEF";

        let cor = "#";

        for (let i = 0; i < 6; i++) {

            cor += letras[
                Math.floor(Math.random() * 16)
            ];

        }

        return cor;
    };


    return (
        <main>

            <h1 className="mb-6 text-4xl font-bold text-center">
                Dashboard
            </h1>


            {/* CARDS */}

            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="text-sm text-gray-500">
                        Total de produtos
                    </p>

                    <strong className="mt-2 block text-3xl font-bold">
                        {quantidadeTotal}
                    </strong>

                </div>


                <div className="rounded-xl bg-green-400 p-6 shadow">

                    <p className="text-sm text-gray-800">
                        Valor total do estoque
                    </p>

                    <strong className="mt-2 block text-3xl font-bold">

                        {valorTotal.toLocaleString(
                            "pt-BR",
                            {
                                style: "currency",
                                currency: "BRL"
                            }
                        )}

                    </strong>

                </div>

            </section>


            {/* GRÁFICO */}

            <section className="mt-6 rounded-xl bg-white p-6 shadow">

                <h2 className="mb-4 text-xl font-bold">
                    Produtos por categoria
                </h2>


                <div className="h-80">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <PieChart>

                            <Pie
                                data={dadosCategorias}
                                dataKey="quantidade"
                                nameKey="categoria"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >

                                {dadosCategorias.map(
                                    (item, index) => (

                                        <Cell
                                            key={`cell-${index}`}
                                            fill={gerarCorAleatoria()}
                                        />

                                    )
                                )}

                            </Pie>


                            <Tooltip />

                            <Legend />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </section>

        </main>
    );
}


export default Dashboard;