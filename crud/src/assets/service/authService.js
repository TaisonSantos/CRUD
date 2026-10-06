import { supabase } from "./supabase";


// ==========================================
// CADASTRO
// ==========================================

export async function cadastrarUsuario(email, senha) {

    const { data, error } =
        await supabase.auth.signUp({
            email: email,
            password: senha
        });


    if (error) {

        console.error(
            "Erro ao cadastrar usuário:",
            error
        );

        return {
            sucesso: false,
            erro: error.message
        };

    }


    return {
        sucesso: true,
        data: data
    };

}




export async function fazerLogin(email, senha) {

    const { data, error } =
        await supabase.auth.signInWithPassword({
            email: email,
            password: senha
        });


    if (error) {

        console.error(
            "Erro ao fazer login:",
            error
        );

        return {
            sucesso: false,
            erro: error.message
        };

    }


    return {
        sucesso: true,
        data: data
    };

}



export async function fazerLogout() {

    const { error } =
        await supabase.auth.signOut();


    if (error) {

        console.error(
            "Erro ao sair:",
            error
        );

        return false;

    }


    return true;

}