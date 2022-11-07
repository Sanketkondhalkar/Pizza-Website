import React, { useEffect, useState } from "react";
import "../Pages/Product.css";

import Childcard from "./Childcard";

const Product = () => {
  const [cart, setcart] = useState([]);
  useEffect(() => {
    fetch("https:ecom-rest-apis.herokuapp.com/api/products/")
      .then((response) => response.json())
      .then((data) => setcart(data));
  }, []);

  return (
    <>
      <div className="product-main">
        {cart.map((item) => {
          return <Childcard value={item} key={item._id} />;
        })}
      </div>
    </>
  );
};

export default Product;
