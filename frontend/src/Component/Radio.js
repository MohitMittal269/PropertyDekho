import React from 'react'
import {Field,ErrorMessage} from 'formik'
import Texterror from './Texterror'
function Radio(props) {
    const{label,name,options,...rest}=props
    
  return (

    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name} {...rest}>
        {
            ({field})=>{
                return(
                    options.map((option)=>{
                        return(
                            <React.Fragment key={option.key}>
                            <input type='radio' id={option.value} name={option.value} {...field} value={option.value} checked={field.value===option.value}/>
                            <label htmlFor={option.value}>{option.key}</label>
                            </React.Fragment>
                        )
                    })
                )
            }
        }
      </Field>
      <ErrorMessage name={name} component={Texterror}></ErrorMessage>
    </div>
  )
}

export default Radio