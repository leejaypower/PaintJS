const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
// html의 요소인 canvas는 context를 갖는다. 요소안의 픽셀에 접근할 수 있다.
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";

canvas.width = 800;
canvas.height = 500;
// css에서 준 크기와는 별도로 pixel을 다룰 수 있는 width와 height를 지정해줘야 한다!!

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5; // 선 굵기

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  if (!filling) {
    // paint 모드일 경우에만
    painting = true;
  }
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!painting) {
    ctx.beginPath(); // 새로운 경로 호출
    ctx.moveTo(x, y); // 새 하위 경로의 시작점을 (x, y) 좌표로 이동
    // console.log("creating path in", x, y);
  } else {
    ctx.lineTo(x, y); // 현재 하위 경로의 마지막 지점을 지정된 (x, y) 좌표에 직선으로 연결
    ctx.stroke(); // 현재 획 스타일로 현재 하위 경로를 그림
    // console.log("creating line in", x, y);
  }
}

/*
function onMouseDown(event) {
  painting = true;
}
*/

function handleColorClick(event) {
  // console.log(event.target.style);
  const bgcolor = event.target.style.backgroundColor;
  // console.log(bgcolor)
  ctx.strokeStyle = bgcolor;
  ctx.fillStyle = bgcolor;
}

function handleRangeChange(event) {
  // console.log(event.target.value);
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    // fill 버튼을 누른 경우
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

function resetBtnClick(event) {
  window.location.reload();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

// console.log(Array.from(colors));
// colors는 HTMLCollection
// array.from 메소드는 object로부터 array를 만든다.

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
