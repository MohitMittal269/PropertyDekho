import { ErrorMessage, Field } from 'formik'
import React from 'react'
import Texterror from './Texterror'

function Inputfile(props) {
   const {label,name,...rest}=props
  return (
    <div>
        <label htmlFor={name}>{label}</label>
        <Field name={name}>
            {({field,form})=>
            {    
                console.log(field)
                console.log(form)
              const  handleFileChange=(e)=>{
                   const files= Array.from(e.currentTarget.files);
                   if(files.length>6){
                    form.setFieldError(field.name,'You can upload maximum six images')
                    return;
                   }
                   else{
                    form.setFieldValue(field.name,files);
                   }
                   
              }
                return(  
                <input  name={name} type="file" accept='image/*' multiple  onChange={handleFileChange}></input>)
              
            }}
        </Field>
        <ErrorMessage name={name} component={Texterror}></ErrorMessage>
    </div>
  )
}

export default Inputfile