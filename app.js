const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
// html의 요소인 canvas는 context를 갖는다. 요소안의 픽셀에 접근할 수 있다.

canvas.width = 800;
canvas.height = 500;
// css에서 준 크기와는 별도로 pixel을 다룰 수 있는 width와 height를 지정해줘야 한다!!

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5; // 선 굵기

let painting = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
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

function onMouseDown(event) {
  painting = true;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
