import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Pages/Singlepizza.css";
import Userdata from "../Userdata";
import "./Productbutton";

const Singlepizza = () => {
  const [singlepizza, setsinglepizza] = useState([]);
  const [buttonText, setButtonText] = useState("Add to cart");
  const { cart, setcart } = useContext(Userdata);
  console.log(cart.item);

  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    fetch(` https://ecom-rest-apis.herokuapp.com/api/products/${id}`)
      .then((Response) => Response.json())
      .then((data) => setsinglepizza(data));
  }, []);
  const demo = () => {
    setButtonText("Added😍!");
    setTimeout(() => {
      setButtonText("Add to cart");
    }, 1000);
    console.log(id);
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
    <div className="main">
      <Link to="/product">
        <button className="btn demo">↩back</button>
      </Link>
      <div className="flexbox">
        <div className="flexbox-image">
          <img src={singlepizza.image} alt="" />
        </div>
        <div className="flexbox-data">
          <h1>{singlepizza.name}</h1>
          <p>
            Pizza is a dish of Italian origin consisting of a usually round,
            flat base of leavened wheat-based dough topped with tomatoes,
            cheese, and often various other ingredients, which is then baked at
            a high temperature, traditionally in a wood-fired oven. A small
            pizza is sometimes called a pizzetta
          </p>

          {/* <h3>Size:regular/medium/large/extra large </h3> */}
          <h3>Size:{singlepizza.size}</h3>

          <div className="flexbox-button">
            <p>
              <strong>$</strong>
              {singlepizza.price}
            </p>
            <button
              style={{
                backgroundColor:
                  buttonText === "Added😍!" ? "green" : "orangered",
              }}
              onClick={() => demo(singlepizza.id)}
            >
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Singlepizza;
