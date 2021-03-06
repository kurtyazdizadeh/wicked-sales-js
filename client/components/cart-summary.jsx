import React from 'react';
import CartSummaryItem from './cart-summary-item';

class CartSummary extends React.Component {

  renderSummaryItems() {
    const itemElements = this.props.cart.map((item, index) => {
      return (
        <CartSummaryItem key={index} item={item} />
      );
    });
    if (itemElements.length > 0) return itemElements;
    return <h4 className="m-3 text-center">There are no items in your cart.</h4>;
  }

  render() {
    const { orderTotal } = this.props;
    return (
      <div className="container">
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
        <div className="p-0 d-flex justify-content-between">
          <h5 className="text-secondary mr-1">
            {orderTotal ? `Order Total: $${orderTotal}` : ''}
          </h5>
          {orderTotal
            ? <button
              className="btn btn-primary"
              onClick={e => {
                e.preventDefault();
                this.props.setView('checkout', {});
              }}
            >
                Checkout
            </button>
            : <button
              className="btn btn-primary"
              onClick={e => {
                e.preventDefault();
                this.props.setView('catalog', {});
              }}
            >
                Go Back
            </button>
          }
        </div>
      </div>
    );
  }
}

export default CartSummary;
