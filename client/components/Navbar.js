import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, userId, username}) => {
  let score;
  if (userId && window.localStorage.getItem('score')) {
    score = JSON.parse(window.localStorage.getItem('score'));
    window.localStorage.removeItem('score');
  }

  return (
  <div>
    <nav>
      {isLoggedIn ? (
        <div className="nav">
          <Link to={`/home/${userId}`}>Home</Link>
          <Link to={`/bubblegame/${userId}`}>Get your bubbles</Link>
          <Link to={`/shoppingmall/${userId}`}>Go to shopping</Link>
          {/* The navbar will show these links after you log in */}
          <span>{username}</span>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <span>{score}</span>
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
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.auth.id,
    userId: state.auth.id,
    username: state.auth.username,
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
