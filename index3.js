const gridSection3 = document.getElementById("gridSection3");
const check = document.getElementById("check");
const reset = document.getElementById("reset");
let sqSection3 = 30;
let mousedown;
let mouseup;
let delaySection3 = 100;
document.addEventListener("mousedown", function () {
  mousedown = true;
  mouseup = false;
});
document.addEventListener("mouseup", function () {
  mouseup = true;
  mousedown = false;
});
for (i = 0; i < sqSection3; i++) {
  for (j = 0; j < sqSection3; j++) {
    let cell = document.createElement("div");
    cell.classList.add("cells");
    cell.classList.add("num" + i + j);
    cell.addEventListener("mousemove", function () {
      if (mousedown && !mouseup) this.style.background = "black";
    });
    gridSection3.appendChild(cell);
  }
}

const board = document.querySelectorAll(".cells");

let mazeSection3 = [];
for (i = 0; i < sqSection3; i++) {
  mazeSection3[i] = [];
  for (j = 0; j < sqSection3; j++) {
    mazeSection3[i][j] = 1;
  }
}

let ans = [];
for (i = 0; i < sqSection3; i++) {
  ans[i] = [];
  for (j = 0; j < sqSection3; j++) {
    ans[i][j] = 0;
  }
}

check.addEventListener("click", function () {
  for (i = 0; i < sqSection3; i++) {
    for (j = 0; j < sqSection3; j++) {
      if (board[i * sqSection3 + j].style.background == "black") {
        mazeSection3[i][j] = 0;
      }
    }
  }
  console.log(mazeSection3);
  solution();
});

reset.addEventListener("click", function () {
  for (i = 0; i < sqSection3; i++) {
    for (j = 0; j < sqSection3; j++) {
      board[i * sqSection3 + j].style.background = "red"
      mazeSection3[i][j] = 1;
      ans[i][j] = 0;
    }
  }
  console.log(reset)
});

//mazeSection3 algorithm

function isSafe(arr, x, y, n) {
  if (x < n && x >= 0 && y >= 0 && y < n && arr[x][y] == 1) {
    return true;
  }
  return false;
}

function ratinmazeSection3(arr, x, y, n, ans) {
  if (x == n - 1 && y == n - 1 && arr[x][y] == 1) {
    ans[x][y] = 1;
    board[x * sqSection3 + y].style.background = "black";
    return true;
  }
  if (isSafe(arr, x, y, n)) {
    if (ans[x][y] == 1) return false;
    ans[x][y] = 1;
    if (ratinmazeSection3(arr, x + 1, y, n, ans)) {
      return true;
    }
    if (ratinmazeSection3(arr, x, y + 1, n, ans)) {
      return true;
    }
    if (ratinmazeSection3(arr, x - 1, y, n, ans)) {
      return true;
    }
    if (ratinmazeSection3(arr, x, y - 1, n, ans)) {
      return true;
    }
    ans[x][y] = 0;
    board[x * sqSection3 + y].style.background = "black";
    return false;
  }
  return false;
}

function solution() {
  if (ratinmazeSection3(mazeSection3, 0, 0, sqSection3, ans)) {
    for (i = 0; i < sqSection3; i++) {
      for (j = 0; j < sqSection3; j++) {
        if (ans[i][j] == 1) {
          board[i * sqSection3 + j].style.background = "green";
        }
      }
    }
  } else console.log("Not Found");
}
