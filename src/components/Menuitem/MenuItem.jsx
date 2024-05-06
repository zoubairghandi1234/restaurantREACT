import React from "react";

import "./MenuItem.css";

const MenuItem = ({ id,title, price, tags, addToCart }) => (
  <div className="app__menuitem">
    <div className="app__menuitem-head">
      <div className="app__menuitem-name">
        <p className="p__cormorant" style={{ color: "#DCCA87" }}>
          {title}
        </p>
      </div>
      <div className="app__menuitem-dash" />
      <div className="app__menuitem-price">
        <p className="p__cormorant">{price}</p>
      </div>
    </div>

    <div className="app__menuitem-sub">
      <p className="p__opensans" style={{ color: "#AAAAAA", marginBottom: 0 }}>
        {tags}
      </p>
      <p
      onClick={()=> addToCart(id)}
        style={{
          color: "#fff",
          fontSize: 14,
          background: "#e74c3c40",
          display: "inline-block",
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 7,
          paddingTop: 7,
          borderRadius: 5,
          cursor: "pointer",
        }}
      >
        Add To Cart
      </p>
    </div>
  </div>
);

export default MenuItem;
