function Card({ produto }) {

    const {
        nome,
        quantidade,
        preco,
        categoria
    } = produto;

    return (
        <div>
            <h3>{nome}</h3>

            <p>Quantidade: {quantidade}</p>

            <p>Preço: R$ {preco}</p>

            <p>Categoria: {categoria}</p>
        </div>
    );
}

export default Card;