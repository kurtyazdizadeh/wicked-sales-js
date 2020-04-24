import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'catalog',
        params: {}
      }
    };
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
  }

  renderView() {
    if (this.state.view.name === 'catalog') {
      return <ProductList setView={this.setView} />;
    } else {
      return (
        <ProductDetails
          productId={this.state.view.params.productId}
          setView={this.setView}
        />
      );
    }
  }

  render() {
    return this.state.isLoading
      ? <h1>Testing connections...</h1>
      : (
        <div className="bg-light">
          <Header />
          <div className="mt-4 pt-5">
            <div className="products container-fluid">
              <div className="row justify-content-center">
                {this.renderView()}
              </div>
            </div>
          </div>
        </div>
      );
  }
}
