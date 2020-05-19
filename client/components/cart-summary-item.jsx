import React from 'react';

class CartSummaryItem extends React.Component {
  render() {
    const { image, name, price, shortDescription } = this.props.item;
    return (
      <div className="card p-3 my-3 mx-auto">
        <div className="d-flex align-items-center">
          <img
            src={image}
            alt={name}
            className="img-fluid scale float-left pr-3 summary-image"
          />
          <div className="">
            <h4 className="font-weight-bold">{name}</h4>
            <h5 className="text-secondary">${(price / 100).toFixed(2)}</h5>
            <p>{shortDescription}</p>

          </div>
        </div>
      </div>
    );
  }
}

export default CartSummaryItem;
