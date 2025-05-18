import { ErrorMessage, Field } from "formik";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Texterror from "./Texterror";
function Date(props) {
  const { label, name, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field name={name}>
        {({ form, field }) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DatePicker
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
            ></DatePicker>
          );
        }}
      </Field>
      <ErrorMessage name={name} component={Texterror}></ErrorMessage>
    </div>
  );
}

export default Date;
