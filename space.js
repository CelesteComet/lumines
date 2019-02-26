class Space {
  constructor(val = null) {
    this.value = val;
  }

  update() {
    if (this.value) {
      this.value.update();
    }
  }

  render(ctx) {
    if (this.value) {
      this.value.render(ctx);
    }
  }
}

export default Space;