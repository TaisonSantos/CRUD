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


    // ==========================================
    // ALTERAR CAMPO
    // ==========================================

    function alterarCampo(event) {

        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });

    }


    // ==========================================
    // SALVAR ALTERAÇÃO
    // ==========================================

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


        const sucesso = await atualizarProduto(
            id,
            produtoAtualizado
        );


        if (sucesso) {
            setEditando(false);
        } else {
            alert("Erro ao atualizar o produto.");
        }

    }


    // ==========================================
    // CANCELAR
    // ==========================================

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

        <article className="self-start rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 transition duration-200 hover:-translate-y-1 hover:shadow-lg">

            {!editando ? (

                <>

                    {/* CABEÇALHO */}

                    <div className="mb-5 flex items-start justify-between gap-4">

                        <div className="min-w-0">

                            <h3 className="truncate text-xl font-bold text-gray-800">
                                {nome}
                            </h3>

                            <p className="mt-1 text-xs text-gray-400">
                                Produto #{id}
                            </p>

                        </div>


                        <span className="shrink-0 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
                            {categoria}
                        </span>

                    </div>


                    {/* INFORMAÇÕES */}

                    <div className="space-y-3">

                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">

                            <span className="text-sm text-gray-500">
                                Quantidade
                            </span>

                            <strong className="text-sm font-semibold text-gray-800">
                                {quantidade}
                            </strong>

                        </div>


                        <div className="flex items-center justify-between">

                            <span className="text-sm text-gray-500">
                                Preço
                            </span>

                            <strong className="text-base font-bold text-gray-800">

                                {Number(preco).toLocaleString(
                                    "pt-BR",
                                    {
                                        style: "currency",
                                        currency: "BRL"
                                    }
                                )}

                            </strong>

                        </div>

                    </div>


                    {/* BOTÕES */}

                    <div className="mt-5 grid grid-cols-2 gap-3">

                        <button
                            onClick={() => setEditando(true)}
                            type="button"
                            className="rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600 active:scale-[0.98]"
                        >
                            Editar
                        </button>


                        <button
                            onClick={() => removerProduto(id)}
                            type="button"
                            className="rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600 active:scale-[0.98]"
                        >
                            Remover
                        </button>

                    </div>

                </>

            ) : (

                <form onSubmit={salvarAlteracao}>

                    {/* TÍTULO */}

                    <div className="mb-5">

                        <h3 className="text-xl font-bold text-gray-800">
                            Editar produto
                        </h3>

                        <p className="mt-1 text-xs text-gray-400">
                            Atualize as informações do produto
                        </p>

                    </div>


                    {/* NOME */}

                    <div className="mb-4">

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Nome
                        </label>

                        <input
                            type="text"
                            name="nome"
                            value={form.nome}
                            onChange={alterarCampo}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />

                    </div>


                    {/* QUANTIDADE */}

                    <div className="mb-4">

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Quantidade
                        </label>

                        <input
                            type="number"
                            name="quantidade"
                            value={form.quantidade}
                            onChange={alterarCampo}
                            min="1"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />

                    </div>


                    {/* PREÇO */}

                    <div className="mb-4">

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Preço
                        </label>

                        <input
                            type="number"
                            name="preco"
                            value={form.preco}
                            onChange={alterarCampo}
                            step="0.01"
                            min="0.01"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />

                    </div>


                    {/* CATEGORIA */}

                    <div className="mb-5">

                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                            Categoria
                        </label>

                        <input
                            type="text"
                            name="categoria"
                            value={form.categoria}
                            onChange={alterarCampo}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                        />

                    </div>


                    {/* BOTÕES */}

                    <div className="grid grid-cols-2 gap-3">

                        <button
                            type="submit"
                            className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-[0.98]"
                        >
                            Salvar
                        </button>


                        <button
                            type="button"
                            onClick={cancelarEdicao}
                            className="rounded-lg bg-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-300 active:scale-[0.98]"
                        >
                            Cancelar
                        </button>

                    </div>

                </form>

            )}

        </article>

    );
}


export default Card;