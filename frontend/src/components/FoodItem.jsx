import React, { useState } from "react";

function FoodItem({ item, cart, setCart }) {
  const [persons, setPersons] = useState(1);

  const addToCart = () => {
    const existingItem = cart.find((i) => i._id === item._id);
    const newItem = {
      ...item,
      persons,
    };

    if (existingItem) {
      const updatedCart = cart.map((i) =>
        i._id === item._id ? { ...i, persons: i.persons + persons } : i
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  return (
    <div className="food-item">
      <img src={`/images/${item.image}`} alt={item.name} />
      <h3>{item.name}</h3>
      <p>Price: Rs. {item.price}</p>
      <p>Serves: {item.serves} person(s)</p>
      <input
        type="number"
        min="1"
        value={persons}
        onChange={(e) => setPersons(Number(e.target.value))}
      />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default FoodItem;
