import axios from 'axios'

const SET_PRODUCTS = 'SET_PRODUCTS'

const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products
})

export const setProductsThunk = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(setProducts(data))
    } catch (error) {
      console.log(error)
    }
  }
}

function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productsReducer
