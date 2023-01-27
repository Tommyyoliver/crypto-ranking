import "./assets/output.css";
import { useEffect, useState } from "react";
import logo from "./assets/logo.png";
import logoCrypto from "../public/logo-crypto.png";
function App() {

  const [cryptos, setCryptos] = useState([]);

  const apiFetch = async() => { 
    const api = await fetch("https://api.coingecko.com/api/v3/coins");
    const data = await api.json();
    setCryptos(data);
  }

  useEffect(()=> {
    apiFetch();
  }, [])

  return (
    <div className="App">
      <h2>Crypto Ranking</h2>
      {cryptos.length === 0 ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
      <div className="table">
        <div className="head">
          <div className="rank"><h3>RANGO</h3></div>
          <div className="name"><h3>NOMBRE</h3></div>
          <div className="symbol"><h3>SIMBOLO</h3></div>
          <div className="priceDay"><h3>PRECIO 24HS</h3></div>
        </div>
        <div className="body">
          {cryptos.map(crypto => (
            <div key={crypto.id} className="money">
              <div className="money-rank">{crypto.market_data.market_cap_rank}</div>
              <div className="money-name"><img src={crypto.image.small} alt="icon" />{crypto.name}</div>
              <div className="money-symbol">{crypto.symbol}</div>
              <div className="money-price">
                <div>{crypto.market_data.current_price.bmd.toFixed(2)}</div>
                {crypto.market_data.price_change_24h < 0 ? (
                  <div className="negative">{crypto.market_data.price_change_24h}</div>
                ) : (
                  <div className="positive">{crypto.market_data.price_change_24h}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      )}
      <footer>
        <div>
          <a href="https://tommyyoliver.github.io/portfolio/" target="_blank">
            <img src={logo} alt="logo" />
          </a>
          <img src={logoCrypto} alt="logo-crypto" />
        </div>
        <p>Tommy Oliver - 2023</p>
        <div className="footer-colors">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </footer>
    </div>
  )
}

export default App
