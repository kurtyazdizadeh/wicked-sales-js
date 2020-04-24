import React from 'react';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('/api/products')
      .then(res => {
        return res.json();
      })
      .then(productArray => {
        this.setState({ products: productArray });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>test</div>
    );
  }
}

export default ProductList;
