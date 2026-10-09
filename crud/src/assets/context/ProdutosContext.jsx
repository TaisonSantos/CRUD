import {
    createContext,
    useEffect,
    useState
} from "react";

import { supabase } from "../service/supabase";

import {
    buscarProdutos,
    cadastrarProduto as cadastrarProdutoService,
    removerProduto as removerProdutoService
} from "../service/produtosService";


export const ProdutoContext = createContext();


export function ProdutosProvider({ children }) {

    const [produtos, setProdutos] = useState([]);


    // ==========================================
    // CARREGAR PRODUTOS
    // ==========================================

    async function carregarProdutos() {

        const produtosBanco =
            await buscarProdutos();

        setProdutos(produtosBanco);
    }


    // ==========================================
    // CADASTRAR
    // ==========================================

    async function cadastrarProduto(produto) {

        const produtoCadastrado =
            await cadastrarProdutoService(produto);


        if (!produtoCadastrado) {

            return {
                sucesso: false
            };

        }


        await carregarProdutos();


        return {
            sucesso: true,
            produto: produtoCadastrado
        };

    }


    // ==========================================
    // REMOVER
    // ==========================================

    async function removerProduto(id) {

        const sucesso =
            await removerProdutoService(id);


        if (!sucesso) {

            return {
                sucesso: false
            };

        }


        await carregarProdutos();


        return {
            sucesso: true
        };

    }


    // ==========================================
    // OBSERVAR LOGIN / LOGOUT
    // ==========================================

    useEffect(() => {

        // Carrega inicialmente
        carregarProdutos();


        // Observa mudanças de autenticação
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(
            async (event, session) => {

                console.log("AUTH:", event);


                if (session?.user) {

                    console.log(
                        "NOVO USUÁRIO:",
                        session.user.id
                    );


                    await carregarProdutos();

                } else {

                    // Usuário saiu
                    setProdutos([]);

                }

            }
        );


        // Limpa listener
        return () => {

            subscription.unsubscribe();

        };

    }, []);


    return (

        <ProdutoContext.Provider
            value={{
                produtos,
                carregarProdutos,
                cadastrarProduto,
                removerProduto
            }}
        >

            {children}

        </ProdutoContext.Provider>

    );

}