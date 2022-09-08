import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Header from "./common/Header";
import Footer from "./common/Footer";
import { useParams } from "react-router-dom";

const ProductDesc = () => {
  const [data, setData] = useState({});
  const [currency, setCurrency] = useState("MYR");
  const [btnClicked, setBtnClicked] = useState(false);

  const params = useParams();

  //Setting the store_id, auth token and product price, as per currency
  let storeId = currency === "MYR" ? "MY-S-3B7VWDJVBTDR" : "SG-S-NPQPBAWN2N6J";
  let productPrice = currency === "MYR" ? data.myrprice : data.sgdprice;
  const token =
    currency === "MYR"
      ? "ClNI1Q9LujtJUlOqF8taVQyz1OHiewgkxa8cVZLt"
      : "cEYwXkM6upcfgbC7ZP8vA9ZOMbnAkk3T3pPjMYM5";

  //Function to load the JSON data.
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
        prodList.filter((res) => {
          if (res.id == params.id) {
            setData(res);
          }
        });
      });
  };

  useEffect(() => {
    getData();
  }, []);
  //Function to handle the button click and update the state as true
  function handleClick() {
    setBtnClicked(true);
  }

  //API payload data
  const payload = {
    amount: productPrice,
    redirect_url: "https://demo.ablr.com/checkout/success",
    store_id: storeId,
  };

  //API call
  useEffect(() => {
    btnClicked === true &&
      axios
        .post(
          "https://api.uat.ablr.com/api/v2/public/merchant/checkout/",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setBtnClicked(false);
          window.location.replace(`${response.data.data.checkout_url}`);
          console.log(response.data.data.checkout_url);
        })
        .catch((error) => {
          setBtnClicked(false);
          console.log(error);
        });
  }, [btnClicked]);

  //Function to handle the country change and accordingly changes the currency
  function handleChange(type) {
    if (type.value === "Malaysia") setCurrency("MYR");
    if (type.value === "Singapore") {
      setCurrency("SGD");
    }
  }

  return (
    <>
      <Header />
      <div className="product-desc-body">
        <div className="product-desc">
          <div className="product-title">
            <h1>{data.name}</h1>
            <div className="product-review">
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
              <FontAwesomeIcon icon={faStar} />
            </div>
          </div>
          <div className="product-curr">
            {currency} {currency === "MYR" ? data.myrprice : data.sgdprice}
          </div>
          <div className="product-desc-text">{data.description}</div>
          <button type="submit" onClick={handleClick}>
            Checkout with Ablr
          </button>
        </div>
        <div className="product-image">
          <img className="img-desc" src={data.image} alt="product" />
        </div>
      </div>
      <Footer handleChange={handleChange} currency={currency} />
    </>
  );
};

export default ProductDesc;
