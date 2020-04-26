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
      </div>
    );
  }
}

export default CartSummary;
