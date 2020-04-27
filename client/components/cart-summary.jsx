import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {

  renderSummaryItems() {
    const itemElements = this.props.cart.map((item, index) => {
      return (
        <CartSummaryItem key={index} item={item} />
      );
    });
    return itemElements;
  }

  render() {
    return (
      <div className="m-3 container">
        <h4
          className="text-secondary pointer"
          onClick={() => {
            this.props.setView('catalog', {});
          }}
        >
          &lt; Back to Catalog
        </h4>
        <h2>My Cart</h2>
        {this.renderSummaryItems()}
        <div className="p-0 mx-auto col-11 d-flex justify-content-between">
          <h4 className="text-secondary">
            Order Total: ${(this.props.cart.reduce((a, b) => a.price + b.price) / 100).toFixed(2)}
          </h4>
          <button
            className="btn btn-primary"
            onClick={e => {
              e.preventDefault();
              this.props.setView('checkout', {});
            }}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

export default CartSummary;
