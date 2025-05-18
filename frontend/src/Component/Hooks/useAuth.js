import {useState,useEffect} from 'react'

const useAuth=()=>{
    
  const [auth,setAuth]=useState({
    loading:true,
    isAuthenticated:false,
    user:null
  });
  console.log("outside useeffext");
  useEffect(()=>{
    const checkAuth=async()=>{
        try{
            const res=await fetch(`http://localhost:5000/authStatus`,{
      method:'get',
      credentials: 'include',
    })
    const data=await res.json();
    if(data.user!=null){
         setAuth({
        loading:false,
       isAuthenticated:true,
        user:data.user
       })
       
    }
    else{
         setAuth({
        loading:false,
       isAuthenticated:false,
        user:data.user
       })
    }

      
     }
        catch(err){
            console.log("error from froentend useAuth",err.message)
        }
    }
    checkAuth();
  },[]);

  return auth;
}
export default useAuth;