import Space from './space';
import Block from './block';

class Grid {
  constructor() {
    this.data = []
    this.options = {
      length: 16,
      height: 12,
      blockInitialPosition: {
        col: 8
      },
      gridBlockSize: 50
    };
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

  createBlock() {
    const { gridBlockSize } = this.options;
    this.data[7][0].value = new Block(7,0, gridBlockSize);
    this.data[7][1].value = new Block(7,1, gridBlockSize);
    this.data[8][0].value = new Block(8,0, gridBlockSize);
    this.data[8][1].value = new Block(8,1,  gridBlockSize);
  }

  update(input) {
    
  }

  render(ctx) {
    const { gridBlockSize } = this.options;
    this.data.forEach((col, i) => {
      col.forEach((space, j) => {
        space.render(ctx);

        //
        ctx.rect(i * gridBlockSize, j * gridBlockSize, gridBlockSize, gridBlockSize);
        ctx.stroke();
      })
    })    
  }



}

export default Grid;