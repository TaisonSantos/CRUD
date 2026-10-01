import { useContext } from "react";
import { ProdutoContext } from "../../context/ProdutosContext";
import Card from "./Card";

function ListaProdutos() {

    const { produtos } = useContext(ProdutoContext);

    return (
        <section>
            <h2 className="mb-4 text-xl font-bold text-gray-800 sm:text-2xl">
                Produtos cadastrados
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {produtos.map((produto) => (
                    <Card
                        key={produto.id}
                        produto={produto}
                    />
                ))}
            </div>
        </section>
    );
}

export default ListaProdutos;