import React from 'react'
import Input from './Input'
import Radio from './Radio'
import Date from './Date'
import Select from './Select'
import Checkbox from './Checkbox'
import Textarea from './Textarea'
import Inputfile from './Inputfile'
function Formikcontrol(props) {
  const{control,...rest}=props
  
  switch(control){
    case 'input':
     return(
     <Input {...rest}></Input>)
     case 'radio':
      return(
        <Radio {...rest}></Radio>
      )
      case 'date':
      return(
        <Date {...rest}></Date>
      )
      case 'select':
        return(
          <Select {...rest}></Select>
        )
        case 'textarea':
          return(
            <Textarea {...rest}></Textarea>
          )
          case 'checkbox':
            return(
              <Checkbox {...rest}></Checkbox>
            )
            case 'file':
              return(
                <Inputfile {...rest}></Inputfile>
              )
        
    default:return null
  }
}

export default Formikcontrol