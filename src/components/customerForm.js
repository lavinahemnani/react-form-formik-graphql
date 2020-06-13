import React from "react";
import gql from "graphql-tag";
import Button from "@material-ui/core/Button";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import { GET_CUSTOMERS } from "./customers";
import { Mutation } from 'react-apollo';
const ADD_CUSTOMER = gql`
  mutation CreateCustomer(
    $Name: String
	$Email:String
    $PhoneNumber: String
    $Address: String
	$ZipCode: String
  ) {
    CreateCustomer(
      Name: $Name
	  Email: $Email
      PhoneNumber: $PhoneNumber
      Address: $Address
	  ZipCode: $ZipCode
    )
  }
`;
export const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
    }
  }
`;

export function CustomersForm() {
  const [addCustomer, { data }] = useMutation(ADD_CUSTOMER, {
    refetchQueries: [{ query: GET_CUSTOMERS }]
  });
	const phoneRegExp=/\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
  return (
    <div id="customerForm">
      <h3>ADD CUSTOMER</h3>
      <Formik
        initialValues={{
          Name: "",
          PhoneNumber: "",
          Address: "",
          Email: "",
		  ZipCode:""
        }}
        validationSchema={Yup.object().shape({
          Name: Yup.string().required("Name is required"),
          Email: Yup.string()
            .email("Email is invalidd")
            .required("Email is required"),
		  PhoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone Number is required"),
          Address: Yup.string().required("Address is required"),
		  ZipCode:Yup.string().required("Zip Code is required").matches(/^[0-9]{6}$/, 'Must be exactly 6 digits')
          
        })}
        onSubmit={(fields, { resetForm }) => {
          addCustomer({
            variables: {
              ...fields,
            }
          });
          resetForm();
        }}
		
        render={({ errors, status, touched }) => (
          <Form>
            <Field
              label="Name"
              name="Name"
              type="text"
              component={TextField}
              margin="none"
              variant="outlined"
              fullWidth
            />
           
            <Field
              label="Email"
              name="Email"
              type="text"
              component={TextField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
			 <Field
              label="Phone Number"
              name="PhoneNumber"
              type="text"
              component={TextField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <Field
              label="Address"
              name="Address"
              type="text"
              component={TextField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
			<Field
              label="Zip Code"
              name="ZipCode"
              type="text"
              component={TextField}
              margin="normal"
              variant="outlined"
              fullWidth
            />
			<Button type="submit" variant="outlined" color="primary">
              Register
            </Button>{" "}
            <Button type="reset" variant="outlined" color="secondary">
              Reset
            </Button>
          </Form>
        )}
      ></Formik>
    </div>
  );
}
