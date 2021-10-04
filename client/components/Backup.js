    // var LaunchedBubble = new Phaser.Class({
    //   Extends: Phaser.GameObjects.Image,
    //   initialize:
    //   function LaunchedBubble (scene) {
    //     Phaser.GameObjects.Image.call(this, scene, 630, 575, bubbles[Math.floor(Math.random() * 5)]);
    //     this.incX = 0;
    //     this.incY = 0;
    //     this.lifespan = 0;
    //     this.speed = Phaser.Math.GetSpeed(1000, 1);
    //   },

    //   fire: function(x, y) {
    //     this.setActive(true);
    //     this.setVisible(true);
    //     this.setPosition(630, 575);
    //     var angle = Phaser.Math.Angle.Between(x, y, 630, 575);
    //     this.setRotation(angle);
    //     this.incX = Math.cos(angle);
    //     this.incY = Math.sin(angle);
    //     this.lifespan = 1000;
    //   },
    //   update: function(time, delta) {
    //     this.lifespan -= delta;
    //     this.x -= this.incX * (this.speed * delta);
    //     this.y -= this.incY * (this.speed * delta);
    //     if (this.lifespan <= 0) {
    //       this.setActive(false);
    //       this.setVisible(false);
    //     }
    //     this.setPosition(630, 575);
    //   }
    // });

    // launchedBubbles = this.add.group({
    //   classType: LaunchedBubble,
    //   minSize: 1,
    //   maxSize: 1,
    //   runChildUpdate: true
    // });

    // this.input.on('pointerdown', function(pointer) {
    //   isDown = true;
    //   mouseX = pointer.x;
    //   mouseY = pointer.y;
    // })

    // this.input.on('pointermove', function(pointer) {
    //   angle = Phaser.Math.Angle.BetweenPoints(launcherBody, pointer);
    //   launcherHead.rotation = angle;
    //   mouseX = pointer.x;
    //   mouseY = pointer.y;
    // }, this)

    // this.input.on('pointerup', function(pointer) {
    //   // this.physics.velocityFromRotation(angle, 1000, launchedBubble.body.velocity);
    //   isDown = false;
    // })
    // launchedBubble = this.physics.add.sprite(630, 575, bubbles[Math.floor(Math.random() * 5)])
    // launchedBubble.setData('fired', true);

    // for (let i=0; i < 100; i++) {
    //   launchedBubble = this.physics.add.sprite(630, 575, bubbles[Math.floor(Math.random() * 5)])
    //   launchedBubble.setData('fired', true);
    //   launchedBubbles.push(launchedBubble);
    // }
