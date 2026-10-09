
import { useContext } from "react";

import { toast } from "react-toastify";

import { ProdutoContext } from "../../context/ProdutosContext";

import ListaProdutosEmLista from "./ListaProdutosEmLista";


function FormCadastroProd() {

    const { cadastrarProduto } = useContext(ProdutoContext);


    async function enviarDados(event) {

        event.preventDefault();

        const form = event.target;

        const produto = {
            nome: form.nome.value.trim(),
            quantidade: Number(form.quantidade.value),
            preco: Number(form.preco.value),
            categoria: form.categoria.value.trim()
        };


        // VALIDAÇÕES

        if (!produto.nome) {
            toast.warning("Digite o nome do produto");
            return;
        }

        if (!Number.isFinite(produto.quantidade) || produto.quantidade <= 0) {
            toast.warning("A quantidade deve ser maior que zero");
            return;
        }

        if (!Number.isFinite(produto.preco) || produto.preco <= 0) {
            toast.warning("O preço deve ser maior que zero");
            return;
        }

        if (!produto.categoria) {
            toast.warning("Digite a categoria");
            return;
        }


        // CADASTRO

        try {

            const resultado = await cadastrarProduto(produto);

            if (resultado?.sucesso === false || resultado === null) {
                toast.error("Não foi possível cadastrar o produto.");
                return;
            }

            toast.success("Produto cadastrado com sucesso!");

            form.reset();

        } catch (error) {

            console.error("Erro ao cadastrar produto:", error);

            toast.error("Ocorreu um erro ao cadastrar o produto.");

        }
    }


    return (

        <div className="mx-auto w-full max-w-[1600px] space-y-10 pb-12">

            {/* =====================================
                CADASTRO DE PRODUTO
            ===================================== */}

            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

                {/* CABEÇALHO */}

                <div className="flex flex-col gap-4 border-b border-gray-100 px-6 py-6 sm:flex-row sm:items-center sm:gap-5 sm:px-8">

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            className="h-7 w-7"
                        >
                            <path
                                d="M12 5v14M5 12h14"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-800">
                            Cadastrar produto
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-gray-500">
                            Preencha as informações abaixo para adicionar um produto ao seu estoque.
                        </p>
                    </div>

                </div>


                {/* FORMULÁRIO */}

                <form
                    onSubmit={enviarDados}
                    className="p-6 sm:p-8 lg:p-10"
                >

                    <div className="grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2">

                        {/* NOME */}

                        <div className="min-w-0">

                            <label
                                htmlFor="nome"
                                className="mb-3 block text-sm font-semibold text-gray-700"
                            >
                                Nome do produto
                            </label>

                            <input
                                type="text"
                                name="nome"
                                id="nome"
                                placeholder="Ex.: Camisa"
                                required
                                className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                            />

                            <p className="mt-2 text-xs text-gray-400">
                                Informe o nome para identificar o produto.
                            </p>

                        </div>


                        {/* QUANTIDADE */}

                        <div className="min-w-0">

                            <label
                                htmlFor="quantidade"
                                className="mb-3 block text-sm font-semibold text-gray-700"
                            >
                                Quantidade em estoque
                            </label>

                            <input
                                type="number"
                                name="quantidade"
                                id="quantidade"
                                min="1"
                                step="1"
                                placeholder="Ex.: 10"
                                required
                                className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                            />

                            <p className="mt-2 text-xs text-gray-400">
                                Quantas unidades estão disponíveis?
                            </p>

                        </div>


                        {/* PREÇO */}

                        <div className="min-w-0">

                            <label
                                htmlFor="preco"
                                className="mb-3 block text-sm font-semibold text-gray-700"
                            >
                                Preço unitário
                            </label>

                            <div className="relative">

                                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
                                    R$
                                </span>

                                <input
                                    type="number"
                                    name="preco"
                                    id="preco"
                                    min="0.01"
                                    step="0.01"
                                    placeholder="0,00"
                                    required
                                    className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 pl-12 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                                />

                            </div>

                            <p className="mt-2 text-xs text-gray-400">
                                Informe o valor de uma unidade.
                            </p>

                        </div>


                        {/* CATEGORIA */}

                        <div className="min-w-0">

                            <label
                                htmlFor="categoria"
                                className="mb-3 block text-sm font-semibold text-gray-700"
                            >
                                Categoria
                            </label>

                            <input
                                type="text"
                                name="categoria"
                                id="categoria"
                                placeholder="Ex.: Eletrônicos"
                                required
                                className="h-12 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 hover:border-gray-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                            />

                            <p className="mt-2 text-xs text-gray-400">
                                Agrupe produtos semelhantes.
                            </p>

                        </div>

                    </div>


                    {/* AÇÕES */}

                    <div className="mt-9 flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center sm:justify-between">

                        <p className="text-xs leading-5 text-gray-400">
                            Confira os dados antes de cadastrar.
                        </p>

                        <button
                            type="submit"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-500 px-7 text-sm font-semibold text-white shadow-sm shadow-cyan-500/20 transition hover:bg-cyan-600 hover:shadow-md active:scale-[0.98]"
                        >

                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-5 w-5"
                            >
                                <path
                                    d="M12 5v14M5 12h14"
                                    strokeLinecap="round"
                                />
                            </svg>

                            Cadastrar produto

                        </button>

                    </div>

                </form>

            </section>


            {/* =====================================
                LISTA DE PRODUTOS
            ===================================== */}

            <section className="min-w-0">

                <ListaProdutosEmLista />

            </section>

        </div>

    );
}


export default FormCadastroProd;
