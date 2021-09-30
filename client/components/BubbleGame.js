import React, { useEffect } from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'

const BubbleGame = () => {
  var config = {
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
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  };
  var plateform;
  var downform;
  var player;
  var cursors;
  var treasure;
  var score = 0;
  var scoreText;


  function preload() {

  }

  function create() {

  }

  function update() {

  }

  useEffect(() => {
    this.game = new Phaser.Game(config)
  })

  return (
    <IonPhaser game={this.state.game} initialize={this.state.initialize} />
  )
}

export default BubbleGame
