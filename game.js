import Grid from './grid';
import Player from './player';
import Input from './input';

import _ from 'lodash';

const GAME = "GAME";
const MENU = "MENU";

class Game {
  start() {
    console.log('starting a new game');
    this.state = GAME;
    this.grid = new Grid(this);
    this.grid.init();
    this.player = new Player(this.grid);
    this.input = null;

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

    window.addEventListener('keydown', function(e) {
      if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
      }
    });

    window.onkeydown = (e) => {
      console.log(e.key);
      if (e.key === "ArrowRight") {
        this.player.moveRight();
      }

      if (e.key === "ArrowLeft") {
        this.player.moveLeft();
      }

      if (e.key === "ArrowUp") {
        this.player.rotateUp();
      }      

      if (e.code === "Space") {
        console.log("CLC")
        if (this.player.hasBlocks()) {
          this.player.releaseBlocks();
        }
      }
    }
  }

  update() {
    // console.log('updating game frame');
    const { input } = this;
    this.player.update();
    this.grid.update(this.player);
  }

  render() {
    // console.log('rendering game frame');
    let ctx = this.context;
    ctx.clearRect(0, 0, 800, 600);
    // clear debug
    document.getElementById("debug").innerHTML = "";
    this.grid.render(ctx);
    this.player.render(ctx);
    this.renderDebug();
  }

  renderDebug() {
    const debug = document.getElementById("debug");

    this.grid.data.forEach(r => {
      let ul = document.createElement('ul');
      r.forEach(s => {
        var li = document.createElement('li');
        var liContent = s ? document.createTextNode("1") : document.createTextNode("0");
        li.appendChild(liContent);
        ul.appendChild(li);
      })
      debug.appendChild(ul);
    })
  }
}

export default Game;