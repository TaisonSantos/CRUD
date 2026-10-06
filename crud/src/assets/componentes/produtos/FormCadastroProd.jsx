import { useContext } from "react";

import { ProdutoContext } from "../../context/ProdutosContext";

import ListaProdutosEmLista from "./ListaProdutosEmLista";


function FormCadastroProd() {

    const { cadastrarProduto } =
        useContext(ProdutoContext);


    async function enviarDados(event) {

        event.preventDefault();

        const form = event.target;


        const produto = {

            nome: form.nome.value.trim(),

            quantidade:
                Number(form.quantidade.value),

            preco:
                Number(form.preco.value),

            categoria:
                form.categoria.value.trim()

        };


        // ==============================
        // VALIDAÇÕES
        // ==============================

        if (!produto.nome) {

            alert("Digite o nome do produto");

            return;

        }


        if (produto.quantidade <= 0) {

            alert(
                "A quantidade deve ser maior que zero"
            );

            return;

        }


        if (produto.preco <= 0) {

            alert(
                "O preço deve ser maior que zero"
            );

            return;

        }


        if (!produto.categoria) {

            alert(
                "Digite a categoria"
            );

            return;

        }


        // ==============================
        // CADASTRAR
        // ==============================

        await cadastrarProduto(produto);


        form.reset();

    }


    return (

        <div className="w-full pb-12">


            {/* =================================
                FORMULÁRIO
            ================================= */}

            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">


                {/* CABEÇALHO */}

                <div className="border-b border-gray-100 px-8 py-6">

                    <h1 className="text-2xl font-bold text-gray-800">
                        Cadastrar Produto
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Adicione um novo produto ao estoque
                    </p>

                </div>


                {/* FORM */}

                <form
                    onSubmit={enviarDados}
                    className="px-8 py-8"
                >


                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">


                        {/* NOME */}

                        <div>

                            <label
                                htmlFor="nome"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Nome do produto
                            </label>

                            <input
                                type="text"
                                name="nome"
                                id="nome"
                                placeholder="Ex: Camisa"
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                            />

                        </div>


                        {/* QUANTIDADE */}

                        <div>

                            <label
                                htmlFor="quantidade"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Quantidade
                            </label>

                            <input
                                type="number"
                                name="quantidade"
                                id="quantidade"
                                min="1"
                                placeholder="Ex: 10"
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                            />

                        </div>


                        {/* PREÇO */}

                        <div>

                            <label
                                htmlFor="preco"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Preço
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                min="0.01"
                                name="preco"
                                id="preco"
                                placeholder="Ex: 29.90"
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                            />

                        </div>


                        {/* CATEGORIA */}

                        <div>

                            <label
                                htmlFor="categoria"
                                className="mb-2 block text-sm font-semibold text-gray-700"
                            >
                                Categoria
                            </label>

                            <input
                                type="text"
                                name="categoria"
                                id="categoria"
                                placeholder="Ex: Eletrônicos"
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                            />

                        </div>

                    </div>


                    {/* BOTÃO */}

                    <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">

                        <button
                            type="submit"
                            className="rounded-xl bg-cyan-500 px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-600 hover:shadow-md active:scale-[0.98]"
                        >
                            Cadastrar produto
                        </button>

                    </div>

                </form>

            </section>


            {/* =================================
                LISTA
            ================================= */}

            <div className="mt-10">

                <ListaProdutosEmLista />

            </div>

        </div>

    );
}


export default FormCadastroProd;