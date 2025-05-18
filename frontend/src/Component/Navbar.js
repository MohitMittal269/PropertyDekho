import React, { useEffect, useState, useContext } from "react";
import Formikcontrol from "./Formikcontrol";
import { Form, Formik } from "formik";
import {
  createSearchParams,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Propertylist from "./Propertylist";
import "./Css/Navbar.css";
import { logout } from "../features/authslice";
import PropertyListBySearch from "./PropertyListBySearch";
import Navbarcomponent from "./Navbarcomponent";
import { ThemeContext } from "./Themecontext";
import useAuth from "./Hooks/useAuth";
function Navbar() {
  const { loading, user, isAuthenticated } = useAuth();
  const userid = user?.userId;

  console.log("from navbar useauth", user);
  const { setCount } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const { userid, isAuthenticated } = useSelector((state) => state.auth);

  console.log("isAuthicated", isAuthenticated);
  const initialvalues = {
    city: "",
  };
  const option = [
    {
      key: "Select the city",
      value: "",
    },
    {
      key: "Delhi",
      value: "delhi",
    },
    { key: "Mumbai", value: "mumbai" },
    { key: "Jaipur", value: "jaipur" },
  ];

  useEffect(() => {
    
    if (userid) {
      fetch(`http://localhost:5000/addToWhislist/${userid}`, {
        method: "get",
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          setCount(data.length);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }, [userid]);
  const onSubmit = (values) => {
    if (values.city) {
      navigate({
        pathname: "property",
        search: createSearchParams({
          city: values.city,
        }).toString(),
      });
    }
  };

  
  //if (loading) return <div>Loading...</div>;
  return (
    <div className="navbar-container">
      <Navbarcomponent
        userid={userid}
        isAuthenticated={isAuthenticated}
        
      ></Navbarcomponent>

      {/*<div className="navbar">
        <span className="brand-name">PropertyDekho</span>
        { isAuthenticated?
          <NavLink to="/postproperty">
          <button className="post-property-btn">
            Postproperty<span className="free-tag">Free</span>
          </button>
        </NavLink>:null
        }
         
      
        {!isAuthenticated ? (
          <div className="auth-buttons">
           <NavLink to="/login">
          <button className="login-btn">signup</button>
        </NavLink>
        
        <NavLink to="/registered">
          <button className="login-btn">login</button>
        </NavLink></div>
         
        ) : (
          <div className="user-actions" >
      
            <NavLink to={`/whislist/${userid}`}  className="wishlist-link">
            <img src="image\shopping-cart (1).png" alt="cart-Image"  className="cart-icon" />
            <span>whislist</span>
          </NavLink>
            
            <button className="login-btn logout-btn" onClick={()=>{
            dispatch(logout());
          }}>logout</button>
            
          
          </div>
         
        
        )}
      </div>*/}

      <div className="search-container">
        <h2 className="search-heading">We will help to find your dream home</h2>
        <div className="form-container">
          <Formik initialValues={initialvalues} onSubmit={onSubmit}>
            {(formik) => {
              return (
                <Form>
                  <Formikcontrol
                    control="select"
                    name="city"
                    options={option}
                    className="city-select"
                  ></Formikcontrol>
                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Navbar;
