import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Css/Slider.css';
function Details() {
    const[propertydetail,setpropertydetail]=useState(null);
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const params=useParams();
    const id=params.id;
    useEffect(()=>{
    
       fetch(`http://localhost:5000/propertydetail/${id}`,{
            method:"GET"
        }).then((res)=>res.json()).then((data)=>{ 
          console.log("hello iam from use Effect");
          setpropertydetail(data);
          console.log(propertydetail)
            setImages(data.images);
          }).catch((err)=>{console.log("err from details",err)})
    },[])
    console.log("hello iam from outside use Effect");
    const nextImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  if (!propertydetail) {
    console.log("hello fron if");
    return(<div>
      {
          console.log("hello from return if")
      }
      <p>Loading property details...</p>
    </div>
      ) 
}
  return (
    
    <div className="property-page-container">
        <div className="slider-container">
        {console.log("hello from return")}
            {images.length > 0 ? (
                <>
                    <div className="slider">
                        <button className="prev-button" onClick={prevImage}>&lt;</button>
                        <img src={`http://localhost:5000/uploads/${images[currentIndex]}`} alt={`Slide ${currentIndex + 1}`} className="slider-image" />
                        <button className="next-button" onClick={nextImage}>&gt;</button>
                    </div>
                    <div className="dots-container">
                        {images.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            ></span>
                        ))}
                    </div>
                </>
            ) : (
                <p>Loading images...</p>
            )}
        </div>
          <div className="property-details">
                <h1>{propertydetail.propertytitle}</h1>
                <div className="property-info-grid">
                    <div className="property-info-item">
                        <h2>General Info</h2>
                        <p><strong>Type:</strong> {propertydetail.propertytype}</p>
                        <p><strong>Category:</strong> {propertydetail.propertycategory}</p>
                        <p><strong>Description:</strong> {propertydetail.description}</p>
                    </div>
                    <div className="property-info-item">
                        <h2>Price & Area</h2>
                        <p><strong>Price:</strong> ${propertydetail.propertyprice}</p>
                        <p><strong>Area:</strong> {propertydetail.propertyarea} sqft</p>
                        <p><strong>Carpet Area:</strong> {propertydetail.propertycarpetarea} sqft</p>
                    </div>
                    <div className="property-info-item">
                        <h2>Rooms</h2>
                        <p><strong>Bedrooms:</strong> {propertydetail.bedroom}</p>
                        <p><strong>Bathrooms:</strong> {propertydetail.bathroom}</p>
                    </div>
                    <div className="property-info-item">
                        <h2>Location</h2>
                        <p><strong>City:</strong> {propertydetail.location.city || "N/A"}</p>
                        <p><strong>State:</strong> {propertydetail.location.state || "N/A"}</p>
                    </div>
                    <div className="property-info-item">
                        <h2>Amenities</h2>
                        <p>{propertydetail.amenities.length > 0 ? propertydetail.amenities.join(', ') : 'None'}</p>
                    </div>
                    <div className="property-info-item">
                        <h2>Furnishing</h2>
                        <p>{propertydetail.furnishing.length > 0 ? propertydetail.furnishing.join(', ') : 'None'}</p>
                    </div>
                </div>
            </div>
    </div>
  )
}
export default Details