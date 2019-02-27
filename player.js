class Player {
  constructor() {
    this.position = 7;
  }

  moveLeft() {
    if (this.position > 0) {
      this.position--;
    }
  }

  moveRight() {
    if (this.position < 14) {
      this.position++;
    }
  }
}

export default Player;