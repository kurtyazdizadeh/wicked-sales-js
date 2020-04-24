import React from 'react';

class ProductListItem extends React.Component {
  render() {
    const { name, image, price, desc } = this.props;
    return (
      <div className="card m-2 col-3">
        <img src={image} className="card-img-top h-50 mt-3 scale" alt={name} />
        <div className="card-body">
          <h5 className="card-title font-weight-bold">{name}</h5>
          <h6 className="text-secondary">${price}</h6>
          <p className="card-text">{desc}</p>
        </div>
      </div>
    );
  }
}

export default ProductListItem;