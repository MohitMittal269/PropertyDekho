import { ErrorMessage, Field } from 'formik'
import React from 'react'
import Texterror from './Texterror'

function Select(props) {
    const {label,name,options,...rest}=props
  return (
    <div>
        <label htmlFor={name}>{label}</label>
        <Field as='select' id={name} name={name} {...rest}>
         {
            options.map((option)=>{
              return(    
                <option key={option.key} value={option.value}>{option.key}</option>
              )
            })
         }
        </Field>
        <ErrorMessage name={name} component={Texterror}></ErrorMessage>
    </div>
  )
}

export default Select