import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import Propertylistindiviual from "./Propertylistindiviual";
import "./Css/Propertylist.css";
import Navbarcomponent from "./Navbarcomponent";
import useAuth from "./Hooks/useAuth";
function WhisList() {
  //const { userid } = useSelector((state) => state.auth);
     const{user,isAuthenticated}=useAuth();
          const userid =user?.userId;
      console.log("userid from whislist",userid);
      
  const [propertyDetails, setPropertyDetails] = useState([]);
  const loading = useRef(true);
  function remove(productId) {
    setPropertyDetails((prevs) =>
      prevs.filter((prev) => prev._id !== productId)
    );
  }
  
  useEffect(() => {
    if(userid){
      fetch(`http://localhost:5000/addToWhislist/${userid}`, {
      method: "GET",
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        const allProduct = data.map((object) => object.productId);
        console.log("from wishlist",allProduct);
        setPropertyDetails(allProduct);
        loading.current = false;
      })

      .catch((err) => {
        console.log("error for frontend cart fetchrequest", err);
      });
    }
    
  }, [userid]);
  console.log("whilsisy ",userid)
  return (
    <div>
      <Navbarcomponent isInWhishlist={true} userid={userid} isAuthenticated={isAuthenticated}  ></Navbarcomponent>
      {loading.current ? (
        <h1>{"Loading....."}</h1>
      ) : (
        <Propertylistindiviual
          propertyDetails={propertyDetails}
          isInWhishlist={true}
          remove={remove}
        ></Propertylistindiviual>
      )}
    </div>
  );
}

export default WhisList;
