import Phaser from 'phaser'

var scoreText;
var score = 0;
var landNotUsed;
var landIsUsed;

export default class GrowBubble extends Phaser.Scene {

  preload() {
    this.load.image('gameInterface', 'assets/background.jpg')
    this.load.image('plateform', 'assets/plateform.png')
    this.load.image('landNotUsed', 'assets/landNotUsed.png')
    this.load.image('landIsUsed', 'assets/landIsUsed.png')
    this.load.image('blueBubble', 'assets/blueBubble.png')
    this.load.image('redBubble', 'assets/redBubble.png')
    this.load.image('yellowBubble', 'assets/yellowBubble.png')
    this.load.image('greenBubble', 'assets/greenBubble.png')
  }

  create() {
    scoreText = this.add.text(200, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });

    this.add.image()

    landNotUsed = this.physics.add.staticGroup();
    var landPositionX = 330;
    var landPositionY = 170;
    for (let i=1; i < 7; i++) {
      landNotUsed.create(landPositionX, 170, 'landNotUsed');
      for (let j=1; j < 4; j++) {
        landNotUsed.create(landPositionX, landPositionY, 'landNotUsed');
        landPositionY += 123;
      }
      landPositionX += 123;
      landPositionY = 170;
    }






  }

  update() {

  }
}
