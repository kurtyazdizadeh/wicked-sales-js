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
      <div className="m-3 container">
        <h2>My Cart</h2>
        <h4 className="text-secondary">Order Total: ${this.props.orderTotal}</h4>
        <form className="col">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="creditCard">Credit Card:</label>
            <input type="text" id="creditCard" name="creditCard" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="shippingAddress">Shipping Address:</label>
            <textarea name="shippingAddress" id="shippingAddress" cols="30" rows="10" className="form-control"></textarea>
          </div>
          <div className="form-group d-flex justify-content-between">
            <h4
              className="text-secondary pointer"
              onClick={() => {
                this.props.setView('catalog', {});
              }}
            >
                &lt; Continue Shopping
            </h4>
            <button className="btn btn-primary" type="submit">Place Order</button>
          </div>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
