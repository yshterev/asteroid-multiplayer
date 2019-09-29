import { Player } from "../actors/player/player.class";
import { Controls } from "./keyboard.model";
import Phaser from "phaser-ce";

export class KeyBoardControl {
  public gameControls: Controls;

  constructor(private gameInstance: any, private playerInstance: Player) {
    const space = Phaser.KeyCode.SPACEBAR;

    this.gameControls = {
      cursors: this.gameInstance.input.keyboard.createCursorKeys(),
      fireWeapon: this.gameInstance.input.keyboard.addKey(space)
    };
  }

  public update(): void {
    if (this.playerInstance.player.alive) {
      this.playerInstance.playerState.set("fire", false);
      const vel = this.playerInstance.angularVelocity;

      if (this.gameControls.cursors.up.isDown) {
        this.gameInstance.physics.arcade.accelerationFromRotation(
          this.playerInstance.player.rotation,
          300,
          this.playerInstance.player.body.acceleration
        );
        this.playerInstance.player.animations.play("accelerating");
        this.playerInstance.playerState.set("moving", true);
      } else {
        this.playerInstance.player.body.acceleration.set(0);
        this.playerInstance.playerState.set("moving", false);
      }

      if (this.gameControls.cursors.left.isDown) {
        this.playerInstance.player.body.angularVelocity = -vel;
      } else if (this.gameControls.cursors.right.isDown) {
        this.playerInstance.player.body.angularVelocity = vel;
      } else {
        this.playerInstance.player.body.angularVelocity = 0;
      }

      // add the ability to shoot
      if (this.gameControls.fireWeapon.isDown) {
        if (this.playerInstance.projectile) {
          this.playerInstance.projectile.fireWeapon();
          // is firring
          this.playerInstance.playerState.set("fire", true);
          // update the bullet count in the player
          this.playerInstance.playerState.set(
            "ammo",
            this.playerInstance.projectile.bulletCount
          );
        } else {
          // stops firing
          this.playerInstance.playerState.set("fire", false);
        }
      }
    }
  }
}
