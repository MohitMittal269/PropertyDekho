import React from 'react'
import {Field,ErrorMessage} from 'formik'
import Texterror from './Texterror'

function Input(props) {
    const{label,name,...rest}=props
  return (
    <div className="divinput form-control">
    <label htmlFor={name}>{label}</label>
    <Field id={name} name={name} {...rest}></Field>
    <ErrorMessage name={name} component={Texterror}></ErrorMessage>
    </div>
  )
}

export default Input