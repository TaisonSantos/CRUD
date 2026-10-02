import { supabase } from "./supabase";


export async function buscarProdutos() {

    const { data, error } = await supabase
        .from("produtos")
        .select("*");

    if (error) {
        console.error("Erro ao buscar produtos:", error);
        return [];
    }

    return data;
}


export async function cadastrarProduto(produto) {

    const { data, error } = await supabase
        .from("produtos")
        .insert(produto)
        .select();

    if (error) {
        console.error("Erro ao cadastrar produto:", error);
        return null;
    }

    return data;
}


export async function removerProduto(id) {

    const { error } = await supabase
        .from("produtos")
        .delete()
        .eq("id", id);

    if (error) {
        console.error("Erro ao remover produto:", error);
        return false;
    }

    return true;
}


export async function atualizarProduto(id, produto) {

    const { data, error } = await supabase
        .from("produtos")
        .update({
            nome: produto.nome,
            quantidade: Number(produto.quantidade),
            preco: Number(produto.preco),
            categoria: produto.categoria
        })
        .eq("id", id)
        .select();

    if (error) {
        console.error("ERRO AO ATUALIZAR:", error);
        return null;
    }

    console.log("PRODUTO ATUALIZADO:", data);

    return data;
}