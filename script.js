const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const FRAME_COUNT = 120;
const images = [];

let loaded = 0;
let mouseX = window.innerWidth / 2;

function loadFrames(){

  for(let i = 1; i <= FRAME_COUNT; i++){

    const img = new Image();
    const frame = String(i).padStart(4,"0");

    img.src = `frames/frame_${frame}.webp`;

    img.onload = () => {
      loaded++;

      if(loaded === FRAME_COUNT){
        requestAnimationFrame(render);
      }
    };

    images.push(img);
  }
}

loadFrames();

window.addEventListener("mousemove",(e)=>{
  mouseX = e.clientX;
});

function drawCover(img){

  if(!img || !img.complete || !img.width) return;

  const cw = canvas.width;
  const ch = canvas.height;

  const iw = img.width;
  const ih = img.height;

  const scale = Math.max(cw/iw, ch/ih);

  const w = iw * scale;
  const h = ih * scale;

  const x = (cw - w) / 2;
  const y = (ch - h) / 2;

  ctx.drawImage(img,x,y,w,h);
}

function render(){

  const half = window.innerWidth/2;
  let frameNumber;

  if(mouseX >= half){

    const percent = (mouseX-half)/half;
    frameNumber = Math.round(40 - percent*39);

  }else{

    const percent = mouseX/half;
    frameNumber = Math.round(120 - percent*79);

  }

  const img = images[frameNumber-1];

  ctx.clearRect(0,0,canvas.width,canvas.height);

  if(img){
    drawCover(img);
  }

  requestAnimationFrame(render);
}