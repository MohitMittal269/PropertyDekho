import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Formikcontrol from "./Formikcontrol";
import './Css/Loginform.css'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Css/Postproperty.css'
import useAuth from "./Hooks/useAuth";
function Postproperty() {
 // const {userid} =useSelector((state)=>state.auth);
  const{user}=useAuth();
    const userid=user?.userId;
  const navigate = useNavigate(); 
  const initalvalues = {
    propertytitle:'',
    propertytype:'',
    propertycategory:'',
    propertyprice:'',
    location:{
      housearea:'',
      landmark:'',
      city:'',
      state:'',
      zipcode:''
    },
    description:'',
    anemities:[],
    furnishing:[],
    propertyarea:'',
    propertycarpetarea:'',
    bedroom:'',
    bathroom:'',
    images:[]
  };
  const onSubmit = (values) => {
    console.log("form data",values);
    const formData = new FormData();
    const{images,...rest}=values;
    console.log("restvalues arre",{...rest});
    console.log("without restproperty",rest);
    
  console.log("form postproperty userid",{userid});
  formData.append('data',JSON.stringify({userid}));
  formData.append('data', JSON.stringify(rest)); // Add form data
  values.images.forEach((file) => formData.append('images', file));
  fetch("http://localhost:5000/postproperty", {
    method: "POST",
    credentials: 'include',
    body: formData, // Don't include 'Content-Type', browser will set it automatically
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("data froent"+data.message)
   
    navigate('/');
    }
  )
    .catch((err) => console.log("error front"+JSON.parse({err})));
  };
  const validateSchema = Yup.object({
    propertytitle:Yup.string().required('Property title is required'),
    propertytype:Yup.string().required('Select the property type'),
    propertycategory:Yup.string().required('Select the property catergory'),
    propertyprice:Yup.number().required('Property Price is required').min(1,'Greater than one'),
    location:Yup.object({
      housearea:Yup.string().required('HouseAreais required'),
      landmark:Yup.string().required('Landmark is required'),
      city:Yup.string().required('City is required'),
      state:Yup.string().required(' State is required'),
      zipcode:Yup.string().required('Zipcode title is required')
  
    }),
    description:Yup.string().required('Property Description is required'),
    propertyarea:Yup.number().required('Property Area is required'),
    propertycarpetarea:Yup.number().required('Property CarpetArea is required'),
    bedroom:Yup.number().required('Property Bedroom is required'),
    bathroom:Yup.number().required('Property Bathroom is required'),

    images:Yup.array().required('Images is Required').min(1,'Atleast one image is Required')
    
     });
  const optionstype = [
    {
      key: "Select the type",
      value: "",
    },
    {  key: "House",
      value: "house"},
    {  key: "Villa",
      value: "villa"},
    {  key: "Apartment",
      value: "apartment"}
  ];
  const optionscategory = [
    {
      key: "Select the Category",
      value: "",
    },
    {key:'Sell',
      value:'sell'
    },
    {
      key:'Rent',
      value:'rent'
    }
  ];
 const optionsanemities=[{key:'Gym',value:'gym'},{key:'Basement',value:'basement'},
  {key:'Lift',value:'lift'},
  {key:'Parking',value:'parking'},
  {key:'Swimming-pool',value:'swimming-pool'},
  {key:'Garden',value:'garden'},
  {key:'Laundry',value:'laundry'},
  {key:'Security',value:'security'},
 ]
 const optionsfurnishing=[
  {key:'Air Conditioning',value:'airconditioning'},
  {key:'Gas Connection',value:'gasconnection'},
  {key:'Refrigerator',value:'refrigerator'},
  {key:'TV',value:'tv'},
  {key:'Microwave',value:'microwave'},
  {key:'Sofa',value:'sofa'},
  {key:'Wardobe',value:'wardobe'},
  {key:'Dinning Table',value:'dinningtable'}]
  return (
    <div>
      <Formik
        initialValues={initalvalues}
        onSubmit={onSubmit}
        validationSchema={validateSchema}
      >
        {(formik) => {
          return (
            <Form className="postproperty-form" >
              <Formikcontrol
                control="input"
                name="propertytitle"
                type="text"
                label="Property title"
              />
              <div className="form-section">
                <Formikcontrol
                  control="select"
                  name="propertytype"
                  label="Type "
                  options={optionstype}
                ></Formikcontrol>
                <Formikcontrol
                  control="select"
                  name="propertycategory"
                  label="Category "
                  options={optionscategory}
                ></Formikcontrol>
                <Formikcontrol
                  control="input"
                  name="propertyprice"
                  type="number"
                  label="Price"
                />
              </div>
              <div className="form-section">
               <span>Location</span> 
                <Formikcontrol
                control="input"
                name="location.housearea"
                type="text"
                placeholder='272 Alpha Rock Suit CA'
              />
                <Formikcontrol
                control="input"
                name="location.landmark"
                type="text"
                  placeholder='Landmark'
              /> <Formikcontrol
              control="input"
              name="location.city"
              type="text"
                placeholder='City'
            /> <Formikcontrol
            control="input"
            name="location.state"
            type="text"
              placeholder='State'
          /> <Formikcontrol
          control="input"
          name="location.zipcode"
          type="text"
            placeholder='Zipcode'
        />
              </div>
              <Formikcontrol
              control='textarea'
              label='Description'
              name='description'
              ></Formikcontrol>
              <div className="form-section">
                <Formikcontrol
                control='checkbox'
                label='Property anemities'
                name='anemities'
                options={optionsanemities}
                ></Formikcontrol>

              </div>
              <div className="form-section">
              <Formikcontrol
                control='checkbox'
                label='Property furnishing'
                name='furnishing'
                options={optionsfurnishing}
                ></Formikcontrol>

              </div>
              <div className="form-section">
                <h2>Details of Area</h2>
                <Formikcontrol
                  control="input"
                  name="propertyarea"
                  type="number"
                  label="Area Size in Sq.Ft(Only digit)"
                />
                <Formikcontrol
                  control="input"
                  name="propertycarpetarea"
                  type="number"
                  label="Carpet Area in sq.Ft(Only digit)"
                />
                 <Formikcontrol
                  control="input"
                  name="bedroom"
                  type="number"
                  label="Number of Bedroom"
                />
                <Formikcontrol
                  control="input"
                  name="bathroom"
                  type="number"
                  label="Number of Bathroom"
                />
              </div>
              <div  className="form-section image-upload">
                <span>Property Images</span>
              <Formikcontrol
               control='file'
               label='Choose img upto 6'
               name='images'
               
               ></Formikcontrol>
              </div>
               
              <button type="submit" disabled={!formik.isValid}>
                Post
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Postproperty;
