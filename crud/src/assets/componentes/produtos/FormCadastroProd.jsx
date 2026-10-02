import { useContext } from "react";
import { ProdutoContext } from "../../context/ProdutosContext";
import ListaProdutosEmLista from "../../componentes/produtos/ListaProdutosEmLista";

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

        if (!produto.nome) {
            alert("Digite o nome do produto");
            return;
        }

        if (produto.quantidade <= 0) {
            alert("A quantidade deve ser maior que zero");
            return;
        }

        if (produto.preco <= 0) {
            alert("O preço deve ser maior que zero");
            return;
        }

        if (!produto.categoria) {
            alert("Digite a categoria");
            return;
        }

        await cadastrarProduto(produto);

        form.reset();
    }


    return (
        <div className="w-full">

            {/* FORMULÁRIO */}

            <section className="w-full rounded-xl border border-gray-200 bg-white shadow-sm">

                {/* CABEÇALHO */}

                <div className="border-b border-gray-200 px-6 py-5">

                    <h2 className="text-2xl font-bold text-gray-800">
                        Cadastrar Produto
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Adicione um novo produto ao estoque
                    </p>

                </div>


                {/* FORM */}

                <form
                    onSubmit={enviarDados}
                    className="p-6"
                >

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        {/* NOME */}

                        <div className="w-full">

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
                                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                            />

                        </div>


                        {/* QUANTIDADE */}

                        <div className="w-full">

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
                                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                            />

                        </div>


                        {/* PREÇO */}

                        <div className="w-full">

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
                                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                            />

                        </div>


                        {/* CATEGORIA */}

                        <div className="w-full">

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
                                className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                            />

                        </div>

                    </div>


                    {/* BOTÃO */}

                    <div className="mt-6 flex justify-end">

                        <button
                            type="submit"
                            className="rounded-lg bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-600 active:scale-[0.98]"
                        >
                            Cadastrar Produto
                        </button>

                    </div>

                </form>

            </section>


            {/* TABELA */}

            <ListaProdutosEmLista />

        </div>
    );
}

export default FormCadastroProd;