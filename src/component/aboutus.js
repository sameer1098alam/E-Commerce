
import React from 'react';
import FetchProduct from './FetchProduct';
import Header from './Header';
export default class Aboutus extends React.Component{
    render(){
        return(
            <div className='container mt-5'>
                <Header />
                <p className='jumbotron'>Welcome to Aboutus</p>

                <FetchProduct addToCart={this.addCart} />
            </div>
        )
    }
}
