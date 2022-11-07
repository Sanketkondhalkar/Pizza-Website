import html2canvas from "html2canvas";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Userdata from "../Userdata";
import "./Cart.css";
import Emptytotal from "./Emptytotal";

const Cart = () => {
  const navigate = useNavigate();
  let total = 0;
  const { cart, setcart } = useContext(Userdata);
  const [product, setproduct] = useState([]);

  useEffect(() => {
    if (!cart.item) {
      return;
    }
    fetch("https://ecom-rest-apis.herokuapp.com/api/products/cart-items", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: Object.keys(cart.item) }),
    })
      .then((res) => res.json())
      .then((data) => setproduct(data));
  }, [product]);

  const increment = (id) => {
    let data = { ...cart };
    data.item[id] += 1;
    data.total += 1;
    setcart(data);
  };

  function ordernow() {
    Swal.fire(
      "Good job!",
      "You have placed the order successfully!",
      "success"
    );
    setcart({});
    html2canvas(document.querySelector("#root"), {
      scrollX: 0,
      scrollY: 0,
    }).then(function (canvas) {
      console.log("object");
      var a = document.createElement("a");
      a.href = canvas
        .toDataURL("..assets/image/jpg")
        .replace("image/jpeg", "image/octet-stream");
      a.download = "somefilename.jpg";
      a.click();
    });
    navigate("/");
  }
  const decerement = (id) => {
    let data = { ...cart };

    if (data.item[id] > 0) {
      data.item[id] -= 1;
      data.total -= 1;
      setcart(data);
    }
  };
  const deletedata = (id) => {
    let data = { ...cart };
    var a = data.item[id];
    delete data.item[id];
    data.total = data.total - a;
    setcart(data);
  };
  const pricedata = (price, id) => {
    let data = { ...cart };
    let b = data.item[id];
    total = total + b * price;
    return b * price;
  };

  const Count = (id) => {
    return cart.item[id];
  };

  return cart.total !== 0 ? (
    <div className="parent">
      {product.map((item) => {
        const { image, name, _id, price } = item;

        return (
          <div className="child" key={_id} style={{ marginTop: "40px" }}>
            <div className="imagedata" style={{ width: "300px" }}>
              <img src={image} alt="" />
              <h2>{name}</h2>
            </div>
            <div className="buttonss" style={{ width: "300px" }}>
              <button className="btn1" onClick={() => decerement(_id)}>
                -
              </button>
              <p className="para">{Count(_id)}</p>
              <button className="btn1" onClick={() => increment(_id)}>
                +
              </button>
            </div>
            <div className="price" style={{ width: "300px" }}>
              <p>
                <b>$</b>
                {pricedata(price, _id)}
                {/* {price * cart.item[_id]} */}
              </p>
            </div>
            <div className="delete" style={{ width: "300px" }}>
              <button onClick={() => deletedata(_id)}>delete</button>
            </div>
          </div>
        );
      })}
      <hr style={{ width: "100%", marginTop: "20px" }} />
      <div
        className="data2"
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row-reverse",
        }}
      >
        <h1 style={{ float: "right" }}>Total:${total ? total : "Loading.."}</h1>
      </div>
      <div
        className="data2"
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row-reverse",
        }}
      >
        <button className="btn" style={{ float: "right" }} onClick={ordernow}>
          Order Now
        </button>
      </div>
    </div>
  ) : (
    <div style={{ heigt: "100vh", width: "100vw" }}>
      <img
        src="images/empty-cart.png"
        className="demo1"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
};

export default Cart;
