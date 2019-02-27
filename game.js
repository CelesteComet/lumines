import Grid from './grid';
import Player from './player';
import Input from './input';

const GAME = "GAME";
const MENU = "MENU";

class Game {
  start() {
    console.log('starting a new game');
    this.state = GAME;
    this.grid = new Grid;
    this.player = new Player;
    this.input = null;

    this.grid.init();

    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    this.canvas.width  = 800;
    this.canvas.height = 600;

    this.attachControlHandlers();
    requestAnimationFrame(this.loop.bind(this));
  }

  loop() {
    this.update();
    this.render();
    requestAnimationFrame(this.loop.bind(this));      
  }

  attachControlHandlers() {
    window.onkeydown = (e) => {
      console.log(e.key);
      if (e.key === "ArrowRight") {
        this.player.moveRight();
      }

      if (e.key === "ArrowLeft") {
        this.player.moveLeft()
      }

      if (e.code === "Space") {
        this.grid.releasePlayerBlocks();
      }
    }
  }

  update() {
    // console.log('updating game frame');
    const { input } = this;
    console.log(input);
    this.grid.update(this.player);
  }

  render() {
    // console.log('rendering game frame');
    let ctx = this.context;
    ctx.clearRect(0, 0, 800, 600);
    this.grid.render(ctx);
  }
}

export default Game;