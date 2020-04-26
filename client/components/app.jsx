import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';

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

    if (name === 'catalog') {
      return <ProductList setView={this.setView} />;
    }
    if (name === 'cart') {
      return (
        <CartSummary
          cart={this.state.cart}
          setView={this.setView}
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

  render() {
    return this.state.isLoading
      ? <h1>Testing connections...</h1>
      : (
        <div className="bg-light">
          <Header
            cartItemCount={this.state.cart.length}
            setView={this.setView}
          />
          <div className="mt-4 pt-5">
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
