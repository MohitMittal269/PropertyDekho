import React, { useContext } from "react";
import "./Css/Navbar.css";
//import { logout } from "../features/authslice";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ThemeContext } from "./Themecontext";
function Navbarcomponent({ isInWhishlist = false, userid, isAuthenticated }) {
  const { count } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(isInWhishlist,userid);
  //   const { userid, isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="navbar">
      <span className="brand-name">PropertyDekho</span>
      {isAuthenticated ? (
        <NavLink to="/postproperty">
          <button className="post-property-btn">
            Postproperty<span className="free-tag">Free</span>
          </button>
        </NavLink>
      ) : null}

      {!isAuthenticated ? (
        <div className="auth-buttons">
          <NavLink to="/login">
            <button className="login-btn">signup</button>
          </NavLink>

          <NavLink to="/registered">
            <button className="login-btn">login</button>
          </NavLink>
        </div>
      ) : (
        <div className="user-actions">
          {!isInWhishlist ? (
            <NavLink
              to={`/whislist/${userid}`}
              className="wishlist-link"
              style={{ position: "relative" }}
            >
              {!!count && (
                <div
                  style={{
                    position: "absolute",

                    left: "20px",
                    bottom: "10px",
                    fontSize: "14px",
                    color: "#007BFF",
                    fontWeight: 500,
                  }}
                >
                  {count}
                </div>
              )}
              <img
                src="image\shopping-cart (1).png"
                alt="cart-Image"
                className="cart-icon"
              />
              <span
                style={{
                  fontWeight: 700,
                }}
              >
                whislist
              </span>
            </NavLink>
          ) : null}
          <NavLink to='/logout'>
             <button
            className="login-btn logout-btn"
          /*  onClick={async () => {
              // await dispatch(logout());
              console.log("logout");
              const response = await fetch("http://localhost:5000/logout", {
                method: "get",
                credentials: "include",
              });
              const data = await response.json();
              console.log(data);
              navigate("/");
            }}*/
          >
            logout
          </button>
          </NavLink>
         
        </div>
      )}
    </div>
  );
}

export default Navbarcomponent;
