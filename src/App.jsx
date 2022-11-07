import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Product from "./Pages/Product";
import Navbar from "./Component/Navbar";
import Singlepizza from "./Pages/Singlepizza";
import Cart from "./Pages/Cart";
import Userdata from "./Userdata";
import { useState } from "react";
import Loginform from "./Form/Loginform";

function App() {
  const [success, setsuccess] = useState(false);
  const [data, setdata] = useState(true);
  const [loginsuccess, setloginsuccess] = useState(true);
  const [cart, setcart] = useState({ item: {}, total: 0 });
  const [logindata, setlogindata] = useState({});

  // console.log(loginsuccess);
  // console.log(success);
  return (
    <>
      <Userdata.Provider
        value={{
          cart,
          setcart,
          logindata,
          setlogindata,
          setloginsuccess,
          data,
          setdata,
          setsuccess,
        }}
      >
        <BrowserRouter>
          {success && <Navbar />}
          <Routes>
            {loginsuccess && <Route path="/" element={<Loginform />}></Route>}
            {success && <Route path="/" element={<Home />}></Route>}
            {success && <Route path="/product" element={<Product />}></Route>}
            {success && (
              <Route path="/singlepizza/:id" element={<Singlepizza />}></Route>
            )}
            {success && <Route path="/cart" element={<Cart />}></Route>}
          </Routes>
        </BrowserRouter>
      </Userdata.Provider>
    </>
  );
}

export default App;
