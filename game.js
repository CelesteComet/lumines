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

    this.grid.init();

    this.canvas = document.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    this.canvas.width  = 800;
    this.canvas.height = 600;

    this.attachControlHandlers();
    this.loop();
  }

  loop() {
    var _self = this;
    window.requestAnimationFrame(() => {
      let input = this.getPlayerInput();
      console.log(input);
      this.update(input);
      this.render();      
      _self.loop();
    });
  }

  attachControlHandlers() {
    let _self = this;
    window.onkeydown = (e) => {
      _self.input = e;
    }
  }

  getPlayerInput() {
    let currentInput = this.input;
    this.input = null;
    return currentInput;
  }

  update() {
    // console.log('updating game frame');
    this.grid.update(this.input);
  }

  render() {
    // console.log('rendering game frame');
    let ctx = this.context;
    ctx.clearRect(0, 0, 800, 600);
    this.grid.render(ctx);
  }
}

export default Game;