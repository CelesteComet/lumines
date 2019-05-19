import Space from './space';
import Block from './block';
import Line from './line';

class Grid {
  constructor(game) {
    this.data = []
    this.game = game;
    this.options = {
      length: 16,
      height: 10,
      blockInitialPosition: {
        col: 8
      },
      gridBlockSize: 50
    };
    this.line = new Line(this);
    this.playerBlocks = [];
    this.blocks = {};
  }

  init() {
    console.log('creating an empty board');
    const { length, height } = this.options;
    for (let i = 0; i < length; i++) {
      let column = [];
      for (let j = 0; j < height; j++) {
        column.push(null);
      }
      this.data.push(column);
    }
  }

  drawGrid(ctx) {
    const { length, height, gridBlockSize } = this.options;
    for (let i = 2; i < height; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (i * gridBlockSize));
      ctx.lineTo(gridBlockSize * length, (i * gridBlockSize));
      ctx.stroke();
    }

    for (let i = 0; i < length; i++) {
      ctx.beginPath();
      ctx.moveTo((i * gridBlockSize), 0);
      ctx.lineTo((i * gridBlockSize), gridBlockSize * height);
      ctx.stroke();      
    }

    this.game.player.blocks.forEach(b => {
      ctx.fillRect(b.x * gridBlockSize, b.y * gridBlockSize, gridBlockSize, gridBlockSize);
    });
  }

  checkSquares() {
    const gridData = this.data;

    Object.keys(this.blocks).forEach(key => {
      let squares = [];
      let block = this.blocks[key];
      squares.push(gridData[block.gridPosition.x][block.gridPosition.y])
      squares.push(gridData[block.gridPosition.x + 1][block.gridPosition.y])
      squares.push(gridData[block.gridPosition.x][block.gridPosition.y - 1])
      squares.push(gridData[block.gridPosition.x + 1][block.gridPosition.y - 1]) 

      let areAllBlocks = _.every(squares, (s) => {
        return (s instanceof Block && s.state === 'stopped' && (s.val === squares[0].val || s.val === 3))
      })
  
      if (areAllBlocks) {
        squares.forEach(b => {
          if (b.val !== 4) {
            b.val = 3;
          }
        })
      }
    })        


    
  }  

  update() {
    this.line.update();
    Object.keys(this.blocks).forEach(key => {
      this.blocks[key].update();
    })    

    this.checkSquares()
  }

  render(ctx) {

    this.drawGrid(ctx);
    var self = this;
    Object.keys(this.blocks).forEach(key => {
      self.blocks[key].render(ctx);
    })
    this.line.render(ctx);
  }



}

export default Grid;