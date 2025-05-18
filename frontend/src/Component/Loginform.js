import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authslice';
import { Formik,Form } from 'formik'
import Formikcontrol from './Formikcontrol'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import './Css/Loginform.css'
import './Css/Login.css'
function Loginform() {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  
    const initialvalues={
        email:'',
        password:'',
        phonenumber:'',
       // otp:''

    }
    const onSubmit= async(values)=>{
       
        
       const {email,password,phonenumber}=values;
      
      let res= await dispatch(loginUser({email,password,phonenumber }));
      if(loginUser.fulfilled.match(res)){
        navigate("/");
      }
      else
      {
        console.log("error from loginform"+JSON.stringify( res));
      }
       
      /* fetch("http://localhost:5000/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((res)=>res.json()
      ).then(data=>console.log(data.userid)





    ).catch(err=>console.log(err));*/
    console.log("loginform loading",{loading});
    }
    const validateSchema=Yup.object({
        email:Yup.string()
        .email('Invalid email format')
        .required('Required'),
        password:Yup.string().required('Required'),
        phonenumber:Yup
        .number()
        .typeError('Phone number must be a number') // Ensure it's a number
        .required('Phone number is required')
        .test(
          'is-ten-digits',
          'Phone number must be exactly 10 digits',
          (value) => value && value.toString().length === 10 // Custom validation for length
        ),
        /*otp:Yup
        .number()
        .typeError('Otp must be a number') // Ensure it's a number
        .required('Otp is required')*/

    })
   
  return (
    <div className="login-form-wrapper">
        <Formik initialValues={initialvalues} validationSchema={validateSchema} onSubmit={onSubmit}>
        {
            formik =>{
                console.log(formik);
                /*const sendmessage= async (values)=>{
                    console.log('hello everyone',formik.values);
                  const otp=document.getElementById('otp');
                  otp.style.display='block';
                  //api().then(verify.style.dispaly=none,
                            //submit.style.display=block;
                  // ).catch(
                  // alert phone number is not correct;
                  // verify again opt is incorrect
                  //)
                }*/
                return(
                <Form className="login-form">
                    <Formikcontrol
                    name='email'
                    type='email'
                    label='Email'
                    control='input'
                    />
                    <Formikcontrol
                    name='password'
                    type='password'
                    label='Password'
                    control='input'
                    />
                    <Formikcontrol
                     name='phonenumber'
                     type='number'
                     label='PhoneNumber'
                     control='input'
                     ></Formikcontrol>
                  <button type='submit' id='submit' disabled={!formik.isValid||loading} >
                   {loading===true?"loading":"Submit"} 
                     
                  </button>
                </Form>
                )
            }
        }
    </Formik>
    </div>
     
  
  )
}

export default Loginform