const mongoose = require("mongoose");
const validator = require("validator");
const { default: isTaxID } = require("validator/lib/isTaxID");
const logindetailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensures no two users have the same email
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email format validation
  },
  password: {
    type: String,
    required: true,
    
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Not strong password");
      }
    },
  },
  phonenumber: {
    type: Number,
    required: true,
    validate(value) {
      if (!(value.toString().length === 10)) {
        throw new Error("Phone number must be exactly 10 digits long");
      }
    },
  },
});
const Logindetail = mongoose.model("Logindetail", logindetailSchema);
const propertyschema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId, // Reference to Logindetail
    ref: "Logindetail",
    required: true,
  },
  propertytitle: {
    type: String,
    required: true,
    trim: true,
  },
  propertytype: {
    type: String,
    required: true,
    enum: ["house", "villa", "apartment"],
  },
  propertycategory: {
    type: String,
    required: true,
    enum: ["sell", "rent"],
  },
  description: {
    type: String,
    required: true,
    trim: true,
  
  },
  propertyprice: {
    type: Number,
    required: true,
  
  },

  propertyarea: {
    type: Number,
    required: true,
    
  },
  propertycarpetarea: {
    type: Number,
    required: true,
    
  },
  bedroom: {
    type: Number,
    required: true,
  },
  bathroom: {
    type: Number,
    required: true,
    
  },
  location: {
    housearea: {
      type: String,
      required: true,
      trim: true,
    },
    landmark: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zipcode: {
      type: String,
      required: true,
      match: /^\d+$/, // Only numbers
    },
  },
  amenities: {
    type: [String], // Array of strings
    default: [], // Default empty array
  },
  furnishing: {
    type: [String], // Array of strings
    default: [], // Default empty array
  },
  images: {
    type: [String], // Array of strings
    default: [],
  },
});
/*loginschema.pre("save", async function(next){
    this.password=await bcryptjs.hash(this.password,10);
})*/
const Propertydetail = new mongoose.model("Propertydetail", propertyschema);
   


const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Logindetail',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Propertydetail',
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const Cartdetail = mongoose.model('Cartdetail', cartSchema);


const sessionSchema= new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Logindetail',
    required: true
  },
  valid:{
    type:Boolean,
    default:true
  },
  userAgent:{
    type:String,
    required:true
    
  },
  
}, {
  timestamps: true //  Automatically adds createdAt and updatedAt
})
const Sessiondetail=mongoose.model('Sessiondetail',sessionSchema);

module.exports={Propertydetail,Logindetail,Cartdetail,Sessiondetail};
