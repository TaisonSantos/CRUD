import { supabase } from "./supabase";


// ==========================================
// BUSCAR PRODUTOS DO USUÁRIO LOGADO
// ==========================================

export async function buscarProdutos() {

    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError) {
        console.error("Erro ao buscar usuário:", userError);
        return [];
    }

    if (!user) {
        console.log("Nenhum usuário logado.");
        return [];
    }

    console.log("USUÁRIO BUSCANDO PRODUTOS:", user.id);

    const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("user_id", user.id);

    if (error) {
        console.error("Erro ao buscar produtos:", error);
        return [];
    }

    return data;
}


// ==========================================
// CADASTRAR PRODUTO
// ==========================================

export async function cadastrarProduto(produto) {

    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError) {
        console.error("Erro ao buscar usuário:", userError);
        return null;
    }

    if (!user) {
        throw new Error("Usuário não autenticado");
    }

    console.log("USUÁRIO CADASTRANDO:", user.id);

    const { data, error } = await supabase
        .from("produtos")
        .insert({
            ...produto,
            user_id: user.id
        })
        .select();

    if (error) {
        console.error("Erro ao cadastrar produto:", error);
        return null;
    }

    return data;
}


// ==========================================
// REMOVER PRODUTO
// ==========================================

export async function removerProduto(id) {

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        return false;
    }

    const { error } = await supabase
        .from("produtos")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

    if (error) {
        console.error("Erro ao remover produto:", error);
        return false;
    }

    return true;
}


// ==========================================
// ATUALIZAR PRODUTO
// ==========================================

export async function atualizarProduto(id, produto) {

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        return false;
    }

    console.log("ID RECEBIDO:", id);
    console.log("USUÁRIO ATUAL:", user.id);
    console.log("PRODUTO RECEBIDO:", produto);

    const { data, error } = await supabase
        .from("produtos")
        .update({
            nome: produto.nome,
            quantidade: Number(produto.quantidade),
            preco: Number(produto.preco),
            categoria: produto.categoria
        })
        .eq("id", id)
        .eq("user_id", user.id);

    if (error) {
        console.error("ERRO AO ATUALIZAR:", error);
        return false;
    }

    return true;
}