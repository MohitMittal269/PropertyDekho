import { Field,ErrorMessage } from 'formik'
import React from 'react'
import Texterror from './Texterror'

function Textarea(props) {
    const {label,name,...rest}=props
  return (
    <div>
        <label htmlFor={name}>{label}</label>
        <Field as='textarea' name={name} id={name} {...rest}></Field>
        <ErrorMessage name={name} component={Texterror}></ErrorMessage>
    </div>
  )
}

export default Textarea