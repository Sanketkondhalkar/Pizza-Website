import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Product from "./Product";

const Home = () => {
  return (
    <>
      <div className="home-div">
        <div className="home-right">
          <div className="right">
            <h2>
              Its not just a Pizza ,<span>It's An Experience</span>
            </h2>
            <h3>Less Wating ,More Eating</h3>
            <Link to="/product">
              <button className="btn">Order Now</button>
            </Link>
          </div>
        </div>
        <div className="home-left">
          <div className="left">
            <img src="images/pizza.png" className="image_rotate" alt="" />
          </div>
        </div>
      </div>
      <Product />
    </>
  );
};

export default Home;
