const gridContainer = document.querySelector(".gridContainer");
const slider = document.getElementById("slider");
const resetBtn = document.getElementById("resetBtn");
const sideMenu = document.querySelector(".side-menu");
const colorPicker = document.getElementById("colorPicker");
const btn = sideMenu.querySelectorAll("button");
let draw = false;
let colorMode = colorPicker.value;
let gridSize = 16;

// ranger input that set the grid size
slider.addEventListener("change", (e) => {
  let sliderText = document.querySelector(".side-menu > span");
  sliderText.innerHTML = `Grid Size: ${e.target.value} X ${e.target.value}`;
  gridSize = e.target.value;
  createGrid(e.target.value);
});

// pressing the mouse will set the draw method to true
// first step to keep drawing with mouse pressed
window.addEventListener("mousedown", (e) => {
  draw = true;
  paint(e);
});

// releasing the mouse button will turn of the drawinf method
window.addEventListener("mouseup", () => {draw = false;});

//mouse over will draw on the grid if draw value is true
gridContainer.addEventListener("mouseover", (e) => {paint(e);});

// side menu buttons with borders with the selected button
sideMenu.addEventListener("click", (e) => {
  //checking if pressing only the buttons
  //without this validation an error may occur if click outside the button
  //thus selecting the div and erasing it's classes
  if (
    e.target.id == "colorBtn" ||
    e.target.id == "rainbowBtn" ||
    e.target.id == "eraseBtn" ||
    e.target.id == "resetBtn"
  ) {
    //setting the buttons outcomes
    //validation need for reset buttons, so it will not change the selected button
    if (e.target.id == "resetBtn") return createGrid(gridSize);
    btn.forEach((btn) => btn.removeAttribute("class"));
    e.target.classList.add("selected");
    if (e.target.id == "colorBtn") colorMode = colorPicker.value;
    if (e.target.id == "rainbowBtn") colorMode = "rainbow";
    if (e.target.id == "eraseBtn") colorMode = "#fff";
  }
});

//setting the chosen color and removing classes from previously selected buttons
//color mode button will be selected if a new color is selected
colorPicker.addEventListener("change", () => {
  colorMode = colorPicker.value;
  btn.forEach((btn) => btn.removeAttribute("class"));
  document.getElementById("colorBtn").classList.add("selected");
  document.getElementById("colorBtn").style.color = colorMode;
  document.getElementById("colorBtn").style.border = `2px solid ${colorMode}`;
});

//grid load when the page is loaded
window.onload = createGrid(gridSize);

//function to creat a grid, 16x16 by default, each div with a class, for event listeners filtering
function createGrid(gridSize) {
  resetGrid();
  gridContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  gridContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  for (let i = 0; i < gridSize * gridSize; i++) {
    newDiv = document.createElement("div");
    newDiv.classList.add("grid");
    gridContainer.appendChild(newDiv);
  }
}

//function that enable painting only if the draw is enabled
//and if the target of event the listener has a grid class
function paint(e) {
  if (draw && e.target.classList.contains("grid")) {
    colorMode === "rainbow"
      ? randomColor(e.target)
      : (e.target.style.backgroundColor = colorMode);
  }
}

//color randomizer, I don't understand how it works but it does!
function randomColor(target) {
  let color = Math.floor(Math.random() * (0xffffff + 1))
    .toString(16)
    .padStart(6, "0");
  target.style.backgroundColor = `#${color}`;
}

//grid reset function, should be  called everytime a user change the grid size
function resetGrid() {
  gridContainer.innerHTML = "";
}
