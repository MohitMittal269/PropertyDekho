const express = require("express");
const mongoose= require("mongoose");
require('./src/db/dataconn');
const jwt=require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const port =  5000;
const multer = require('multer');
const {Propertydetail,Logindetail,Cartdetail,Sessiondetail}=require('./src/model/schema');
const app = express();
var cors = require('cors')
const path = require("path");
const {verifyTokenAuthenication}=require('./middelware');
var corsOptions = {
    origin: 'http://localhost:3000',
    methods:"GET, POST, PUT, DELETE, PATCH, HEAD" ,
    credentials: true ,// some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors(corsOptions));
const publicpath = path.join(__dirname, "/public");
app.use(express.static(publicpath));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'uploads')); // Save files to 'uploads' folder
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  var multerOptions = {
    storage: storage,
    fileFilter: function(req,file,callback){
        var ext = path.extname(file.originalname);
        var fieldName = file.fieldname;
        console.log("extension"+ext);
        console.log("fieldname"+fieldName);
        if(fieldName == "images"){
            if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.webp' && ext !== '.jfif') {
                return callback(new Error('Only images are allowed [ png , jpg & jpeg ]'));
            }
            callback(null, true);   
        }
      
    }
}
const upload = multer(multerOptions).fields([{name:'images' , maxCount:6}]);
app.get('/authStatus',verifyTokenAuthenication,(req,res)=>{
      try{
           res.status(200).json({user:req.user});
      }
      catch(err){
        res.status(500);
      }
  
})
app.post('/postproperty',async (req, res) => { // 'files' is the field name, max 10 files
    try {
      let errors={};
      upload(req,res,async(err)=>{
        if(err){
          console.log("hello everyone for upload err");
            console.log("Error Occured during upload ");
            console.log("this is postform error when uploading a file",err.message);
            res.status(400).json({ error: err.message});
        }
        else{
          const userinfo=JSON.parse(req.body.data[0]);
          const propertyinfo=JSON.parse(req.body.data[1]);
            const userid=userinfo.userid
         const images=req.files.images.map((file)=>file.filename);
         console.log("images",images);
          const {
            propertytitle,
            propertytype,
            propertycategory,
            description,
            propertyprice,
            propertyarea,
            propertycarpetarea,
            bedroom,
            bathroom,
            location,
            amenities,
            furnishing,
          
          } = propertyinfo;
  
          // Validate that the user exists
          const userExists = await Logindetail.findById(userid);
          if (!userExists) {
            return res.status(404).json({ error: "User not found" });
          }
          // Create new property document
          const Property = new Propertydetail({
            userid,
            propertytitle,
            propertytype,
            propertycategory,
            description,
            propertyprice,
            propertyarea,
            propertycarpetarea,
            bedroom,
            bathroom,
            location,
            amenities,
            furnishing,
            images,
          });
      
          // Save the property to the database
          const savedProperty = await Property.save();      
          res.status(201).json({
            message: "Property successfully created",
            property: savedProperty,
          });
      
            // Extract file paths for uploaded images
        }
      });
       
      
    } catch (err) {
        Console.log(err);
        res.status(500).json({ error: "An error occurred while creating the property" });
    }
});
app.post("/registered",async(req,res)=>{
        const{email,password} = req.body;
        console.log("data from api registered",email,password);
           const userExist=await Logindetail.findOne({ email });
           console.log("user from registered api",userExist);
           if(userExist){
             if(userExist.password===password)
             {
             const sessions= new Sessiondetail({userId:userExist._id,userAgent:req.headers["user-agent"]})
             const newSession=await sessions.save();
             let accessToken=jwt.sign({userId:userExist._id,email:userExist.email,phonenumber:userExist.phonenumber,sessionId:newSession._id},"mohitmittal",{expiresIn:600000});    
             let refreshToken=jwt.sign({sessionId:newSession._id},"mohitmittal",{expiresIn:864000000 })
             res.cookie('access-token', accessToken, {
              httpOnly: true,  
              secure:true,      // Can't be accessed via JavaScript
              maxAge: 10 * 60 * 1000 //  10 minutes
            });
             res.cookie('refresh-token', refreshToken, {
              httpOnly: true,    
              secure:true,    // Can't be accessed via JavaScript
              maxAge: 864000000 //  10d minutes
            });
             
             res.json({ message: 'User login  successfully', userid: userExist._id });
             }
             else{ res.status(400).json({message:"user is not found"});
                }
           }
           else{
              res.status(400).json({message:"user is not found"});
           }
})
app.post('/login', async (req, res) => {
  try {
    const { phonenumber, email, password } = req.body;
    const newLogin = new Logindetail({ phonenumber, email, password });
    const savedLogin = await newLogin.save();
    res.status(201).json({ message: 'User registered successfully', userid: savedLogin._id });
  } catch (error) {
    // if password is not strong  (error.errors.password.message)
    // if email is already stored in database (error.keyPattern.email)
    // if password is already stored in database (error.keyPattern.password)
    console.log("this is the login form error ",error.keyPattern);
    
    res.status(500).json({ error:"error from /login api"});
  }
});

app.post("/addToWhislist",async(req,res)=>{
  try{
    console.log(req.body);
    const{userId,productId}=req.body;
    console.log(userId,productId);
    const newCart=new Cartdetail({userId,productId});
    const savedLogin = await newCart.save();
    res.status(201).json({message:'Add a element in the cart successfully'});
  }catch(error){
    console.log("this is the error from ",error);
    
    res.status(500).json({ error:'error from cartschema'});

  }
 
  
})
app.get('/propertydetail/:id', async (req, res) => {
  try {
    console.log("jjjjjjjjjjjj");
    const { id } = req.params;
   const property= await Propertydetail.findById({_id:id}).populate("userid",'email phonenumber');
   
   // const property = await Propertydetail.find({ userid: req.params.id })
    //.populate('userid', 'email phonenumber'); // Populate the 'userid' field with 'email' and 'username' from Logindetail
// Populate the 'userid' field with specific fields from the Logindetail model
    if (!property) {
      console.log("property not found");
      return res.status(404).json({ message: 'Property not found' });
    }
    console.log("property",property);
    
    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving property details' });
  }
});
app.get("/propertydetails",async(req,res)=>{
  try{
    const property = await Propertydetail.find({})
    .populate('userid', 'email phonenumber');
    if(!property){
      res.status(400).json({message:"Property not found"});
    }
    const propertyarray=property.slice(0,10);
    res.status(200).json(propertyarray);
  }catch(error){
    res.status(500).json({ message: 'Error retrieving property details' });
  }
 
})
app.get("/property",async(req,res)=>{
  try{
    console.log("hello from property api");
   const city= req.query.city;
   console.log("frombackend"+city);
    const property = await Propertydetail.find({"location.city":city});
    console.log(property);
    
    if(!property){
      res.status(400).json({message:"Property not found"});
    }
    const propertyarray=property.slice(0,10);
    res.status(200).json(propertyarray);
  }catch(error){
    res.status(500).json({ message: 'Error retrieving property details' });
  }
 
})

app.get("/addToWhislist",async(req,res)=>{
  try{
    const cart= await Cartdetail.find({});
    res.status(200).json(cart);
  }catch(error){
    console.log("error from get api of addtowhishlist")
    res.status(500).json({message:'error retrieving from api of addtowhishlist'})
  }
  

})
app.get("/addToWhislist/:id",async(req,res)=>{
  try{
    const userId=req.params.id;

    const cart= await Cartdetail.find({userId}).populate('productId');
    res.status(200).json(cart);
  }catch(error){
    console.log("error from get api of addtowhishlist/userid")
    res.status(500).json({message:'error retrieving from api of addtowhishlist/userid'})
  }
  

})
app.delete('/removecart',async(req,res)=>{
  try{
    const{productId,userId}=req.body; 
console.log(productId,"userid  ",userId);
const deletedDocument = await Cartdetail.findOneAndDelete({ productId, userId });
    
if (!deletedDocument) {
  return res.status(404).json({ message: 'No matching record found' });
}

res.status(200).json({
  message: 'Record deleted successfully',
  deletedDocument: deletedDocument
});
  }catch(error){
    console.log("error from delete one");
    res.status(500).json({ error: error.message });
  }
 
})
app.get("/logout",(req,res)=>{
  try{
      console.log("logout from backend");
   res.clearCookie('access-token');
   res.clearCookie('refresh-token');
   res.status(200).json({message:"succesful"});
  }
catch(err){
  console.log(err);
}
})
app.listen(port, (err) => {
    console.log(`connection successfully at port 5000`);
  });
  