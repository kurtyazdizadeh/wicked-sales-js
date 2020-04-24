import React from 'react';

class ProductListItem extends React.Component {
  render() {
    return (
      <div className="card m-2 col-3">
        <img src="../images/shake-weight.jpg" className="card-img-top mt-3 scale" alt="..." />
        <div className="card-body">
          <h5 className="card-title font-weight-bold">Card title</h5>
          <h6 className="text-secondary">$29.99</h6>
          <p className="card-text">Dynamic Inertia technology ignites muscles in arms, shoulders, and chest.</p>
        </div>
      </div>
    );
  }
}

export default ProductListItem;
