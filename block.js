import _ from 'lodash';

class Block {
  constructor(x, y, grid) {
    this.id = Math.random();
    this.gridPosition = {x, y};
    this.renderPosition = {x, y};

    this.grid = grid;

    this.size = grid.options.gridBlockSize;
    this.state = 'player';

    this.val = _.sample([1,2]);

    this.move = null;

    // Math stuff
    this.velocity = .69;

    var {x, y} = this.gridPosition;
    this.grid.data[x][y] = this;
  }

  updatePosition(gridData) {
  }

  setMoveLeft() {
    this.move = 'left';
  }

  setMoveRight() {
    this.move = 'right';
  }

  setMoveDown() {
    this.move = 'down';
  }

  moveLeft() {
    const gridData = this.grid.data;
    const {x, y} = this.gridPosition;
    gridData[x][y] = null;
    this.gridPosition.x--;
    this.renderPosition.x--;
    gridData[this.gridPosition.x][y] = this;
  }

  moveRight() {
    const gridData = this.grid.data;
    const {x, y} = this.gridPosition;
    gridData[x][y] = null;
    this.gridPosition.x++;
    this.renderPosition.x++;
    gridData[this.gridPosition.x][y] = this;
  }

  destroy() {
    this.state = 'remove';
  }



  update() {

      const { grid } = this;
      // sync render positon to gridposition
      grid.data[this.gridPosition.x][this.gridPosition.y] = null;
      this.gridPosition.y = Math.floor(this.renderPosition.y);
      grid.data[this.gridPosition.x][this.gridPosition.y] = this;

      let nextPosition = grid.data[this.gridPosition.x][this.gridPosition.y + 1];    
    if (this.state === 'remove') {
      this.grid.data[this.gridPosition.x][this.gridPosition.y] = null;
      delete this.grid.blocks[this.id];
      return;
    }    

    if (this.state === 'playerFall') {

    }

    if (this.move === 'left') {
      this.moveLeft();
      this.move = null;
    }

    if (this.move === 'right') {
      this.moveRight();
      this.move = null;
    }

    if (this.state !== 'player') {


      if (!nextPosition) {
        this.state = 'falling';
      }


      if ( (nextPosition && nextPosition.state === 'falling') ) {
        this.renderPosition.y += this.velocity;
      } else if (this.gridPosition.y === 9 || nextPosition && nextPosition.state === 'stopped' || nextPosition && nextPosition.state === 'scanned') {
        this.state = 'stopped';
      } else if (!nextPosition || nextPosition && nextPosition.state === 'player') {
        this.renderPosition.y += this.velocity;
      }      
    }




      // if next position is on the ground, set state to stopped
      
      // let nextPosition = grid.data[this.gridPosition.x][this.gridPosition.y + 1];
      // if (!nextPosition) {
      //   this.state = 'stopped';
      //   return;
      // } 

      // console.log(nextPosition)

      // if (nextPosition.state === 'falling') {
        
      // }

    if (this.state === 'stopped') {
      this.renderPosition.y = Math.floor(this.gridPosition.y);
      this.gridPosition.y = Math.floor(this.renderPosition.y);
    }



    
  }

  render(ctx) {

      if (this.val === 1) {
        ctx.fillStyle = "green";
      } else if (this.val === 2) {
        ctx.fillStyle = "blue";
      }          


    if (this.state === 'player') {
    
      const {x, y} = this.gridPosition;
      const { size } = this;
      ctx.fillRect(x * size, y * size, size, size);      
    }

    if (this.state === 'falling') {



      const {x, y} = this.renderPosition;
      const { size } = this;
      ctx.fillRect(x * size, y * size, size, size);  
    }    

    if (this.state === 'stopped') {
      if (this.val === 3) {
        ctx.fillStyle = "red";
      } else if (this.val === 4) {
        ctx.fillStyle = "#124DEE";
      }
      const {x, y} = this.renderPosition;
      const { size } = this;
      ctx.fillRect(x * size, y * size, size, size);  
    }

  }


};

export default Block;