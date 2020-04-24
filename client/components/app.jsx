import React from 'react';
import Header from './header';
import ProductListItem from './product-list-item';
import ProductList from './product-list';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true
    };
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    return this.state.isLoading
      ? <h1>Testing connections...</h1>
      // : <h1>{this.state.message}</h1>;
      : (
        <div className="bg-light">
          <Header />
          <div className="mt-4 pt-5">
            <div className="products container-fluid">
              <div className="row justify-content-center">
                <ProductList />
                <ProductListItem />
                <ProductListItem />
                <ProductListItem />
                <ProductListItem />
                <ProductListItem />
                <ProductListItem />
                <ProductListItem />
              </div>
            </div>
          </div>
        </div>
      );
  }
}
