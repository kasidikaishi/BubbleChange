import React from "react";
import { connect } from "react-redux"
import { setProductsThunk } from '../store/products'
import Product from "./Product";

class ShoppingMall extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const products = this.props.products || [];
    return (
      <div>
        <div className="all-products">
          {products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products
})

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(setProductsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingMall)
