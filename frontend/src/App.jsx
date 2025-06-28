import React, { useState } from "react";
import Menu from './components/Menu';
import Checkout from './components/Checkout';
import "./styles.css";

function App() {
  const [cart, setCart] = useState([]);

  return (
    <div className="App">
      <h1>HomeCook (Saaf or Susheel Khana)</h1>
      {}
      <Menu cart={cart} setCart={setCart} />
      
      {}
      <Checkout cart={cart} setCart={setCart} />
    </div>
  );
}

export default App;
