import axios from 'axios';
import React, { useState } from 'react';
import Header from './Header';

const Register = () => {
    const [formData, setFormData] = useState({
        u_name: '',
        u_pwd: '',
        u_email: '',
        u_addr: '',
        u_contact: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://e-commerce-backend-1-9wra.onrender.com/insert', formData)
            .then((response) => {
                setSubmitted(true);
                setError(null);
                setFormData({
                    u_name: '',
                    u_pwd: '',
                    u_email: '',
                    u_addr: '',
                    u_contact: ''
                });
            })
            .catch((err) => {
                console.error('Error response:', err.response);
                setError('Error registering user. Please try again later.');
                setSubmitted(false);
            });
    };

    return (
        <div className="container mt-5">
            <Header />
            <h2>Register</h2>
            {submitted && <div className="alert alert-success">User registered successfully.</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="register-form">
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        name="u_name"
                        value={formData.u_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        name="u_pwd"
                        value={formData.u_pwd}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="u_email"
                        value={formData.u_email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <input
                        type="text"
                        className="form-control"
                        name="u_addr"
                        value={formData.u_addr}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contact</label>
                    <input
                        type="text"
                        className="form-control"
                        name="u_contact"
                        value={formData.u_contact}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Register;
