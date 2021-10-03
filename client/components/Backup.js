import Phaser from "phaser";

var plateform;
var launcher;
var cursors;
var score = 0;
var scoreText;

var bubbles;
var launchedBubble;
var launchedBubbles;

var angle = 0;

var stats;
var speed;
var lastFired = 0;
var isDown = false;
var mouseX = 0;
var mouseY = 0;


export default class BubbleScene extends Phaser.Scene{

  preload() {
    this.load.image('gameInterface', 'assets/background.jpg')
    this.load.image('plateform', 'assets/plateform.png')
    this.load.image('launcher', 'assets/launcher.png')
    this.load.image('launcherHead', 'assets/launcherHead.png')
    this.load.image('launcherBody', 'assets/launcherBody.png')
    this.load.image('blueBubble', 'assets/blueBubble.png')
    this.load.image('redBubble', 'assets/redBubble.png')
    this.load.image('yellowBubble', 'assets/yellowBubble.png')
    this.load.image('greenBubble', 'assets/greenBubble.png')
    // this.load.spritesheet('launcher', 'assets/launcher.png', { frameWidth: 180, frameHeight: 137 })
  }

  create() {
    this.add.image(630, 290, 'gameInterface');

    plateform = this.physics.add.staticGroup();
    plateform.create(400, 290, 'plateform');
    plateform.create(860, 290, 'plateform');

    cursors = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(200, 16, 'Score: 0', { fontSize: '32px', fill: '#000' })

    var bubbles = ['redBubble', 'yellowBubble', 'blueBubble', 'greenBubble'];
    var bubble = this.physics.add.staticGroup();
    var bubblePositionX = 438;
    for (let i=1; i < 10; i++) {
      bubble.create(bubblePositionX, 24, bubbles[Math.floor(Math.random() * 4)]);
      bubblePositionX += 48
    }

    var launcherHead = this.add.image(630, 532, 'launcherHead')
    var launcherBody = this.add.image(630, 532, 'launcherBody')

    launchedBubble = this.physics.add.sprite(630, 532, ['redBubble', 'yellowBubble', 'blueBubble', 'greenBubble'][Math.floor(Math.random() * 4)]).setBounce(1);
    launchedBubble.setData('fired', true);


    this.input.on('pointermove', function(pointer) {
      angle = Phaser.Math.Angle.BetweenPoints(launcherBody, pointer);
      launcherHead.rotation = angle;
      if (launchedBubble.getData('fired')) {
        launchedBubble.x = 630;
      }
    }, this)

    this.input.on('pointerup', function() {
      this.physics.velocityFromRotation(angle, 1000, launchedBubble.body.velocity);
      if (launchedBubble.getData('fire')) {
        launchedBubble.setData('fired', false)
      }
    }, this)

    // this.input.on('pointerdown', function() {
    //   launchedBubble = this.physics.add.sprite(630, 532, ['redBubble', 'yellowBubble', 'blueBubble', 'greenBubble'][Math.floor(Math.random() * 4)]).setBounce(1);
    //   launchedBubble.setData('fired', true);

    // }, this)

    this.physics.add.collider(bubble, plateform);
    this.physics.add.collider(launchedBubble, plateform);
    this.physics.add.collider(launchedBubble, bubble, collectBubble, null, this)

    function collectBubble(launchedBubble, bubble) {
      if (launchedBubble.texture.key === bubble.texture.key) {
        bubble.disableBody(true, true);
        launchedBubble.disableBody(true, true);
        score += 10;
        scoreText.setText(`Score: ${score}`);
      } else {
        launchedBubble.setBounce(false)
      }
      if (score >= 50) {
        this.physics.pause();
        this.add.text(330, 200, `    Success!\nYour score is ${score}`, { fontSize: '64px', fill: '#000' })
      }
    }

  }



  update() {
    // Bubble
    // if (isDown && time > lastFired) {
    //   var launchedBubble = launchedBubbles.get()
    //   if (launchedBubble) {
    //     launchedBubble.fire(mouseX, mouseY);
    //     lastFired = time + 10;
    //   }
    // }

    // if (cursors.up.isDown) {
    //   launchedBubble.setVelocityY(-1000);
    // }
    // if (cursors.left.isDown) {
    //   launcher.setVelocityX(-200);
    //   if (launchedBubble.y >= 532) {
    //     launchedBubble.setVelocityX(-200);
    //   }
    // } else if (cursors.right.isDown) {
    //   launcher.setVelocityX(200);
    //   if (launchedBubble.y >= 532) {
    //     launchedBubble.setVelocityX(200);
    //   }
    // } else {
    //   launcher.setVelocityX(0);
    //   if (launchedBubble.y >= 532) {
    //     launchedBubble.setVelocityX(0);
    //   }
    // }
  }

}
