import React from 'react'
import Phaser from 'phaser'
import BubbleScene from './BubbleScene'
// import Flood from './ColorBubble'

class BubbleGame extends React.Component {
  constructor() {
    super()
    this.state = {
      game: false,
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      game: true,
    })
    const config = {
      type: Phaser.AUTO,
      width: 1260,
      height: 660,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
          debug: false
        }
      },
      scene: [BubbleScene]
    };
    new Phaser.Game(config)

  }

  render() {
    return (
      <div>
        {this.state.game ? '' : (
          <button type="button" onClick={this.handleClick}>Get Your Bubbles!</button>
        )}
      </div>
    )
  }
}

export default BubbleGame
