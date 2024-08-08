import axios from 'axios';
import React, { Component } from 'react';
import FetchProduct from './FetchProduct';
import Header from './Header';

class MainComponent extends Component {
    state = {
        email: '',
        hidden: false,
        login: false,
        user: '',
        cart: [],
        errorMessage: ''
    };

    setEmail = (e) => {
        this.setState({ email: e.target.value });
    };

    login = (e) => {
        e.preventDefault();
        let obj = {
            uname: e.target.uname.value,
            upwd: e.target.upwd.value
        };

        //console.log("Attempting to log in with:", obj); // Log the login attempt

        axios.get('https://e-commerce-backend-1-9wra.onrender.com/users/find', obj)
            .then((posRes) => {
                console.log("Login response:", posRes.data); // Log the response

                if (posRes.data.auth === 'success') {
                    this.setState({
                        login: true,
                        user: obj.uname,
                        errorMessage: ''
                    });
                    window.sessionStorage.setItem('user', obj.uname);
                    this.fetchCart(obj.uname);
                } else {
                    console.log('Authentication failed');
                    this.setState({ errorMessage: 'Authentication failed' });
                }
            })
            .catch((errRes) => {
                console.log('Error in login:', errRes);
                this.setState({ errorMessage: 'Login failed. Please try again.' });
            });
    };

    fetchCart = (uname) => {
        axios.get(`https://e-commerce-backend-1-9wra.onrender.com/carts?email=${uname}`)
            .then((res) => {
                console.log("Cart fetched:", res.data); // Log cart fetch
                this.setState({ cart: res.data.cartItems });
            })
            .catch((err) => {
                console.log('Error in fetching cart:', err);
                this.setState({ errorMessage: 'Failed to fetch cart. Please try again.' });
            });
    };

    addCart = (product) => {
        let obj = {
            email: window.sessionStorage.getItem('user'),
            productid: product.p_id,
            productname: product.p_name,
            productprice: product.p_cost,
            productquantity: 1
        };

        console.log("Adding to cart:", obj); // Log the cart addition

        axios.post('https://e-commerce-backend-1-9wra.onrender.com/carts/insert', obj)
            .then((posRes) => {
                console.log('Response from cart add:', posRes);
                this.fetchCart(obj.email);
            })
            .catch((errRes) => {
                console.log('Error in cart add:', errRes);
                this.setState({ errorMessage: 'Failed to add item to cart. Please try again.' });
            });
    };

    render() {
        return (
            <div className='container mt-5'>
                <Header isLoggedIn={this.state.login} cartCount={this.state.cart.length} />
                {this.state.errorMessage && <div className="alert alert-danger">{this.state.errorMessage}</div>}
                <div hidden={this.state.login}>
                    <form onSubmit={this.login} className='btn btn-outline'>
                        <div className='form-group'>
                            <label>Username</label>
                            <input type='text' name='uname' className='form-control' required />
                        </div>
                        <div className='form-group'>
                            <label>Password</label>
                            <input type='password' name='upwd' className='form-control' required />
                        </div>
                        <button type='submit' className='btn btn-primary'>Login</button>
                    </form>
                </div>
                <div hidden={!this.state.login}>
                    <FetchProduct addToCart={this.addCart} />
                
                </div>
                
            </div>
        );
    }
}

export default MainComponent;
