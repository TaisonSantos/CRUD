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

        const produtosBanco = await buscarProdutos();

        setProdutos(produtosBanco);
    }


    // ==========================================
    // CADASTRAR
    // ==========================================

    async function cadastrarProduto(produto) {

        const produtoCadastrado =
            await cadastrarProdutoService(produto);

        if (produtoCadastrado) {
            await carregarProdutos();
        }
    }


    // ==========================================
    // REMOVER
    // ==========================================

    async function removerProduto(id) {

        const sucesso =
            await removerProdutoService(id);

        if (sucesso) {
            await carregarProdutos();
        }
    }


    // ==========================================
    // OBSERVAR LOGIN / LOGOUT
    // ==========================================

    useEffect(() => {

        // Carrega inicialmente
        carregarProdutos();


        // Fica observando mudanças de autenticação
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


        // Limpa o listener
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