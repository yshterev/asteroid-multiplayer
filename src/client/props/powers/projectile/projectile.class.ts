import { Pickup } from "../pickup/pickup.class";
import { Explode } from "../../explosion/explosion.class";

export class Projectile {
  public weapon: Phaser.Weapon;
  public bulletCount: number = 10;
  public pickup: Pickup;
  private player: Phaser.Sprite;

  public constructor(private gameInstance: Phaser.Game, player?) {
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
    this.pickup = new Pickup(this.gameInstance, coors);
  }

  // our kaboom class is fairly short and straight forward
  public kaboom(projectile) {
    // all we need a new class instance with the following arguments
    new Explode(this.gameInstance, projectile);
  }
}
