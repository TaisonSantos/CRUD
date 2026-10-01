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
        console.error(error);
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
