const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FRAME_COUNT = 120;

const COLS = 12;
const ROWS = 10;

const sprite = new Image();
sprite.src = "sprite.webp";

let mouseX = window.innerWidth / 2;

sprite.onload = () => {
  requestAnimationFrame(render);
};

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
});

function render(){

  const percent = 1 - (mouseX / window.innerWidth);

  const frame = Math.floor(percent * (FRAME_COUNT - 1));

  const frameWidth = sprite.width / COLS;
  const frameHeight = sprite.height / ROWS;

  const col = frame % COLS;
  const row = Math.floor(frame / COLS);

  const sx = col * frameWidth;
  const sy = row * frameHeight;

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.drawImage(
    sprite,
    sx,
    sy,
    frameWidth,
    frameHeight,
    0,
    0,
    canvas.width,
    canvas.height
  );

  requestAnimationFrame(render);

}