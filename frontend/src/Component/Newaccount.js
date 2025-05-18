import React from 'react'
import {Formik,Form} from 'formik'
import Formikcontrol from './Formikcontrol'
import * as Yup from 'yup'

function Newaccount() {
    const initialValues={
        firstname:'',
        surname:'',
        email:'',
        password:'',
        gender:'',
        dob:null,
        location:''
    }
    const validateSchema=Yup.object({
        firstname:Yup.string().required('Required'),
        surname:Yup.string().required('Required'),
        email:Yup.string()
        .email('Invalid email format')
        .required('Required'),
        password:Yup.string().required('Required'),
        gender:Yup.string().required('Required'),
        dob:Yup.date().required('Required').nullable(),
        location:Yup.string().required('Required')
    })
    const onSubmit=values=>{
        console.log(values);
    }
    const options=[
        {
            key:'Male',
            value:'male'
        },
        {
            key:'Female',
            value:'female'
        },
        {
            key:'Transgender',
            value:'transgender'
        }
    ]
    const optionsloc=[
        {
            key:'Select the city',
            value:''
        },
        {
            key:'Delhi',
            value:'delhi'
        },
        {
            key:'Mumbai',
            value:'mumbai'
        }
    ]
  return (
    <Formik initialValues={initialValues} validationSchema={validateSchema} onSubmit={onSubmit}>
        {
            formik =>{
                return(
                    <Form>
                        <Formikcontrol
                        control='select'
                        name='location'
                        label='select the location '
                        options={optionsloc}
                        >
                        </Formikcontrol>
                        <Formikcontrol
                        control='input'
                        name='firstname'
                        type='text'
                        label='Firstname'
                        />
                         <Formikcontrol
                        control='input'
                        name='surname'
                         type='text'
                         label='Surname'
                        />
                         <Formikcontrol
                        control='radio'
                        name='gender'
                         label='Gender'
                         options={options}
                        />
                          <Formikcontrol
                        control='date'
                        name='dob'
                         label='Date of birth'
                          
                        />

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
                        <button type='submit' disabled={!formik.isValid}>Submit</button>
                    </Form>
                )
            }
        }
    </Formik>
  )
}

export default Newaccount