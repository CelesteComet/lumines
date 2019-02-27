import Space from './space';
import Block from './block';

class Grid {
  constructor() {
    this.data = []
    this.options = {
      length: 16,
      height: 10,
      blockInitialPosition: {
        col: 8
      },
      gridBlockSize: 50
    };

    this.playerBlocks = [];
    this.gridBlocks = {};
  }

  init() {
    console.log('creating an empty board');
    const { length, height } = this.options;
    for (let i = 0; i < length; i++) {
      let column = [];
      for (let j = 0; j < height; j++) {
        column.push(new Space)
      }
      this.data.push(column);
    }

    console.log('creating initial block');
    this.createBlock();
  }

  drawGrid(ctx) {
    console.log("drawing grid");
    const { length, height, gridBlockSize } = this.options;
    for (let i = 0; i < height; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (i * gridBlockSize));
      ctx.lineTo(gridBlockSize * length, (i * gridBlockSize));
      ctx.stroke();

      // ctx.moveTo((i * gridBlockSize), 0);
      // ctx.lineTo((i * gridBlockSize), gridBlockSize * length);
      // ctx.stroke();      
    }

    for (let i = 0; i < length; i++) {
      ctx.beginPath();
      ctx.moveTo((i * gridBlockSize), 0);
      ctx.lineTo((i * gridBlockSize), gridBlockSize * height);
      ctx.stroke();      
    }    

    this.playerBlocks.forEach(b => {
      ctx.fillRect(b.x * gridBlockSize, b.y * gridBlockSize, gridBlockSize, gridBlockSize);
    });

    Object.keys(this.gridBlocks).forEach(key => {
      let b = this.gridBlocks[key];
      ctx.fillRect(b.x * gridBlockSize, b.y * gridBlockSize, gridBlockSize, gridBlockSize);
    })
  }

  createBlock() {
    const { gridBlockSize } = this.options;
    this.playerBlocks[0] = new Block(7,0, gridBlockSize);
    this.playerBlocks[1] = new Block(7,1, gridBlockSize);
    this.playerBlocks[2] = new Block(8,0, gridBlockSize);
    this.playerBlocks[3] = new Block(8,1, gridBlockSize);
  }

  fillGridWithBlocks() {

    // iterate player blocks and put it in the grid data
    for (let i = 0; i < this.playerBlocks.length; i++) {
      let block = this.playerBlocks[i];
      this.data[block.x][block.y] = block;
    }

    // iterate grid blocks and put it in the grid data
    // for (let i = 0; i < this.gridBlocks.length; i++) {
    //   let block = this.playerBlocks[i];
    //   this.data[block.x][block.y] = block;
    // }    
  }

  releasePlayerBlocks() {
    // go through player blocks and add them to grid blocks
    while (this.playerBlocks.length) {
      let block = this.playerBlocks.pop();
      block.setFalling(this.data);
      this.gridBlocks[Math.random()] = block;
    }
  }

  update(player) {
    let playerPosition = player.position;

    // iterate player blocks and update positions
    this.playerBlocks.forEach((b,i) => {
      if (i > 1) {
        b.x = playerPosition + 1;
        return;
      }
      b.x = playerPosition;
    })    

    // iterate player blocks and update positions

    // iterate through each column 

    this.data.forEach(column => {
      for (let j = column.length; j > 0; j--) {
        let space = column[j];
        if (space instanceof Block) {
          let block = space;
          let bottomSpace = column[j+1];

          if (bottomSpace.value === null && block.state === "falling") {
            block.y = block.y + block.velocity;
            debugger;
          } else if (bottomSpace instanceof Block && bottomSpace.state === "falling") {
            block.y = block.y + block.velocity;
          }
        }
      }
    })

    // iterate columns backwards

    // 
    // Object.keys(this.gridBlocks).forEach(key => {
    //   let b = this.gridBlocks[key];
    //   if (b.state === "falling") {
    //     // b.y = b.y + b.velocity;
    //     b.updatePosition(this.data);
    //   }
    // })
    this.fillGridWithBlocks();
  }

  render(ctx) {
    this.drawGrid(ctx);
  }



}

export default Grid;