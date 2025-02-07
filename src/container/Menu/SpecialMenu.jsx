import React from "react";
import { SubHeading, MenuItem } from "../../components";
import { data, images } from "../../constants";
import "./SpecialMenu.css";
import Axios, { setCartItems } from "./../../Axios";
import toast from "react-hot-toast";
const SpecialMenu = ({ items, setCart }) => {
  const addToCart = async (id) => {
    try {
      const response = await Axios.post("/cart/add", {
        id: id,
        quantity: 1,
      });
      if (response.data.success) {
        setCartItems(response.data.content)
        setCart(response.data.content);
        toast.success(response.data.message);
        return;
      }
      toast.error(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="app__specialMenu flex__center section__padding" id="menu">
      <div className="app__specialMenu-title">
        <SubHeading title="Menu that fits your palatte" />
        <h1 className="headtext__cormorant">Today&apos;s Special</h1>
      </div>

      <div className="app__specialMenu-menu">
        <div className="app__specialMenu-menu_wine  flex__center">
          <p className="app__specialMenu-menu_heading">Wine & Beer</p>
          <div className="app__specialMenu_menu_items">
            {items.map((item) => (
              <MenuItem
                addToCart={addToCart}
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                tags={["Hello Tag", "Hello Tag", "Hello Tag"]}
              />
            ))}
          </div>
        </div>

        <div className="app__specialMenu-menu_img">
          <img src={images.menu} alt="menu__img" />
        </div>

        <div className="app__specialMenu-menu_cocktails  flex__center">
          <p className="app__specialMenu-menu_heading">Cocktails</p>
          <div className="app__specialMenu_menu_items">
            {data.cocktails.map((cocktail, index) => (
              <MenuItem
                key={cocktail.title.replace("", "-") + index}
                title={cocktail.title}
                price={cocktail.price}
                tags={cocktail.tags}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 15 }}>
        <button type="button" className="custom__button">
          View More
        </button>
      </div>
    </div>
  );
};
export default SpecialMenu;
