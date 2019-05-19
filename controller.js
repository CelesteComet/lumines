class Controller() {

  constructor() {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
  }

  bindEvents() {
    window.onkeydown = (e) => {
      console.log(e.key);
      if (e.key === "ArrowRight") {
        this.player.moveRight();
      }

      if (e.key === "ArrowLeft") {
        this.player.moveLeft();
      }

      if (e.key === "ArrowUp") {
        this.player.rotateUp();
      }      

      if (e.code === "Space") {
        console.log("CLC")
        if (this.player.hasBlocks()) {
          this.player.releaseBlocks();
        }
      }
    } 
  }

  suppressSpaceBar() {
    window.addEventListener('keydown', function(e) {
      if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
      }
    });
  }






}

export default Controller;