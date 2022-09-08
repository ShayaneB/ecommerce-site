import React, { useState, useEffect } from "react";
import "./product.css";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [currency, setCurrency] = useState("MYR");

  const getData = () => {
    fetch("../JSON/productlist.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (prodList) {
        setData(prodList);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  function handleChange(type) {
    if (type.value === "Malaysia") setCurrency("MYR");
    if (type.value === "Singapore") {
      setCurrency("SGD");
    }
  }

  return (
    <>
      <Header />
      <div className="product-list-card">
        {data &&
          data.length > 0 &&
          data.map((item) => (
            <Link to={"/product-description/" + item.id}>
              <div key={item.id}>
                <div className="product-card">
                  <img className="product-img" src={item.image} alt="product" />
                  <div >{item.name}</div>
                  <div>
                    {currency}{" "}
                    {currency === "MYR" ? item.myrprice : item.sgdprice}
                  </div>
                </div>
              </div>
            </Link>
          ))}
      </div>
      <Footer handleChange={handleChange} currency={currency} />
    </>
  );
};

export default ProductList;
