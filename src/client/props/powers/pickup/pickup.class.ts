import Phaser from "phaser-ce";

export class Pickup {
  // We shall need the item we would want to be able to pickup. This
  // Item will have to be accessible to other classes as well, so we shall
  // mark it as public
  public item: Phaser.Sprite;

  constructor(game, coors) {
    // When generating the pickup, we want to pass two arguments. One
    // being the game instance we have created with Phaser. This is
    // needed to place the item into the phaser world
    this.item = game.add.sprite(coors.x, coors.y, "pickup");
    // Since players can pick up the pickup item in the game. We will
    // add physics to the object, to detect if any other Phaser
    // objects have collided or overlapped with this one pickup
    game.physics.enable(this.item, Phaser.Physics.ARCADE);
  }
}
