import axios from 'axios';
import React from 'react';
import urls from '../urls'; // Ensure urls.js is set up correctly
//import IndexComponent from './indexComponent';

export default class FetchProduct extends React.Component {

  constructor() {
    super();
    this.state = {
      products: [],
      status: '',
      error: null,
      cart: []
    };
  }

  componentDidMount() {
    this.setState({
      status: 'Loading'
    });
    axios.get(`${urls}/fetch`)
      .then((posRes) => {
        this.setState({
          products: posRes.data,
          status: ''
        });
      }).catch((errRes) => {
        console.error('Error fetching data:', errRes);
        this.setState({
          status: 'Error loading data',
          error: errRes.toString()
        });
      });
  }

  addToCart = (product) => {
    this.setState(prevState => {
      const existingProduct = prevState.cart.find(item => item.p_id === product.p_id);
      if (existingProduct) {
        // Update quantity if the product is already in the cart
        return {
          cart: prevState.cart.map(item =>
            item.p_id === product.p_id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      } else {
        // Add new product to the cart
        return {
          cart: [...prevState.cart, { ...product, quantity: 1 }]
        };
      }
    });
  };

  updateToCart = (Product) => {
    this.setState(prevState => ({
      cart: prevState.cart.map(item =>
        item.p_id === Product.p_id 
          ? { ...item, ...Product } 
          : item
      )
    }));
  };
  

  removeFromCart = (productId) => {
    this.setState(prevState => ({
      cart: prevState.cart.filter(item => item.p_id !== productId)
    }));
  };

  render() {
    return (
      <div className='container'>
        <div className="text-primary h1">Product List</div>
        {this.state.status === 'Loading' && <p>Loading...</p>}
        {this.state.status === 'Error loading data' && (
          <>
            <p>Error loading data</p>
            <p>{this.state.error}</p>
          </>
        )}
        <div className="row">
          
          {this.state.products.map((element, index) => (
            <div className="col-md-3 mb-3" key={index}>
              <div className="card h-60">
                <img src={element.p_img} className="card-img-top" alt={element.p_name} />
                <div className="card-body">
                  <h5 className="card-title">{element.p_name}</h5>
                  <p className="card-text">ID: {element.p_id}</p>
                  <p className="card-text">Cost: ${element.p_cost}</p>
                  <p className="card-text">Categories: {element.p_categories}</p>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => this.addToCart(element)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => this.updateToCart(element)}
                  >
                    Update Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <h2>Cart</h2>
          {this.state.cart.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <div className="row">
              {this.state.cart.map((item, index) => (
                <div className="col-md-4 mb-4" key={index}>
                  <div className="card h-100">
                    <img src={item.p_img} className="card-img-top" alt={item.p_name} />
                    <div className="card-body">
                      <h5 className="card-title">{item.p_name}</h5>
                      <p className="card-text">ID: {item.p_id}</p>
                      <p className="card-text">Cost: ${item.p_cost}</p>
                      <p className="card-text">Quantity: {item.quantity}</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => this.removeFromCart(item.p_id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}
  
