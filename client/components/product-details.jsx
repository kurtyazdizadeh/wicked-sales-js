import React from 'react';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    const { productId } = this.props;

    fetch(`api/products/${productId}`)
      .then(res => res.json())
      .then(product => {
        this.setState({ product: product });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.product) {
      const { name, image, price, shortDescription, longDescription } = this.state.product;
      return (
        <div className="card col col-8-lg d-flex flex-column m-3">
          <div className="row p-3">
            <h4
              className="text-secondary pointer"
              onClick={() => {
                this.props.setView('catalog', {});
              }}
            >
                &lt; Back to Catalog
            </h4>
          </div>
          <div className="row">
            <img src={image} alt={name} className="col-6 scale limit-height" />
            <div className="product-info d-flex flex-column col-6">
              <h2 className="font-weight-bold">{name}</h2>
              <h3 className="text-secondary">${(price / 100).toFixed(2)}</h3>
              <p>{shortDescription}</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.props.addToCart(this.state.product);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="row p-3">
            {longDescription}
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default ProductDetails;
