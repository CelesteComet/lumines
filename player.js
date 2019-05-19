import Block from './block';

class Player {
  constructor(grid) {
    this.blocks = [];
    this.move = null;
    this.grid = grid;
    this.getBlocks();
  }

  getBlocks() {
    const { grid } = this;
    if (this.blocks.length < 4) {
      this.receiveBlock(new Block(7,0, grid));
      this.receiveBlock(new Block(7,1, grid));
      this.receiveBlock(new Block(8,0, grid));
      this.receiveBlock(new Block(8,1, grid));        
    }
  }

  hasBlocks() {
    return this.blocks.length > 0;
  }

  moveLeft() {
    this.move = 'left';
  }

  moveRight() {
    this.move = 'right';
  }

  rotateUp() {
    console.log("AWD")
    this.blocks.unshift(this.blocks.pop());
  }

  receiveBlock(block) {
    this.blocks.push(block);
  }

  releaseBlocks() {


    this.blocks[1].state = 'falling';
    this.blocks[3].state = 'falling';
    this.blocks[0].state = 'falling';
    this.blocks[2].state = 'falling';


    this.blocks.forEach(b => {
      b.state = 'falling';
      this.grid.blocks[b.id] = b;
    })    

    this.blocks = [];
  }

  update() {
    if (this.move === 'right' && this.hasBlocks()) {
      this.blocks[2].setMoveRight();
      this.blocks[3].setMoveRight();
      this.blocks[0].setMoveRight();
      this.blocks[1].setMoveRight();
      this.blocks[2].update();
      this.blocks[3].update();
      this.blocks[0].update();
      this.blocks[1].update();      
    }

    if (this.move === 'left' && this.hasBlocks()) {
      this.blocks[0].setMoveLeft();
      this.blocks[1].setMoveLeft();      
      this.blocks[2].setMoveLeft();
      this.blocks[3].setMoveLeft();
      this.blocks[0].update();
      this.blocks[1].update();      
      this.blocks[2].update();
      this.blocks[3].update();      
    }    
    this.move = null;

    if (!this.hasBlocks()) {
      var self = this;
      setTimeout(() => {
        self.getBlocks();
      }, 1);
    }
  }

  render(ctx) {
    this.blocks.forEach(b => {
      b.render(ctx);
    })
  }
}

export default Player;