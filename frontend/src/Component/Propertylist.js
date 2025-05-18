import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Css/Propertylist.css'
import { useSelector } from "react-redux";
import Propertylistindiviual from "./Propertylistindiviual";
function Propertylist({logout=false}) {
  const [propertyDetails, setPropertyDetails] = useState([]);
  //const [cartItems, setCartItems] = useState([]);
  //const{userid}=useSelector((state)=>state.auth);
  //const navigate = useNavigate();

  /*const viewdetail=(id)=>
  { 
    console.log("propertydetail",id);
    navigate(`property/${id}`);
      
  }*/
  /*const addToCart=(productId)=>{
    console.log(userid)
    console.log("propertydetail",productId,userid);
    fetch("http://localhost:5000/addToWhislist",{
      method:"post",
     headers: {
          "Content-Type": "application/json",
       },
      body: JSON.stringify({userId:userid,productId}),
    }).then((res)=>res.json())
    .then((data)=>{console.log('data come from api ',data);
      if(!data.error){
        setCartItems((prev) => [...prev,productId]);
      }
    }
  )
    .catch((error)=>{console.log('data come from api error '+error)})
  }
  const handleCartButton = (productId) => {
    if (cartItems.includes(productId)) {
      navigate("/whislist");
    } else {
      addToCart(productId);
    }
  };*/
  useEffect(()=>{
         fetch("http://localhost:5000/propertydetails",{
          method:"GET",
          credentials: 'include',
         }).then((res)=>res.json()).then((data)=>{
          if(data){
            setPropertyDetails(data);
          }
         }).catch((err)=>{
          console.log("error for navbar",err);
         })
        /* fetch("http://localhost:5000/addToWhislist",{
          method:"GET"
         }).then((res)=>res.json()).then((data)=>{
          if(data){
            data.forEach(cart=> {
              if(cart.userId===userid){
                   setCartItems((prev)=>[...prev,cart.productId]);
              }
            });
            console.log(data);
          }
         }).catch((err)=>{
          console.log("error for frontend cart fetchrequest",err);
         })*/
  },[]);
  return (
   /* <div className="property-container">
     {Array.isArray(propertyDetails) && propertyDetails.map((property,index)=>{
      return (
        <div key={index}  className="property-card">
      <div  className="property-img">
        <img src={`http://localhost:5000/uploads/${property.images[0]}`} alt="not found"  className="property-img__img"></img>
      </div>
      <div className="property-detail">
        <div className="property-location">
          <img
            src="image/location.png"
            style={{ height: "20px", width: "15px" }}
             className="property-icon"
          ></img>
          <span> {property.location.housearea},{property.location.landmark},{property.location.city},{property.location.state},{property.location.zipcode}</span>
        </div>
        <div className="property-area">
          <img
            src="image/home.png"
            className="property-icon"
          ></img>
          <span> {property.propertyarea} sq.ft</span>
        </div>
        <div className="property-price">
          <img
            src="image/money.png"
               className="property-icon"
          ></img>
          <span> {property.propertyprice} INR</span>
        </div>
        <button className="view-detail-btn" onClick={()=>{viewdetail(property._id)}}>View Detail</button>
        <button
                className="view-detail-btn"
                onClick={() => handleCartButton(property._id)}
              >
                {cartItems.includes(property._id) ? "Go to Cart" : "AddCart"}
              </button>
      </div>

    </div>
      )
})}
   
    </div>
      */
     <>
     <Propertylistindiviual propertyDetails={propertyDetails} ></Propertylistindiviual>
     </>
  );
}

export default Propertylist;
