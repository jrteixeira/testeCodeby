import { Link } from 'react-router-dom';
import React from 'react';
import cartIcon from './images/shopping-cart-solid.svg';
import CartContext from './CartContext';

const Home = () => {
  const [data, setData] = React.useState(null);
  const cart = React.useContext(CartContext);
  React.useEffect(async () => {
    fetch('https://jrteixeira.github.io/data/acima-10-reais.json')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setData(json);
      });
  }, []);
  return (
    <div className="page-home">
      <nav>
        <h1 className="Title-page">Produtos Disponiveis</h1>
        <Link to="cart" style={{ minWidth: '30px' }}>
          <img src={cartIcon} alt="open cart" />
        </Link>
      </nav>
      {data ? (
        <div className="teste">
          {data.items.map((obj) => {
            let Oldprice = obj.price;
            let price = obj.sellingPrice;
            Oldprice = Oldprice.toString();
            price = price.toString();
            if (price[2]) {
              Oldprice = Oldprice[0] + ',' + Oldprice[1] + Oldprice[2];
              price = price[0] + ',' + price[1] + price[2];
            } else {
              Oldprice = Oldprice[0] + ',' + Oldprice[1] + Oldprice[2];
              price = '0,' + price[0] + price[1];
            }

            return (
              <div className="product-container" key={obj.id}>
                <div className="img-container">
                  <Link to={`product/` + obj.uniqueId}>
                    <img src={obj.imageUrl} alt="" />
                  </Link>
                </div>
                <div className="info-container">
                  <p className="title">
                    <Link to={`product/` + obj.uniqueId}>{obj.name}</Link>
                  </p>
                  <p className="old-price">R$ {Oldprice}</p>
                  <p className="new-price">R$ {price}</p>
                  <Link to={`product/` + obj.uniqueId}>
                    <button>comprar</button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Home;
