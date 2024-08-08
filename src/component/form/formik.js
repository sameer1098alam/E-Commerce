import 'bootstrap/dist/css/bootstrap.min.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

class RegistrationForm extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                terms: false
            },
            schema: Yup.object({
                name: Yup.string()
                    .required('Please Enter Name')
                    .min(3, 'Too Short')
                    .max(9, 'Too Large'),
                email: Yup.string().required('Please Enter email').email('Invalid email format'),
                password: Yup.string()
                    .required('Please Enter Password')
                    .matches(
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
                        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                    ),
                confirmPassword: Yup.string()
                    .required('Enter confirm password')
                    .oneOf([Yup.ref('password'), null], "Confirm password doesn't match"),
                terms: Yup.bool()
                    .required('Please accept the terms')
                    .oneOf([true], 'Please accept the terms')
            })
        };
    }

    handleSubmit = (values) => {
        console.log(values);
    }

    render() {
        return (
            <div className='container mt-5'>
                <Formik
                    initialValues={this.state.user}
                    validationSchema={this.state.schema}
                    onSubmit={this.handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label htmlFor="name" className="form-label">Name</label>
                                <Field name="name" type="text" className="form-control" id="name" />
                                <ErrorMessage name='name' component='div' className='text-danger mt-1' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <Field name="email" type="text" className="form-control" id="email" />
                                <ErrorMessage name="email" component='div' className="text-danger mt-1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <Field name="password" type="password" className="form-control" id="password" />
                                <ErrorMessage name="password" component='div' className="text-danger mt-1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                <Field name="confirmPassword" type="password" className="form-control" id="confirmPassword" />
                                <ErrorMessage name="confirmPassword" component='div' className="text-danger mt-1" />
                            </div>
                            <div className="mb-3 form-check">
                                <Field name="terms" type="checkbox" className="form-check-input" id="terms" />
                                <label className="form-check-label" htmlFor="terms">Accept Terms</label>
                                <ErrorMessage name="terms" component='div' className="text-danger mt-1" />
                            </div>
                            <button type='submit' className='btn btn-primary'>Register</button>
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default RegistrationForm;
