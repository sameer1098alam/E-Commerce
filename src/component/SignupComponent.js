import axios from 'axios';
import React from 'react';
import urls from '../urls';

export default class SignupComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            status: ''
        };
    }

    render() {
        return (
            <div className='container mt-5'>                
                <form onSubmit={this.signup} className='btn btn-outline-warning w-50'>
                    <h3 className='text-primary'>Signup user </h3>
                    <div className='form-group my-2 btn btn-outline-dark p-3 w-100'>
                        <label>User ID</label>
                        <input type='text' placeholder='Enter User ID' className='form-control' name='userid' required></input>
                    </div>
                    <div className='form-group my-2 btn btn-outline-dark p-3 w-100'>
                        <label>User Name</label>
                        <input type='text' placeholder='Enter User Name' className='form-control' name='uname' required></input>
                    </div>
                    <div className='form-group my-2 btn btn-outline-dark p-3 w-100'>
                        <label>Password</label>
                        <input type='password' placeholder='Enter Password' className='form-control' name='upwd' required></input>
                    </div>
                    <div className='form-group my-2 btn btn-outline-dark p-3 w-100'>
                        <label>User Email</label>
                        <input type='email' placeholder='Enter User Email' className='form-control' name='email' required></input>
                    </div>
                    <div className='form-group my-2 btn btn-outline-dark p-3 w-100'>
                        <label>User Address</label>
                        <input type='text' placeholder='Enter User Address' className='form-control' name='address' required></input>
                    </div>
                    <div className='form-group my-2 btn btn-outline-dark p-3 w-100'>
                        <label>Contact</label>
                        <input type='text' placeholder='Enter Contact' className='form-control' name='contact' required></input>
                    </div>
                    <div className='form-group my-2 w-25 mx-auto' align='center'>                        
                        <input type='submit' className='btn btn-outline-success' value='Signup'></input>
                        <h3>{this.state.status}</h3>
                    </div>
                </form>                
            </div>
        );
    }

    signup = (e) => {
        e.preventDefault();
        let obj = {
            userid: e.target.userid.value,
            uname: e.target.uname.value,
            upwd: e.target.upwd.value,
            email: e.target.email.value,
            address: e.target.address.value,
            contact: e.target.contact.value
        };
        
        axios.post(`${urls}/users/insert`, obj)
            .then((posRes) => {
                console.log(posRes.data);
                this.setState({
                    status: 'Signup Successful!' // Assuming the API returns success on insertion
                });
            })
            .catch((errRes) => {
                console.log(errRes);
                this.setState({
                    status: 'Signup Failed. Please try again.' // Handle errors gracefully
                });
            });
    }
}
