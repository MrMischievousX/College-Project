const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let sq = 20;
let row = 60;
let col = 60;
let grid = [];
let current;
let stack = [];
let delaySection2 = 30;
let speedSection2 = document.getElementById("speedSection2");

speedSection2.addEventListener("input", function () {
  delaySection2 = 110 - parseInt(speedSection2.value);
});

class Cells {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.canGo = false;
  }

  draw() {
    let x = this.i * sq;
    let y = this.j * sq;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "yellow";
    if (this.walls[0]) ctx.lineTo(x + sq, y);
    ctx.moveTo(x + sq, y);
    if (this.walls[1]) ctx.lineTo(x + sq, y + sq);
    ctx.moveTo(x + sq, y + sq);
    if (this.walls[2]) ctx.lineTo(x, y + sq);
    ctx.moveTo(x, y + sq);
    if (this.walls[3]) ctx.lineTo(x, y);
    ctx.stroke();
    if (this.visited) {
      ctx.fillStyle = "black";
      ctx.fillRect(x, y, sq, sq);
    }
  }

  highlight() {
    let x = this.i * sq;
    let y = this.j * sq;
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, sq, sq);
  }
  next() {
    let nextOne = [];
    let top;
    let right;
    let bottom;
    let left;
    if (this.j - 1 >= 0) {
      top = grid[this.i][this.j - 1];
    } else top = undefined;
    if (this.i + 1 < col) {
      right = grid[this.i + 1][this.j];
    } else right = undefined;
    if (this.j + 1 < 30) {
      bottom = grid[this.i][this.j + 1];
    } else bottom = undefined;
    if (this.i - 1 >= 0) {
      left = grid[this.i - 1][this.j];
    } else left = undefined;

    if (top && !top.visited) {
      nextOne.push(top);
    }
    if (right && !right.visited) {
      nextOne.push(right);
    }
    if (bottom && !bottom.visited) {
      nextOne.push(bottom);
    }
    if (left && !left.visited) {
      nextOne.push(left);
    }
    if (nextOne.length > 0) {
      let r = Math.floor(Math.random() * nextOne.length);

      return nextOne[r];
    } else {
      return undefined;
    }
  }
}

for (r = 0; r < row; r++) {
  grid[r] = [];
  for (c = 0; c < col; c++) {
    grid[r][c] = new Cells(r, c);
  }
}
current = grid[0][0];
let animationID;
let time = Date.now();

function maze() {
  animationID = requestAnimationFrame(maze);
  let timeNow = Date.now();
  if (timeNow - time > delaySection2) {
    for (r = 0; r < row; r++) {
      for (c = 0; c < col; c++) {
        grid[r][c].draw();
      }
    }
    current.visited = true;
    current.highlight();
    let check = current.next();
    if (check) {
      check.visited = true;
      stack.push(current);
      removeWalls(current, check);
      current = check;
    } else if (stack.length > 0) {
      current = stack.pop();
    } else if (stack.length == 0) {
      console.log("intIt");
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, sq, sq);
      cancelAnimationFrame(animationID);
    }
    time = Date.now();
  }
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}

