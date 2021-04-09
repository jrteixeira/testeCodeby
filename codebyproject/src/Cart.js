import React from 'react';
import CartContext from './CartContext';
import { Link } from 'react-router-dom';
import './styles/css/cart.css';
import trash from './images/trash-alt-regular.svg';

const Cart = () => {
  let cart = React.useContext(CartContext);
  const [total, setTotal] = React.useState(null);

  React.useEffect(() => {
    totalCalc(cart.dataCart);
  }, []);

  function totalCalc(data) {
    var precoTotal = 0;
    data.filter((e) => {
      precoTotal = precoTotal + parseFloat(e.newprice) * parseInt(e.QTD);
      precoTotal = parseFloat(precoTotal);
    });
    setTotal(precoTotal.toFixed(2));
  }

  async function productDelete(id) {
    const temp = cart.dataCart.filter((element) => {
      return element.id != id;
    });
    cart.setDataCart(temp);
    totalCalc(temp);
  }
  return (
    <div className="page-cart">
      <nav>
        <h1 className="cart-title">Meu carrinho</h1>
        <Link to="/" className="tooltip">
          Voltar
          <span class="tooltiptext">Continuar comprando</span>
        </Link>
      </nav>
      {cart.dataCart.length != 0 ? (
        <>
          {cart.dataCart.map((products) => {
            return (
              <div className="product-container" key={products.id}>
                <div className="img-container">
                  <img src={products.img} alt="" />
                </div>
                <div className="info-container">
                  <p className="title">{products.name}</p>
                  <p className="old-price">R$ {products.oldprice}</p>
                  <p className="new-price">R$ {products.newprice}</p>
                  <p className="quantity">qtd: {products.QTD}</p>
                  <a
                    className="tooltip"
                    onClick={() => {
                      productDelete(products.id);
                    }}
                  >
                    <img
                      style={{ maxWidth: '20px' }}
                      src={trash}
                      alt="deletar produto"
                    />
                    <span class="tooltiptext">Deletar produto</span>
                  </a>
                </div>
              </div>
            );
          })}
          <footer>
            <div className="absolut-footer-container">
              <div className="footer-container">
                <p style={{ marginLeft: '10px' }}>Total</p>
                <p style={{ marginRight: '10px' }}>R$ {total}</p>
              </div>
              {total > 10 ? (
                <p className="msg">Parabéns, sua compra tem frete grátis!</p>
              ) : (
                ''
              )}
              <button>Finalizar compra</button>
            </div>
          </footer>
        </>
      ) : (
        <p className="msg-empty">Carrinho vazio !</p>
      )}
    </div>
  );
};

export default Cart;
