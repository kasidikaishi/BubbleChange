import Phaser from "phaser";

var plateform;
var launchedBubbles = [];
var launchedBubbleGroup;
var launchedBubble;
var angle = 0;
var score = 0;
var scoreText;
var cursors;
var isDown = false;
var mouseX = 0;
var mouseY = 0;
var launcherHead;
var launcherBody;

export default class BubbleScene extends Phaser.Scene{

  preload() {
    this.load.image('background', 'assets/bubble/background.png')
    this.load.image('bgInterface', 'assets/bubble/bgInterface.png')
    this.load.image('bgInterfacePlateform', 'assets/bubble/bgInterfacePlateform.png')
    this.load.image('plateform', 'assets/plateform.png')
    this.load.image('launcherHead', 'assets/bubble/launcherHeadRight.png')
    this.load.image('launcherBody', 'assets/bubble/launcherBody.png')
    this.load.image('blue', 'assets/bubble/blue.png')
    this.load.image('red', 'assets/bubble/red.png')
    this.load.image('yellow', 'assets/bubble/yellow.png')
    this.load.image('green', 'assets/bubble/green.png')
    this.load.image('purpple', 'assets/bubble/purpple.png')
    this.load.spritesheet('blueSprite', 'assets/bubble/blue.png', {frameWidth: 52, frameHeight: 52})
    this.load.spritesheet('redSprite', 'assets/bubble/red.png', {frameWidth: 52, frameHeight: 52})
    this.load.spritesheet('yellowSprite', 'assets/bubble/yellow.png', {frameWidth: 52, frameHeight: 52})
    this.load.spritesheet('greenSprite', 'assets/bubble/green.png', {frameWidth: 52, frameHeight: 52})
    this.load.spritesheet('purppleSprite', 'assets/bubble/purpple.png', {frameWidth: 52, frameHeight: 52})

  }

  create() {
    this.add.image(630, 330, 'background');
    this.add.image(630, 330, 'bgInterface');
    // this.load.atlas('flood', 'assets/bubble/shapes.png', 'assets/bubble/shapes.json');
    plateform = this.physics.add.staticGroup();
    plateform.create(400, 290, 'plateform');
    plateform.create(860, 290, 'plateform');

    cursors = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(1000, 80, `  Get  \nBubbles\n\n ${score}`, { fontSize: '32px', fill: '#000' })

    var bubbles = ['red', 'yellow', 'blue', 'green', 'purpple'];
    var bubbleSprite = ['redSprite', 'yellowSprite', 'blueSprite', 'greenSprite', 'purppleSprite']

    var bubble = this.physics.add.staticGroup();
    var bubblePositionX = 441;
    for (let i=1; i < 9; i++) {
      bubble.create(bubblePositionX, 24, bubbleSprite[Math.floor(Math.random() * 5)]);
      bubblePositionX += 52
    }
    bubblePositionX = 441 + 26;
    for (let j=1; j < 7; j++) {
      if (j !== 3) {
        bubble.create(bubblePositionX, 76, bubbleSprite[Math.floor(Math.random() * 5)]);
      }
      bubblePositionX += 52;
    }
    bubblePositionX = 441 + 52;
    for (let k=1; k < 6; k++) {
      if (k !== 2) {
        bubble.create(bubblePositionX, 128, bubbleSprite[Math.floor(Math.random() * 5)]);
      }
      bubblePositionX += 52;
    }
    bubble.create(623, 180, bubbleSprite[Math.floor(Math.random() * 5)]);

    launcherHead = this.add.image(630, 575, 'launcherHead')
    launcherBody = this.add.image(630, 616, 'launcherBody')

    launchedBubbleGroup = this.physics.add.group()
    for (let i=0; i < 100; i++) {
      launchedBubbleGroup.create(630, 575, bubbleSprite[Math.floor(Math.random() * 5)]).setActive(true).setVisible(true).setBounce(1);
    }

    this.input.on('pointerdown', function(pointer) {
      const a = launchedBubbleGroup.getLast(true)
      this.physics.velocityFromRotation(angle, 1000, a.body.velocity);
      isDown = true;
      launchedBubbleGroup.kill(a);
    }, this)

    this.input.on('pointermove', function(pointer) {
      angle = Phaser.Math.Angle.BetweenPoints(launcherBody, pointer);
      launcherHead.rotation = angle;
    }, this)

    this.input.on('pointerup', function(pointer) {
      isDown = false;
    }, this)

    this.physics.add.collider(bubble, plateform);
    this.physics.add.collider(launchedBubbleGroup, plateform);
    this.physics.add.collider(launchedBubbleGroup, bubble, collectBubble, null, this)
    this.physics.add.collider(launchedBubbleGroup, launchedBubbleGroup, collectLaunchedBubble, null, this)

    function collectBubble(launchedBubbleGroup, bubble) {
      // const launchedBubbleName = launchedBubbleGroup.texture.key;
      // if (launchedBubbleName.slice(0, launchedBubbleName.length - 6) === bubble.texture.key) {
      if (launchedBubbleGroup.texture.key === bubble.texture.key) {
        launchedBubbleGroup.disableBody(true, true);
        bubble.disableBody(true, true);
        score += 20;
        scoreText.setText(`  Get  \nBubbles\n\n ${score}`);
        window.localStorage.setItem(
          'score', JSON.stringify(score)
        )

      } else {
        launchedBubbleGroup.setVelocity(0);
        // bubble.setVelocity(0);
      }
      // if (score >= 200) {
      //   this.physics.pause();
      //   this.add.text(330, 200, `    Success!\nYour score is ${score}`, { fontSize: '64px', fill: '#000' })
      // }
    }

    function collectLaunchedBubble(bubble1, bubble2) {
      if (bubble1.texture.key === bubble2.texture.key && bubble1.y < 440 && bubble2.y < 440) {
        bubble1.disableBody(true, true);
        bubble2.disableBody(true, true);
        score += 20;
        scoreText.setText(`  Get  \nBubbles\n\n ${score}`);
        window.localStorage.setItem(
          'score', JSON.stringify(score)
        )
      } else {
        bubble1.setVelocity(0);
        bubble2.setVelocity(0);
      }

    }

  }

  update() {
    // if (isDown) {
    //   window.localStorage.setItem(
    //     'score', JSON.stringify(score)
    //   )
    // }
  }

}
