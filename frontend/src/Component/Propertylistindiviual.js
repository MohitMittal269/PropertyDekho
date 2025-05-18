import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Css/Propertylist.css";
import { useSelector } from "react-redux";
import { ThemeContext } from "./Themecontext";
import useAuth from "./Hooks/useAuth";
function Propertylistindiviual({
  propertyDetails,
  isInWhishlist = false,
  remove,
}) {
  const{increase,decrease}=useContext(ThemeContext);
  const [cartItems, setCartItems] = useState([]);
  //const { userid } = useSelector((state) => state.auth);
    const{user}=useAuth();
    console.log("user from propertyindiviual",user);
    
    const userid=user?.userId;
  const navigate = useNavigate();

  const addToCart = (productId) => {
    console.log("propertydetail", productId, userid);
    fetch("http://localhost:5000/addToWhislist", {
      method: "post",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userid, productId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          setCartItems((prev) => [...prev, productId]);
          increase();
        }
      })
      .catch((error) => {
        console.log("data come from api error " + error);
      });
  };
  const handleCartButton = async (productId) => {
    if (isInWhishlist) {
      const res = await fetch("http://localhost:5000/removecart", {
        method: "delete",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          userId: userid,
        }),
      });
      const data = await res.json();
      if (data.deletedDocument) {
        remove(data.deletedDocument?.productId);
        decrease();
      }
      return;
    }
    if (cartItems.includes(productId)) {
      navigate(`/whislist/${userid}`);
    } else {
      addToCart(productId);
    }
  };
  const viewdetail = (id) => {
    navigate(`/property/${id}`);
  };
  useEffect(() => {
    if(!userid){
      setCartItems([]);
    }
 
    fetch("http://localhost:5000/addToWhislist", {
      method: "GET",
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          data.forEach((cart) => {
            if (cart.userId === userid) {
              setCartItems((prev) => [...prev, cart.productId]);
            }
          });
          console.log(data);
        }
    
      
      })
      .catch((err) => {
        console.log("error for frontend cart fetchrequest", err);
      });
  }, [userid]);
  return (
    <>
      {!!propertyDetails?.length ? (
        <div className="property-container">
          {Array.isArray(propertyDetails) &&
            propertyDetails.map((property, index) => {
              return (
                <div key={index} className="property-card">
                  <div className="property-img">
                    <img
                      src={`http://localhost:5000/uploads/${property.images[0]}`}
                      alt="not found"
                      className="property-img__img"
                    ></img>
                  </div>
                  <div className="property-detail">
                    <div className="property-location">
                      <img
                        src="/image/location.png"
                        style={{ height: "20px", width: "15px" }}
                        className="property-icon"
                      ></img>
                      <span>
                        {" "}
                        {property.location.housearea},
                        {property.location.landmark},{property.location.city},
                        {property.location.state},{property.location.zipcode}
                      </span>
                    </div>
                    <div className="property-area">
                      <img src="/image/home.png" className="property-icon"></img>
                      <span> {property.propertyarea} sq.ft</span>
                    </div>
                    <div className="property-price">
                      <img
                        src="/image/money.png"
                        className="property-icon"
                      ></img>
                      <span> {property.propertyprice} INR</span>
                    </div>
                    <button
                      className="view-detail-btn"
                      style={{ width: "110px" }}
                      onClick={() => {
                        viewdetail(property._id);
                      }}
                    >
                      View Detail
                    </button>
                    <button
                      className="view-detail-btn"
                      style={{ width: "110px" }}
                      onClick={() => handleCartButton(property._id)}
                    >
                      {isInWhishlist
                        ? "Remove"
                        : cartItems.includes(property._id)
                        ? "Go to Cart"
                        : "AddCart"}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div>{isInWhishlist && <h1>Empty whislist</h1>}</div>
      )}
    </>
  );
}

export default Propertylistindiviual;
