import { buscarProdutos } from "../service/produtosService";
import { useEffect, useState } from "react";
import Card from "./Card";

function ListaProdutos() {

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {

        async function carregarProduto() {

            const produtoSupa = await buscarProdutos();

            setProdutos(produtoSupa);
        }

        carregarProduto();

    }, []);

    return (
        <div>

            <h2>Produtos</h2>

            {produtos.map((produto) => (
                <Card
                    key={produto.id}
                    produto={produto}
                />
            ))}

        </div>
    );
}

export default ListaProdutos;