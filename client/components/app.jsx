import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .then(data => {
        this.getCartItems();
      })
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  renderView() {
    const { name, params } = this.state.view;
    const { cart } = this.state;
    let orderTotal = 0;
    if (cart.length) {
      orderTotal = cart.reduce((a, b) => ({ price: a.price + b.price }), { price: 0 });
      orderTotal = (orderTotal.price / 100).toFixed(2);
    }

    if (name === 'catalog') {
      return <ProductList setView={this.setView} />;
    }
    if (name === 'cart') {
      return (
        <CartSummary
          cart={this.state.cart}
          setView={this.setView}
          orderTotal={orderTotal}
        />
      );
    }
    if (name === 'checkout') {

      return (
        <CheckoutForm
          placeOrder={this.placeOrder}
          setView={this.setView}
          orderTotal={orderTotal}
        />
      );
    } else {
      return (
        <ProductDetails
          productId={params.productId}
          setView={this.setView}
          addToCart={this.addToCart}
        />
      );
    }
  }

  getCartItems() {
    fetch('/api/cart')
      .then(res => res.json())
      .then(cartItems => {
        this.setState({ cart: cartItems });
      })
      .catch(err => console.error(err));
  }

  addToCart(product) {
    const fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };

    fetch('/api/cart', fetchConfig)
      .then(res => res.json())
      .then(product => {
        const cartCopy = [...this.state.cart];
        cartCopy.push(product);
        this.setState({ cart: cartCopy });
      })
      .catch(err => console.error(err));
  }

  placeOrder(order) {
    const fetchConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    };
    fetch('/api/orders', fetchConfig)
      .then(res => res.json())
      .then(processedOrder => {
        this.setState({
          view: {
            name: 'catalog',
            params: {}
          },
          cart: []
        });
      })
      .catch(err => console.error(err));

  }

  render() {
    return this.state.isLoading
      ? <h1>Testing connections...</h1>
      : (
        <div className="bg-light">
          <Header
            cartItemCount={this.state.cart.length}
            setView={this.setView}
          />
          <div className="mt-4 py-5">
            <div className="products container-fluid">
              <div className="row justify-content-center">
                {this.renderView()}
              </div>
            </div>
          </div>
        </div>
      );
  }
}
