import React from 'react'
import {connect} from 'react-redux'

// export const Home = props => {
//   const {username} = props

//   return (
//     <div>
//       <h3>Welcome, {username}</h3>
//     </div>
//   )
// }

// const mapState = state => {
//   return {
//     username: state.auth.username
//   }
// }

// export default connect(mapState)(Home)

class Home extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <h1>Welcome to the BUBBLUE CHANGE!</h1>
        <p>Ajfas dkfja sdfaklsd fjasdkj fasdkf jaskdfj af asd fajdks fjaksd jfas fjaks dfaskdfjaksdfj askdfj askdfj akfdj aksdfj sakdfj asdkfj asdkf jaksdlfj askdf asdkjfhdsfk asefie ejaek jei ah feieoaenmae ei ehfuaefieafejael fiaefkja ef aeikf asne f</p>
      </div>
    )
  }
}

export default Home
