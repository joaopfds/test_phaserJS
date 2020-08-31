//test+++
import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import staricon from "./assets/star.png";
import puma from "./assets/puma_limimari.png";
import highway from "./assets/asfalto.png";
import mapPNG from "./assets/pngbarn (1).png";
import mapJSON from "./assets/map2.json";
import playerPNG from "./assets/airfoce1.png";


const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 900,
  height: 900,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
let player
var cursors

function preload() {
  this.load.image("tiles", mapPNG);
  this.load.tilemapTiledJSON("map", mapJSON);
  this.load.image("logo", puma);
  this.load.spritesheet("player", playerPNG, {
    frameWidth: 32,
    frameHeight: 60,
  });
}

function create() {
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("assets", "tiles");

  const ground2 = map.createStaticLayer("objectcolider", tileset, 0, 0);
  const ground = map.createStaticLayer("ground", tileset, 0, 0);

  player = this.physics.add.sprite(100,300, "player");
  
  

  /*const logo = this.add.image(450, 300, "logo");

  this.tweens.add({
    targets: logo,
    y: 225,
    duration: 800,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });*/

  
}
function update() {
  
  player.body.setVelocity(15);
  cursors = this.input.keyboard.createCursorKeys();

  //keyboard press to move
  if (cursors.left.isDown) {
    player.body.setVelocityX(-150);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(150);
  } else if (cursors.up.isDown) {
    player.body.setVelocityY(-150);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(150);
  } 

}
/*import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import staricon from "./assets/star.png";
import puma from "./assets/puma_limimari.png"
import highway from "./assets/asfalto.png"


const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create
  }
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("logo", puma);
  this.load.image("star", staricon);
  this.load.image("background", highway);
  this.load.image("tiles", "../assets/pngbarn (1).png" )
  this.load.tilemapTiledJSON("map","../assets/test.json")


}

function create() {
  this.add.image(400, 300, "background");

  const logo = this.add.image(400, 150, "logo");
  const icon = this.add.image(40, 15, "star");
  const icon2 = this.add.image(80, 30, "star");

  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 10000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });

  this.tweens.add({
    targets: icon,
    y: 410,
    duration: 5000,
    ease: "Power2",
    yoyo: true,
    loop: -1
  });

  this.tweens.add({
    targets: icon2,
    y: 400,
    duration: 5100,
    ease: "Power",
    yoyo: true,
    loop: -1
  });
}*/
/*import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import mapPNG from "./assets/assetsmap.png";
import mapJSON from "./assets/map.json";
import water from "./assets/water.png";
import playerPNG from "./assets/player5.png";
import enemyPNG from "./assets/slime.png";
import Enemies from "./Enemies";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 650,
  height: 650,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);
let player;
var cursors;
var enemies;

function preload() {
  this.load.image("background", water);

  this.load.image("tiles", mapPNG);
  this.load.tilemapTiledJSON("map", mapJSON);
  this.load.spritesheet("player", playerPNG, {
    frameWidth: 32,
    frameHeight: 60,
  });
  this.load.image("slime", enemyPNG);
}

function create() {
  const map = this.make.tilemap({ key: "map" });
  const tileset = map.addTilesetImage("assets", "tiles");

  this.add.image(650, 650, "background");

  const ground = map.createStaticLayer("ground", tileset, 0, 0);
  const objectCollider = map.createStaticLayer("objectCollider", tileset, 0, 0);
  const aboveCollider = map.createStaticLayer("aboveObject", tileset, 0, 0);

  objectCollider.setCollisionByProperty({ collider: true });
  aboveCollider.setDepth(10);
  //player
  
  const spawnPoint = map.findObject(
    //player and not Player like your variable
    "player",
    (objects) => objects.name === "spawning point"
  );

  player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player");

  this.physics.add.collider(player, objectCollider);

  //first enemy name of the object
  //secound enemy the name now to object
  this.enemies = map.createFromObjects("enemy", "enemy", {});
  this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies);

  this.physics.add.collider(this.enemiesGroup, player, hitEnemy, null, this);
  //enemy collider object
  this.physics.add.collider(this.enemiesGroup, objectCollider);
  //animations

  const anims = this.anims;
  anims.create({
    key: "left",
    frames: anims.generateFrameNames("player", { start: 20, end: 21 }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "right",
    frames: anims.generateFrameNames("player", { start: 20, end: 21 }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "front",
    frames: anims.generateFrameNames("player", { start: 0, end: 9 }),
    frameRate: 10,
    repeat: -1,
  });
  anims.create({
    key: "back",
    frames: anims.generateFrameNames("player", { start: 11, end: 19 }),
    frameRate: 10,
    repeat: -1,
  });

  //the CAMERA
  const camera = this.cameras.main;
  camera.startFollow(player);
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
}

function update() {
  //put here  before your velocity is 0
  const prevVelocity = player.body.velocity.clone();
  //stop player when stop press the key
  player.body.setVelocity(0);
  cursors = this.input.keyboard.createCursorKeys();

  //keyboard press to move
  if (cursors.left.isDown) {
    player.body.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(200);
  } else if (cursors.up.isDown) {
    player.body.setVelocityY(-200);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(200);
  }

  //set animations per key pressed
  if (cursors.left.isDown) {
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.anims.play("right", true);
  } else if (cursors.up.isDown) {
    //its because when you go, you need see the back of your character
    player.anims.play("back", true);
  } else if (cursors.down.isDown) {
    player.anims.play("front", true);
  } else {
    player.anims.stop();

    //front animation

    if (prevVelocity.x < 0) player.setTexture("player", "left");
    else if (prevVelocity.x > 0) player.setTexture("player", "right");
    else if (prevVelocity.y < 0) player.setTexture("player", "back");
    else if (prevVelocity.y > 0) player.setTexture("player", "front");
  }
}

function hitEnemy(player, enemyGroup) {
  this.scene.restart();
}


//var config = {
  /*type: Phaser.AUTO,
  width: 800,
  height: 600,
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
  }*/
//};
