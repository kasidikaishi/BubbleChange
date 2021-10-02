import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div className="nav">
          <Link to="/home">Home</Link>
          <Link to="/bubblegame">Get your bubbles</Link>
          <Link to="/shoppingmall">Go to shopping</Link>
          {/* The navbar will show these links after you log in */}
          <a href="#" onClick={handleClick}>
            Logout
          </a>

          {/* Need to show the username and link to the user's home page when a user is loggin in */}
          <div>username</div>
        </div>
      ) : (
        <div className="nav">
          <Link to="/home">Home</Link>
          <Link to="/bubblegame">Get your bubbles</Link>
          <Link to="/shoppingmall">Go to shopping</Link>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
