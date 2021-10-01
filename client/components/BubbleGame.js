import React from 'react'
import Phaser from 'phaser'
import BubbleScene from './BubbleScene'

class BubbleGame extends React.Component {

  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      width: 1200,
      height: 700,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scene: [BubbleScene]
    };
    new Phaser.Game(config)
  }

  render() {
    return (
      <div id="phaser-game">
      </div>
    )
  }
}

export default BubbleGame
