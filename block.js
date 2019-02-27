class Block {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = Math.floor(Math.random() * 4);
    this.state = 'player';

    // Math stuff
    this.velocity = .1;
  }

  setFalling(gridData) {
    this.state = "falling";
  }

  updatePosition(gridData) {

  }


};

export default Block;