import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    async function api() {
 // await dispatch(logout());
    console.log("logout");
    const response = await fetch("http://localhost:5000/logout", {
      method: "get",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    navigate("/");
    }
    api();
   
  }, []);

  return <></>;
}

export default Logout;
