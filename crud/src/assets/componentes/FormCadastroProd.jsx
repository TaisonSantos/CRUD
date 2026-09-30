import { cadastrarProduto } from "../service/produtosService";

function FormCadastroProd() {

    async function enviarDados(event) {

        event.preventDefault();

        const form = event.target;

        const produto = {
            nome: form.nome.value.trim(),
            quantidade: Number(form.quantidade.value),
            preco: Number(form.preco.value),
            categoria: form.categoria.value.trim()
        };

        // VALIDAÇÕES

        if (!produto.nome) {
            alert("Digite o nome do produto");
            return;
        }

        if (produto.quantidade <= 0) {
            alert("A quantidade deve ser maior que zero");
            return;
        }

        if (produto.preco <= 0) {
            alert("O preço deve ser maior que zero");
            return;
        }

        if (!produto.categoria) {
            alert("Digite a categoria");
            return;
        }

        await cadastrarProduto(produto);

        alert("Produto cadastrado!");

        form.reset();
    }

    return (
        <form onSubmit={enviarDados}>

            <div>
                <label htmlFor="nome">Nome:</label>
                <input
                    type="text"
                    name="nome"
                    id="nome"
                />
            </div>

            <div>
                <label htmlFor="quantidade">Quantidade:</label>
                <input
                    type="number"
                    name="quantidade"
                    id="quantidade"
                />
            </div>

            <div>
                <label htmlFor="preco">Preço:</label>
                <input
                    type="number"
                    name="preco"
                    id="preco"
                />
            </div>

            <div>
                <label htmlFor="categoria">Categoria:</label>
                <input
                    type="text"
                    name="categoria"
                    id="categoria"
                />
            </div>

            <button type="submit">
                Cadastrar
            </button>

        </form>
    );
}

export default FormCadastroProd;