import { Pickup } from "../pickup/pickup.class";

export class Projectile {
  public weapon: Phaser.Weapon;
  public bulletCount: number = 10;
  public pickup: Pickup;
  private player: Phaser.Sprite;
  private gameInstance: Phaser.Game;

  public constructor(gameInstance, player?) {
    this.gameInstance = gameInstance;
    this.weapon = this.gameInstance.add.weapon(10, "laser");
    this.weapon.fireLimit = this.bulletCount;
    this.weapon.fireRate = 150;
    this.weapon.bulletSpeed = 400;

    if (player) {
      this.player = player;
      this.weapon.trackSprite(this.player, 10, 0, true);
    }
  }

  public fireWeapon() {
    this.weapon.fire();
    this.bulletCount = this.weapon.fireLimit - this.weapon.shots;
  }

  public renderPickup(coors): void {
    this.pickup = new Pickup(this.gameInstance, { x: 12, y: 12 });
  }
}
