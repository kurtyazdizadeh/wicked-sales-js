import React from 'react';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
  }

  render() {
    return (
      <form action="">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="creditCard">Credit Card:</label>
        <input type="text" id="creditCard" name="creditCard" />
        <label htmlFor="shippingAddress">Shipping Address:</label>
        <textarea name="shippingAddress" id="shippingAddress" cols="30" rows="10"></textarea>
      </form>
    );
  }
}

export default CheckoutForm;
