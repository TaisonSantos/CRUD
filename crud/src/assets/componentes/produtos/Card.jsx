import { useContext, useState } from "react";
import { ProdutoContext } from "../../context/ProdutosContext";

function Card({ produto }) {

    const {
        removerProduto,
        atualizarProduto
    } = useContext(ProdutoContext);


    const {
        id,
        nome,
        quantidade,
        preco,
        categoria
    } = produto;


    const [editando, setEditando] = useState(false);


    const [form, setForm] = useState({
        nome: nome,
        quantidade: quantidade,
        preco: preco,
        categoria: categoria
    });


    function alterarCampo(event) {

        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });

    }


    async function salvarAlteracao(event) {

        event.preventDefault();


        const produtoAtualizado = {
            nome: form.nome.trim(),
            quantidade: Number(form.quantidade),
            preco: Number(form.preco),
            categoria: form.categoria.trim()
        };


        if (!produtoAtualizado.nome) {
            alert("Digite o nome do produto");
            return;
        }


        if (produtoAtualizado.quantidade <= 0) {
            alert("A quantidade deve ser maior que zero");
            return;
        }


        if (produtoAtualizado.preco <= 0) {
            alert("O preço deve ser maior que zero");
            return;
        }


        if (!produtoAtualizado.categoria) {
            alert("Digite a categoria");
            return;
        }


        await atualizarProduto(
            id,
            produtoAtualizado
        );


        setEditando(false);

    }


    function cancelarEdicao() {

        setForm({
            nome: nome,
            quantidade: quantidade,
            preco: preco,
            categoria: categoria
        });

        setEditando(false);

    }


    return (

        <article
            className="rounded-xl bg-white p-4 shadow-md
                       transition hover:shadow-lg sm:p-5"
        >

            {!editando ? (

                /* =========================
                   MODO VISUALIZAÇÃO
                ========================= */

                <>

                    <div className="mb-4 flex items-start justify-between gap-3">

                        <h3 className="text-lg font-bold text-gray-800">
                            {nome}
                        </h3>


                        <span
                            className="shrink-0 rounded-full bg-cyan-100
                                       px-2.5 py-1 text-xs font-semibold
                                       text-cyan-700"
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

                            {Number(preco).toLocaleString(
                                "pt-BR",
                                {
                                    style: "currency",
                                    currency: "BRL"
                                }
                            )}

                        </p>

                    </div>


                    {/* EDITAR */}

                    <button
                        onClick={() => setEditando(true)}
                        type="button"
                        className="mt-5 w-full rounded-lg
                                   bg-cyan-500 py-2.5
                                   text-sm font-semibold text-white
                                   transition hover:bg-cyan-600
                                   active:scale-[0.98]"
                    >
                        Editar
                    </button>


                    {/* REMOVER */}

                    <button
                        onClick={() => removerProduto(id)}
                        type="button"
                        className="mt-3 w-full rounded-lg
                                   bg-red-600 py-2.5
                                   text-sm font-semibold text-white
                                   transition hover:bg-red-700
                                   active:scale-[0.98]"
                    >
                        Remover
                    </button>

                </>

            ) : (

                /* =========================
                   MODO EDIÇÃO
                ========================= */

                <form onSubmit={salvarAlteracao}>

                    <h3 className="mb-4 text-lg font-bold text-gray-800">
                        Editar produto
                    </h3>


                    {/* NOME */}

                    <div className="mb-3">

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Nome
                        </label>

                        <input
                            type="text"
                            name="nome"
                            value={form.nome}
                            onChange={alterarCampo}
                            className="w-full rounded-lg border
                                       border-gray-300 px-3 py-2
                                       outline-none
                                       focus:border-cyan-500
                                       focus:ring-2
                                       focus:ring-cyan-500/20"
                        />

                    </div>


                    {/* QUANTIDADE */}

                    <div className="mb-3">

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Quantidade
                        </label>

                        <input
                            type="number"
                            name="quantidade"
                            value={form.quantidade}
                            onChange={alterarCampo}
                            min="1"
                            className="w-full rounded-lg border
                                       border-gray-300 px-3 py-2
                                       outline-none
                                       focus:border-cyan-500
                                       focus:ring-2
                                       focus:ring-cyan-500/20"
                        />

                    </div>


                    {/* PREÇO */}

                    <div className="mb-3">

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Preço
                        </label>

                        <input
                            type="number"
                            name="preco"
                            value={form.preco}
                            onChange={alterarCampo}
                            step="0.01"
                            min="0.01"
                            className="w-full rounded-lg border
                                       border-gray-300 px-3 py-2
                                       outline-none
                                       focus:border-cyan-500
                                       focus:ring-2
                                       focus:ring-cyan-500/20"
                        />

                    </div>


                    {/* CATEGORIA */}

                    <div className="mb-4">

                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Categoria
                        </label>

                        <input
                            type="text"
                            name="categoria"
                            value={form.categoria}
                            onChange={alterarCampo}
                            className="w-full rounded-lg border
                                       border-gray-300 px-3 py-2
                                       outline-none
                                       focus:border-cyan-500
                                       focus:ring-2
                                       focus:ring-cyan-500/20"
                        />

                    </div>


                    {/* SALVAR */}

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-green-600
                                   py-2.5 text-sm font-semibold
                                   text-white transition
                                   hover:bg-green-700
                                   active:scale-[0.98]"
                    >
                        Salvar alterações
                    </button>


                    {/* CANCELAR */}

                    <button
                        type="button"
                        onClick={cancelarEdicao}
                        className="mt-3 w-full rounded-lg
                                   bg-gray-200 py-2.5
                                   text-sm font-semibold text-gray-700
                                   transition hover:bg-gray-300
                                   active:scale-[0.98]"
                    >
                        Cancelar
                    </button>

                </form>

            )}

        </article>
    );
}

export default Card;