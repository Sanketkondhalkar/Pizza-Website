import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Userdata from "../Userdata";

const Childcard = (prop) => {
  const [buttonText, setButtonText] = useState("Add to cart");
  const { cart, setcart } = useContext(Userdata);
  const { image, price, name, size, _id } = prop.value;
  const demo = (id) => {
    setButtonText("Added😍!");
    setTimeout(() => {
      setButtonText("Add to cart");
    }, 1000);

    const data = { ...cart };
    if (!data.item) {
      data.item = {};
    }
    if (data.item[id]) {
      data.item[id] += 1;
    } else {
      data.item[id] = 1;
    }

    if (!data.total) {
      data.total = 0;
    }
    data.total += 1;
    setcart(data);
  };

  return (
    <div className="card">
      <Link to={`/singlepizza/${_id}`}>
        <div className="card-image">
          <img src={image} className="product-image image_rotate " alt="" />
        </div>
        <div className="card-info">
          <h3>{name}</h3>
          <p>
            <span>{size}</span>
          </p>
        </div>
      </Link>
      <div className="card-value">
        <p>
          <b>$</b>
          {price}
        </p>
        <button
          style={{
            backgroundColor: buttonText === "Added😍!" ? "green" : "orangered",
          }}
          onClick={() => demo(_id)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Childcard;
