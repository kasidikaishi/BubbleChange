import Phaser from "phaser";

var plateform;
var downform;
var player;
var cursors;
var treasure;
var score = 0;
var scoreText;

export default class BubbleScene extends Phaser.Scene{

  preload() {
    this.load.image('background', 'assets/background.jpg')
    this.load.image('landDown', 'assets/landDown.png')
    this.load.image('plateform-01', 'assets/plateform-01.png')
    this.load.image('plateform-02', 'assets/plateform-02.png')
    this.load.image('plateform-03', 'assets/plateform-03.png')
    this.load.image('treasure', 'assets/treasure.png')
    this.load.image('showScore', 'assets/showScore.png')
    this.load.image('failScore', 'assets/failScore.png')
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 })
  }

  create() {
    this.add.image(600, 350, 'background');

    plateform = this.physics.add.staticGroup();
    plateform.create(100, 480, 'plateform-01');
    plateform.create(300, 550, 'plateform-02');
    plateform.create(600, 380, 'plateform-03');
    plateform.create(830, 250, 'plateform-02');
    plateform.create(1000, 500, 'plateform-01');
    plateform.create(1130, 400, 'plateform-02');

    player = this.physics.add.sprite(50, 400, 'dude').setScale(1.5);
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    })
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    })

    treasure = this.physics.add.staticGroup()
    treasure.create(280, 430, 'treasure');
    treasure.create(550, 100, 'treasure');
    treasure.create(850, 190, 'treasure');
    treasure.create(1080, 455, 'treasure');
    treasure.create(1150, 340, 'treasure');
    treasure.children.iterate(child => child.setScale(0.5).refreshBody())

    cursors = this.input.keyboard.createCursorKeys();

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' })

    downform = this.physics.add.staticGroup()
    downform.create(600, 695, 'landDown')

    this.physics.add.collider(player, plateform);
    this.physics.add.collider(treasure, plateform);
    this.physics.add.overlap(player, treasure, collectTreasure, null, this)
    this.physics.add.collider(player, downform, hitDown, null, this)

    function collectTreasure(player, treasure) {
      treasure.disableBody(true, true);
      score += 10;
      scoreText.setText(`Score: ${score}`);

      if (score === 50) {
        this.physics.pause();
        this.add.image(600, 350, 'showScore');
        this.add.text(250, 280, `    Success!\nYour score is ${score}`, { fontSize: '64px', fill: '#000' })
      }
    }

    function hitDown(player, downform) {
      this.physics.pause();
      this.add.image(600, 350, 'failScore');
      this.add.text(250, 280, `    Fail...\nYour score is ${score}`, { fontSize: '64px', fill: '#fff' })
    }

  }

  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-200);
      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(200);
      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('turn');
    }
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-280);
    }
  }

}
