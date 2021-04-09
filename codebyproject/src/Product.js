import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import cartIcon from './images/shopping-cart-solid.svg';
import './styles/css/product.css';
import CartContext from './CartContext';

const Product = () => {
  const params = useParams();
  const [data, setData] = React.useState(null);
  const [qtd, setQtd] = React.useState('1');
  const cart = React.useContext(CartContext);
  let temp = [
    { id: '', name: '', img: '', newprice: '', oldprice: '', QTD: '' },
  ];
  React.useEffect(async () => {
    fetch('https://jrteixeira.github.io/data/acima-10-reais.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setData(json);
      });
  }, []);

  function addCart() {
    temp[temp.length - 1].QTD = qtd;
    if (cart.dataCart.length != 0) {
      let isEqual = false;
      cart.dataCart.forEach((choc) => {
        if (choc.name == temp[0].name) {
          choc.QTD = parseInt(choc.QTD) + parseInt(temp[0].QTD);
          isEqual = true;
        }
      });
      if (!isEqual) {
        temp = temp.concat(cart.dataCart);
        cart.setDataCart(temp);
      }
    } else {
      cart.setDataCart(temp);
    }
  }

  return (
    <div className="page-products">
      <nav>
        <Link to="/" className="tooltip">
          Voltar
          <span className="tooltiptext">Voltar aos produtos</span>
        </Link>
        <Link to="/cart" style={{ minWidth: '30px' }}>
          <img src={cartIcon} alt="open cart" />
        </Link>
      </nav>
      {data != null
        ? data.items.map((obj) => {
            if (obj.uniqueId == params.id) {
              let Oldprice = obj.price;
              let price = obj.sellingPrice;
              Oldprice = Oldprice.toString();
              price = price.toString();
              if (price[2]) {
                Oldprice = Oldprice[0] + '.' + Oldprice[1] + Oldprice[2];
                price = price[0] + '.' + price[1] + price[2];
              } else {
                Oldprice = Oldprice[0] + '.' + Oldprice[1] + Oldprice[2];
                price = '0.' + price[0] + price[1];
              }

              temp = [
                {
                  id: obj.id,
                  name: obj.name,
                  img: obj.imageUrl,
                  newprice: price,
                  oldprice: Oldprice,
                  QTD: parseInt(qtd),
                },
              ];

              return (
                <div className="product-container" key={obj.id}>
                  <div className="img-container">
                    <img src={obj.imageUrl} alt="" />
                  </div>
                  <div className="info-container">
                    <p className="title">{obj.name}</p>
                    <p className="old-price">R$ {Oldprice}</p>
                    <p className="new-price">R$ {price}</p>
                    <label>Quantidade</label>
                    <input
                      type="number"
                      placeholder="1"
                      min={obj.quantity}
                      onChange={({ target }) => {
                        setQtd(target.value);
                      }}
                      value={qtd}
                    ></input>
                    <Link to="/cart">
                      <button onClick={addCart}>Adicionar ao carrinho</button>
                    </Link>
                  </div>
                </div>
              );
            }
          })
        : ''}
    </div>
  );
};

export default Product;
