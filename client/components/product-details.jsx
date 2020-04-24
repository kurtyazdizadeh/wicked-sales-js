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
        <div className="col-10 d-flex">
          <div className="row">
            <h4
              onClick={() => {
                this.props.setView('catalog', {});
              }}
            >
                &lt; Back to Catalog
            </h4>
          </div>
          <div className="row">
            <img src={image} alt={name} className="col-6 h-50 scale" />
            <div className="product-info d-flex flex-column col-6">
              <h2 className="font-weight-bold">{name}</h2>
              <h3 className="text-secondary">${(price / 100).toFixed(2)}</h3>
              <p>{shortDescription}</p>
            </div>
            <div className="row">
              {longDescription}
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default ProductDetails;
