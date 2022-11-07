import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Userdata from "../Userdata";

const Navbar = (props) => {
  const { cart, setsuccess, setloginsuccess } = useContext(Userdata);

  function logout() {
    setloginsuccess(true);
    setsuccess(false);
  }

  return (
    <>
      <div className="Navbar">
        <div className="left-div">
          <Link to="/">
            <img src="images/logo.png" alt="" height="76px" />
          </Link>
        </div>
        <div className="right-div">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/product">Product</Link>
            </li>
            <li>
              <Link to="/cart">
                <p style={{ color: "white" }}>
                  {cart?.total}
                  <b style={{ marginLeft: "10px" }}>🛒</b>
                </p>
              </Link>
            </li>
            <li>
              <button className="btn1" onClick={logout}>
                <b style={{ color: "white" }}>Logout</b>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
