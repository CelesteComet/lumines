class Block {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  update() {

  }

  render(ctx) {
    const { x, y, size } = this;
    ctx.fillRect(this.x * size, this.y * size, size, size);
  }
};

export default Block;