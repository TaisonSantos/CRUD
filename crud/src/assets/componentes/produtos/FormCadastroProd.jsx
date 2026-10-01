import { useContext } from "react";
import { ProdutoContext } from "../../context/ProdutosContext";

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
        <form
            onSubmit={enviarDados}
            className="mb-8 rounded-xl bg-white p-4 shadow-md sm:p-6"
        >

            <h2 className="mb-5 text-xl font-semibold text-gray-800">
                Cadastrar Produto
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div>
                    <label
                        htmlFor="nome"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Nome
                    </label>

                    <input
                        type="text"
                        name="nome"
                        id="nome"
                        placeholder="Nome do produto"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                                   outline-none focus:border-blue-500
                                   focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

                <div>
                    <label
                        htmlFor="quantidade"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Quantidade
                    </label>

                    <input
                        type="number"
                        name="quantidade"
                        id="quantidade"
                        placeholder="0"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                                   outline-none focus:border-blue-500
                                   focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

                <div>
                    <label
                        htmlFor="preco"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Preço
                    </label>

                    <input
                        type="number"
                        step="0.01"
                        name="preco"
                        id="preco"
                        placeholder="0,00"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                                   outline-none focus:border-blue-500
                                   focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

                <div>
                    <label
                        htmlFor="categoria"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Categoria
                    </label>

                    <input
                        type="text"
                        name="categoria"
                        id="categoria"
                        placeholder="Ex: Eletrônicos"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5
                                   outline-none focus:border-blue-500
                                   focus:ring-2 focus:ring-blue-500/20"
                    />
                </div>

            </div>

            <button
                type="submit"
                className="mt-5 w-full rounded-lg bg-blue-600 py-2.5
                           font-semibold text-white transition
                           hover:bg-blue-700
                           active:scale-[0.98]
                           sm:w-auto sm:px-6"
            >
                Cadastrar Produto
            </button>

        </form>
    );
}

export default FormCadastroProd;