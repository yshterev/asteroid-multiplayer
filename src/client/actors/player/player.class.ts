import { KeyBoardControl } from "../../controls/keyboard.class";
import { Projectile } from "../../props/powers/projectile/projectile.class";
import { Hud } from "../../hud/hud.class";
import Phaser from "phaser-ce";

export interface IPlayer extends Phaser.Sprite {
  id: string;
}

export class Player {
  public player: IPlayer;
  public controls: KeyBoardControl;
  public playerState: Map<string, boolean | number>;
  public angularVelocity: number = 600;
  public projectile: Projectile;
  public hud: Hud;

  constructor(private gameInstance: Phaser.Game, public playerInstance?: any) {
    this.createPlayer(this.gameInstance);
    this.playerState = new Map();
  }

  public createPlayer(gameInstance: Phaser.Game): void {
    this.hud = new Hud();

    this.addControls();
    this.player = gameInstance.add.sprite(
      100,
      100,
      "shooter-sprite"
    ) as IPlayer;
    this.player.id = "1";
    this.player.anchor.setTo(0.5, 0.5);
    this.player.animations.add("accelerating", [1, 0], 60, false);
    this.player.name = "Your name";
    this.attachPhysics(gameInstance);

    this.hud.setName(gameInstance, this.player);
  }

  public assignPickup(game, player?): void {
    // create a new instance of the projectile and assign it
    // immediately to the player who has picked up the projectile
    this.projectile = new Projectile(game, player.player);

    // update the player state indicating that the player has ammo in
    // her possession, let's set the ammo to the projectile's default
    // bullet count to make the source of truth at one place
    this.playerState.set("ammo", this.projectile.bulletCount);

    // update hud on ammo pickup
    this.hud.setAmmo(game, player.player, this.projectile);
  }

  public view(): void {
    this.controls.update();

    if (this.projectile) {
      // take advantage of the game-loop to update the ammo
      // count if the player has been using her projectiles
      this.hud.update(this.playerState.get("ammo"));
    }
  }

  private addControls(): void {
    this.controls = new KeyBoardControl(this.gameInstance, this);
  }

  private attachPhysics(gameInstance): void {
    gameInstance.physics.enable(this.player, Phaser.Physics.ARCADE);
    this.player.body.collideWorldBounds = true;
    this.player.body.bounce.setTo(10, 10);
    this.player.body.gravity.y = 0;
    this.player.body.drag.set(150);
    this.player.body.maxVelocity.set(200);
    this.player.body.immovable = false;
  }
}
