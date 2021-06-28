let newArr = document.getElementById("newArray");
let bubArr = document.getElementById("bubArray");
let selArr = document.getElementById("selArray");
let merArr = document.getElementById("merArray");
let quickArr = document.getElementById("quickArray");
let bars = document.getElementById("bars");
let size = document.getElementById("size");
let speed = document.getElementById("speed");
let text = document.getElementById("text");
var delay = 100;

let color = ["#F51720", "#FA26A0", "#f88f01", "#5eaaa8"];
let count = 0;

// Event Listener
size.addEventListener("input", function () {
  arrDelete();
  createNew(parseInt(size.value));
});

speed.addEventListener("input", function () {
  delay = -parseInt(speed.value);
  console.log(delay);
});

newArr.addEventListener("click", function () {
  arrDelete();
  createNew(80);
});

bubArr.addEventListener("click", async function () {
  disableAll();
  console.log("In Bubble Sort");
  text.innerHTML = "Using Bubble Sort";
  await bubbleSort();
  enableAll();
  text.innerHTML = "Sorting Visualizer";
});

selArr.addEventListener("click", async function () {
  disableAll();
  text.innerHTML = "Using Selection Sort";
  console.log("In Selection Sort");
  await selectionSort();
  enableAll();
  text.innerHTML = "Sorting Visualizer";
});

merArr.addEventListener("click", async function () {
  disableAll();
  text.innerHTML = "Using Merge Sort";
  let genArray = document.querySelectorAll(".bar");
  console.log("In Merge Sort");
  await mergeSort(genArray, 0, parseInt(genArray.length) - 1);
  enableAll();
  text.innerHTML = "Sorting Visualizer";
});

quickArr.addEventListener("click", async function () {
  disableAll();
  text.innerHTML = "Using Quick Sort";
  let genArray = document.querySelectorAll(".bar");
  console.log("In Merge Sort");
  await quickSort(genArray, 0, parseInt(genArray.length) - 1);
  enableAll();
  text.innerHTML = "Sorting Visualizer";
});

// Create Array
function createNew(n) {
  for (let i = 0; i < n; i++) {
    let bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = Math.floor(Math.random() * 65 + 2) + "vh";
    bars.appendChild(bar);
  }
}

// Delete Array
function arrDelete() {
  bars.innerHTML = "";
}

// Swap Elements
function swap(el1, el2) {
  let temp = el1.style.height;
  el1.style.height = el2.style.height;
  el2.style.height = temp;
}

// Delay Function
function sleep(milisec) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("");
    }, milisec);
  });
}

// Disable All Function
function disableAll() {
  console.log("Disabling");
  bubArr.disabled = true;
  selArr.disabled = true;
  newArr.disabled = true;
  merArr.disabled = true;
  quickArr.disabled = true;
  size.disabled = true;
}

// Enable All Function
function enableAll() {
  console.log("Enabling");
  bubArr.disabled = false;
  selArr.disabled = false;
  newArr.disabled = false;
  merArr.disabled = false;
  quickArr.disabled = false;
  size.disabled = false;
}

// Bubble Sort Function
async function bubbleSort() {
  console.log("In Bubble Sort");
  const allBar = document.querySelectorAll(".bar");
  for (let i = 0; i < allBar.length; i++) {
    await sleep(delay);
    for (let j = 0; j < allBar.length - i - 1; j++) {
      allBar[j].style.background = "black";
      allBar[j + 1].style.background = "green";
      if (
        parseInt(allBar[j].style.height) > parseInt(allBar[j + 1].style.height)
      ) {
        swap(allBar[j], allBar[j + 1]);
        await sleep(delay);
      }
      allBar[j].style.background = color[count % 4];
    }
    count++;
    allBar[allBar.length - 1 - i].style.background = "green";
  }
}

// Selection Sort Function
async function selectionSort() {
  console.log("In Selection Sort");
  const allBar = document.querySelectorAll(".bar");
  for (let i = 0; i < allBar.length; i++) {
    let min_idx = i;
    allBar[i].style.background = "black";
    await sleep(delay);
    for (let j = i + 1; j < allBar.length; j++) {
      allBar[j].style.background = "blue";
      await sleep(delay);
      if (
        parseInt(allBar[j].style.height) <
        parseInt(allBar[min_idx].style.height)
      ) {
        if (min_idx !== i) {
          allBar[min_idx].style.background = color[count % 4];
        }
        min_idx = j;
        allBar[min_idx].style.background = "green";
      } else {
        allBar[j].style.background = color[count % 4];
      }
    }
    await sleep(delay);
    swap(allBar[min_idx], allBar[i]);
    allBar[min_idx].style.background = color[count % 4];
    allBar[i].style.background = "green";
    count++;
  }
}

// Merge Sort Function
async function merge(allBar, low, mid, high) {
  console.log("In merge()");
  const n1 = mid - low + 1;
  const n2 = high - mid;
  let left = new Array(n1);
  let right = new Array(n2);
  for (let i = 0; i < n1; i++) {
    await sleep(delay);
    allBar[low + i].style.background = "#F51720";
    left[i] = allBar[low + i].style.height;
  }
  for (let i = 0; i < n2; i++) {
    await sleep(delay);
    allBar[mid + 1 + i].style.background = "#f88f01";
    right[i] = allBar[mid + 1 + i].style.height;
  }
  await sleep(delay);
  let i = 0,
    j = 0,
    k = low;
  while (i < n1 && j < n2) {
    await sleep(delay);
    if (parseInt(left[i]) <= parseInt(right[j])) {
      if (n1 + n2 === allBar.length) {
        allBar[k].style.background = "green";
      } else {
        allBar[k].style.background = "#FA26A0";
      }
      allBar[k].style.height = left[i];
      i++;
      k++;
    } else {
      if (n1 + n2 === allBar.length) {
        allBar[k].style.background = "green";
      } else {
        allBar[k].style.background = "#FA26A0";
      }
      allBar[k].style.height = right[j];
      j++;
      k++;
    }
  }
  while (i < n1) {
    await sleep(delay);
    if (n1 + n2 === allBar.length) {
      allBar[k].style.background = "green";
    } else {
      allBar[k].style.background = "#FA26A0";
    }
    allBar[k].style.height = left[i];
    i++;
    k++;
  }
  while (j < n2) {
    await sleep(delay);
    if (n1 + n2 === allBar.length) {
      allBar[k].style.background = "green";
    } else {
      allBar[k].style.background = "#FA26A0";
    }
    allBar[k].style.height = right[j];
    j++;
    k++;
  }
}

async function mergeSort(allBar, l, r) {
  console.log("In mergeSort()");
  if (l >= r) {
    return;
  }
  const m = l + Math.floor((r - l) / 2);
  await mergeSort(allBar, l, m);
  await mergeSort(allBar, m + 1, r);
  await merge(allBar, l, m, r);
}

// Quick Sort
async function quick(allBar, l, r) {
  let i = l - 1;
  allBar[r].style.background = "red";
  for (let j = l; j <= r - 1; j++) {
    allBar[j].style.background = "black";
    await sleep(delay);
    if (parseInt(allBar[j].style.height) < parseInt(allBar[r].style.height)) {
      i++;
      swap(allBar[i], allBar[j]);
      allBar[i].style.background = "#f88f01";
      if (i != j) allBar[j].style.background = "#f88f01";
      await sleep(delay);
    } else {
      allBar[j].style.background = "#FA26A0";
    }
  }
  i++;
  await sleep(delay);
  swap(allBar[i], allBar[r]);
  allBar[r].style.background = "#FA26A0";
  allBar[i].style.background = "green";
  await sleep(delay);
  for (let k = 0; k < allBar.length; k++) {
    if (allBar[k].style.background != "green")
      allBar[k].style.background = "#F51720";
  }
  return i;
}

async function quickSort(allBar, l, r) {
  console.log("In quickSort()");
  if (l < r) {
    let pivot_index = await quick(allBar, l, r);
    await quickSort(allBar, l, pivot_index - 1);
    await quickSort(allBar, pivot_index + 1, r);
  } else {
    if (l >= 0 && r >= 0 && l < allBar.length && r < allBar.length) {
      allBar[r].style.background = "green";
      allBar[l].style.background = "green";
    }
  }
}
