const mongoose=require("mongoose");
const {Logindetail}=require('../model/schema');
const db=mongoose.connect("mongodb://localhost:27017/propertydetail",{
   // useNewUrlParser:true,
    //useUnifiedTopolgy:true,
    //useCreateIndex:true,
    //useFindAndModify:false

}).then(async()=>{console.log("connection Successfully database")
    const result = await Logindetail.deleteMany({ email: null });
    console.log(`${result.deletedCount} records deleted with null email.`);
}).catch((err)=>console.log(err));
