const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const FRAME_COUNT = 120;
const RIGHT_FRAMES = 40;

const images = [];

let loaded = 0;
let mouseX = window.innerWidth / 2;

function loadFrames() {

  for (let i = 1; i <= FRAME_COUNT; i++) {

    const img = new Image();
    const frame = String(i).padStart(4, "0");

    img.src = `frames/frame_${frame}.webp`;

    img.onload = () => {

      loaded++;

      if (loaded === FRAME_COUNT) {
        requestAnimationFrame(render);
      }

    };

    images.push(img);
  }
}

loadFrames();

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
});

function render() {

  const half = window.innerWidth / 2;
  let frameNumber;

  if (mouseX >= half) {

    // metade direita → frames 40 → 1

    const percent = (mouseX - half) / half;

    frameNumber = Math.round(40 - percent * 39);

  } else {

    // metade esquerda → frames 120 → 41

    const percent = mouseX / half;

    frameNumber = Math.round(120 - percent * 79);

  }

  const img = images[frameNumber - 1];

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  requestAnimationFrame(render);
}