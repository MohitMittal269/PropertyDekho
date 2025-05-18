
const jwt=require('jsonwebtoken');



const { Sessiondetail } = require("./src/model/schema");

 const verifyTokenAuthenication=async (req,res,next)=>{
    req.user=null;    
   let access=req.cookies?.['access-token']
   let refresh=req.cookies?.['refresh-token']
   if(!access && !refresh){
    req.user=null;
    return next();
   }
   if(access){
    try{
         const decodedToken=jwt.verify(access,'mohitmittal');
         req.user=decodedToken;
         return next();
    }
    catch(error){
        return {message:"access-token error from middelware"}

    }
   }
   if(refresh){
    try{
        const {sessionId}=jwt.verify(refresh,'mohitmittal');
            const newSession=await Sessiondetail.findById({_id:sessionId}).populate('userId','_id email phonenumber');
            if(!newSession || !newSession.valid){
                throw new Error('Invalid session');
            }
            const userExist=newSession?.userId;
              let newaccessToken=jwt.sign({userId:userExist._id,email:userExist.email,phonenumber:userExist.phonenumber,sessionId:newSession._id},"mohitmittal",{expiresIn:600000});    
                         let newrefreshToken=jwt.sign({sessionId:newSession._id},"mohitmittal",{expiresIn:864000000 });
            req.user={userId:userExist._id,email:userExist.email,phonenumber:userExist.phonenumber,sessionId:newSession._id};
            res.cookie('access-token', newaccessToken, {
                httpOnly: true,  
                secure:true,      // Can't be accessed via JavaScript
                maxAge: 10 * 60 * 1000 //  10 minutes
              });
               res.cookie('refresh-token', newrefreshToken, {
                httpOnly: true,    
                secure:true,    // Can't be accessed via JavaScript
                maxAge: 864000000 //  10d minutes
              });
        return next();
    }catch(error){
        return {message:"refresh-token error from middelware"}
    }
   }
    return next();
  }
  module.exports={verifyTokenAuthenication}