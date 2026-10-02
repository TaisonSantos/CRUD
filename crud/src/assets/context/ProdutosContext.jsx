import {
    createContext,
    useEffect,
    useState
} from "react";

import {
    buscarProdutos,
    cadastrarProduto as cadastrarProdutoService,
    removerProduto as removerProdutoService,
    atualizarProduto as atualizarProdutoService
} from "../service/produtosService";


export const ProdutoContext = createContext();


export function ProdutosProvider({ children }) {

    const [produtos, setProdutos] = useState([]);


    async function carregarProdutos() {

        const produtosBanco = await buscarProdutos();

        setProdutos(produtosBanco);
    }


    async function cadastrarProduto(produto) {

        const produtoCadastrado =
            await cadastrarProdutoService(produto);

        if (produtoCadastrado) {
            await carregarProdutos();
        }
    }


    async function removerProduto(id) {

        const sucesso =
            await removerProdutoService(id);

        if (sucesso) {
            await carregarProdutos();
        }
    }


    async function atualizarProduto(id, produto) {

        const produtoAtualizado =
            await atualizarProdutoService(id, produto);
    
        if (!produtoAtualizado) {
            return false;
        }
    
        await carregarProdutos();
    
        return true;
    }


    useEffect(() => {
        carregarProdutos();
    }, []);


    return (
        <ProdutoContext.Provider
            value={{
                produtos,
                carregarProdutos,
                cadastrarProduto,
                removerProduto,
                atualizarProduto
            }}
        >
            {children}
        </ProdutoContext.Provider>
    );
}