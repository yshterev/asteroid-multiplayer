import { Player } from "../actors/player/player.class";
import { Projectile } from "../props/powers/projectile/projectile.class";

export class Game {
  private actors: Array<Player>;
  private actor: Player;
  private projectile: Projectile;

  protected manageAssets(game): void {
    this.actors = [];
    // later will contain all of our game logic code
    this.actor = new Player(game);

    this.projectile = new Projectile(game);
    this.projectile.renderPickup();
  }

  protected gameUpdate(game?): void {
    if (this.actor && this.actor.controls) {
      this.actor.view();

      if (this.projectile) {
        // implement the overlap check
        game.physics.arcade.overlap(
          this.projectile.pickup.item,
          this.actor.player,
          (pickup, actor) => {
            // on collide
            console.log('on collide', this.actor)
            this.actor.assignPickup(game, this.actor);
            pickup.kill();
          }
        );
      }
    }
  }

  protected properties(game): void {
    game.stage.disableVisibilityChange = true;
    game.add.tileSprite(0, 0, game.width, game.height, "space");
    game.add.sprite(0, 0, "space");
    game.time.desiredFps = 60;
    game.renderer.clearBeforeRender = false;
    game.physics.startSystem(Phaser.Physics.ARCADE);
  }
}
