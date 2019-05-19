import Block from './block';

class Line {
  constructor(grid) {
    this.grid = grid;
    this.renderX = 0;
    this.gridX = 0;
    this.velocity = 2;
    this.state = 'searching';
    this.blocksToRemove = [];
    this.checkMap = {};
  }

  checkBlocks() {
  
    let prevState = this.state;
    let foundSomething = false;
    if (!this.checkMap[this.gridX]) {
      this.checkMap[this.gridX] = true;
      let currentCol = this.grid.data[this.gridX]
      for (let i = 0; i < currentCol.length; i++) {
        let space = currentCol[i];
        if (space instanceof Block) {
          let block = space;
          if (block.val === 3) { // square to remove
            block.val = 4; // square removing
            this.blocksToRemove.push(block);
            this.state = 'foundBlock';
            foundSomething = true;
          }
        }
      }

      if (foundSomething !== true) {
        this.state = 'searching';
      }
      if (prevState === 'foundBlock' && this.state === 'searching') {
        console.log("AKWDJWK")
        this.destroyBlocks();
      }              

    } 


  }

  destroyBlocks() {
    this.blocksToRemove.forEach(b => {
      b.destroy();
    })
  }

  update() {
    this.renderX += this.velocity;
    if (this.renderX >= (this.grid.options.length * this.grid.options.gridBlockSize)) {
      this.renderX = 0;
      this.gridX = 0;
      this.checkMap = {};
    }
    this.gridX = Math.floor(this.renderX / (this.grid.options.gridBlockSize));
    this.checkBlocks()
  }

  render(ctx) {
    ctx.beginPath();
    ctx.shadowColor = "black";    
    ctx.globalAlpha = 1;
    ctx.moveTo(this.renderX, 0);
    ctx.lineTo(this.renderX, 500);
    ctx.stroke();    
    ctx.globalAlpha = 0.5;
    ctx.moveTo(this.renderX - 2, 0);
    ctx.lineTo(this.renderX - 2, 500);
    ctx.stroke();   
    ctx.shadowBlur = 20;
    ctx.globalAlpha = 0.2;
    ctx.moveTo(this.renderX - 4, 0);
    ctx.lineTo(this.renderX - 4, 500);
    ctx.stroke();           
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.shadowColor = "black";    
  }
}

export default Line;