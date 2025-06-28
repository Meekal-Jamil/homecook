import React, { useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import axios from "axios";
import { API_ENDPOINTS } from '../config/api';
import './Menu.css';

function Menu({ cart, setCart }) {
  const [todayMenu, setTodayMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.MENU);
        setTodayMenu(res.data);
        console.log("Fetched menu:", res.data); 
      } catch (error) {
        console.error('Error fetching menu:', error);
      }
    };

    fetchMenu();
  }, []);

  if (todayMenu.length === 0) {
    return <div>No menu available today.</div>;
  }

  return (
    <div className="menu-grid">
      {todayMenu.map((item) => (
        <FoodItem key={item._id} item={item} cart={cart} setCart={setCart} />
      ))}
    </div>
  );
}

export default Menu;
