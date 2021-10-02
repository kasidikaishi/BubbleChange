import Phaser from "phaser";

var plateform;
var launcher;
var cursors;
var score = 0;
var scoreText;

var bubbles;
var launchedBubble;
var launchedBubbles;

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

    launcher = this.physics.add.sprite(630, 511, 'launcher');
    launcher.setCollideWorldBounds(true);


    // Bubble
    var allBubbles = ['redBubble', 'yellowBubble', 'blueBubble', 'greenBubble'];
    var Bubble = new Phaser.Class({
      Extends: Phaser.GameObjects.Image,
      initialize:
      function Bubble(scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, allBubbles[[Math.floor(Math.random() * 4)]]);
        this.incX = 0;
        this.incY = 0;
        this.lifespan = 0;
        this.speed = Phaser.Math.GetSpeed(1500, 1);
      },
      fire: function (x, y) {
        this.setActive(true);
        this.setVisible(true);

        this.setPosition(630, 532);

        var angle = Phaser.Math.Angle.Between(x, y, 630, 532);

        this.setRotation(angle);

        this.incX = Math.cos(angle);
        this.incY = Math.sin(angle);

        this.lifespan = 1000;
      },
      update: function (time, delta) {
        this.lifespan -= delta;
        this.x -= this.incX * (this.speed * delta);
        this.y -= this.incY * (this.speed * delta);

        if (this.lifespan <= 0) {
          this.setActive(false);
          this.setVisible(false);
        }
      }
    });
    launchedBubbles = this.add.group({
      classType: Bubble,
      maxSize: 1,
      minSize: 1,
      runChildUpdate: true
    })

    launchedBubbles.children.iterate(child => {
      child.setCollideWorldBounds(true);
      child.setBounce(3)
    })

    speed = Phaser.Math.GetSpeed(300, 1);

    this.input.on('pointermove', function(pointer) {
      mouseX = pointer.x;
      mouseY = pointer.y;
    })
    this.input.on('pointerup', function(pointer) {
      isDown = false
    })
    this.input.on('pointerdown', function(pointer) {
      isDown = true
    })

    var bubble = ['redBubble', 'yellowBubble', 'blueBubble', 'greenBubble'][Math.floor(Math.random() * 4)];
    bubbles = this.physics.add.group({
      key: bubble,
      repeat: 8,
      setXY: { x: 438, y: 24, stepX: 48}
    })
    bubbles.children.iterate(child => child.setCollideWorldBounds(true))

    this.physics.add.collider(launcher, plateform);
    this.physics.add.collider(bubbles, plateform);
    this.physics.add.collider(launchedBubbles, plateform);
    this.physics.add.collider(Bubble, plateform);
    this.physics.add.collider(Bubble, bubbles, collectBubble, null, this)

    function collectBubble(launchedBubbles, bubbles) {
      if (launchedBubbles.texture.key === bubbles.texture.key) {
        bubbles.disableBody(true, true);
        launchedBubbles.disableBody(true, true);
        score += 10;
        scoreText.setText(`Score: ${score}`);
      }
      if (score >= 50) {
        this.physics.pause();
        this.add.text(330, 200, `    Success!\nYour score is ${score}`, { fontSize: '64px', fill: '#000' })
      }
    }

  }



  update(time) {
    // Bubble
    if (isDown && time > lastFired) {
      var launchedBubble = launchedBubbles.get()
      if (launchedBubble) {
        launchedBubble.fire(mouseX, mouseY);
        lastFired = time + 10;
      }
    }

    launcher.setRotation(Phaser.Math.Angle.Between(mouseX, mouseY, launcher.x, launcher.y) - Math.PI / 2)

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
