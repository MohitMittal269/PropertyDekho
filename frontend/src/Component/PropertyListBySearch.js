import React, { useEffect ,useState} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Css/Propertylist.css'
import Propertylistindiviual from './Propertylistindiviual';
function PropertyListBySearch() {
   const navigate = useNavigate();
    const [searchParams , setSearchParams]=useSearchParams();
     const [propertyDetails, setPropertyDetails] = useState([]);
       
     useEffect(() => {
      const city = searchParams.get('city');
      if (!city) return;
      fetch(`http://localhost:5000/property?city=${city}`, {
        method: 'GET',
        credentials: 'include',
      })
        .then((res) => res.json())
        .then((data) => {
          setPropertyDetails(data || []);
        })
        .catch((err) => {
          console.log("error from property list by search", err);
        });
    
    }, [searchParams]);
    /*const viewdetail=(id)=>
        { 
          console.log("propertydetail",id);
          navigate(`property/${id}`);
            
        }*/
  return (
/*<div className="property-container">
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
      </div>
    </div>
      )
})}
    </div>
      */
     <>
     <Propertylistindiviual propertyDetails={propertyDetails}></Propertylistindiviual>
     </>

  )
}

export default PropertyListBySearch