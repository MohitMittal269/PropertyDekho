import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Formik,Form } from 'formik'
import Formikcontrol from './Formikcontrol'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { registeredUsers } from '../features/authslice';
import './Css/Register.css'
function RegisteredUser() {
     const dispatch = useDispatch();
      const navigate=useNavigate();
      const { loading, error } = useSelector((state) => state.auth);
      
     const initialValues={
            email:'',
            password:''
        }
        const validateSchema=Yup.object({
            email:Yup.string()
            .email('Invalid email format')
            .required('Required'),
            password:Yup.string().required('Required'),
        })
        const onSubmit=async values=>{
                        
                       const {email,password}=values;
                    
                      let res= await dispatch(registeredUsers({email,password}));
                    
                      if(registeredUsers.fulfilled.match(res)){
                        navigate("/");
                      }
                      else
                      {
                        console.log("error from registeredusers"+JSON.stringify( res));
                      }
  
        }
      return (
        <div className="login-form-wrapper">
        <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={onSubmit}>
        {
            formik =>{
                return(
                    <Form className="login-form">
                        <Formikcontrol
                        control='input'
                        name='email'
                         type='email'
                         label='Email'
                        />
                         <Formikcontrol
                        control='input'
                        name='password'
                         type='password'
                         label='Password'
                        />
                        <button type='submit' disabled={!formik.isValid || loading}>Submit</button>
                    </Form>
                )
            }
        }
    </Formik>
    </div>
        
      )
  
}

export default RegisteredUser