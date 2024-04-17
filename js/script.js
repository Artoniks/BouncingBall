let canvas = document.getElementById("canvas");
const canvas2d = canvas.getContext("2d");
canvas2d.backgroundColor = "black";
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;
let isAnimating = false;
canvas2d.fillStyle = "blue";
canvas.width = windowWidth;
canvas.height = windowHeight;
console.log(canvas.width);
console.log(canvas.height);

(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();

let random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

class Ball {
  constructor(x, y, horizontalSpeed, verticalSpeed, color, size) {
    this.xValue = x;
    this.yValue = y;
    this.horizontalSpeed = horizontalSpeed;
    this.verticalSpeed = verticalSpeed;
    this.color = color;
    this.size = size;
  }
  draw() {
    canvas2d.beginPath();
    canvas2d.shadowBlur = 6;
    canvas2d.shadowColor = this.color;
    canvas2d.fillStyle = this.color;
    canvas2d.arc(this.xValue, this.yValue, this.size, 0, 2 * Math.PI);
    canvas2d.fill();

    canvas2d.shadowBlur = 0;
    canvas2d.shadowColor = "transparent";
  }
  move() {
    this.xValue += this.horizontalSpeed;
    this.yValue += this.verticalSpeed;
    if (this.xValue + this.size >= windowWidth || this.xValue <= 0) {
      this.horizontalSpeed = -this.horizontalSpeed;
    }
    if (this.yValue + this.size >= windowHeight || this.yValue <= 0) {
      this.verticalSpeed = -this.verticalSpeed;
    }
  }
}

let ballArray = [];

function loop() {
  if (!isAnimating) return;

  canvas2d.fillStyle = "rgba(255, 255, 255, 0.1)";
  canvas2d.fillRect(0, 0, canvas.width, canvas.height);
  for (let ball of ballArray) {
    ball.draw();
    ball.move();
  }
  requestAnimationFrame(loop);
}

for (let i = 0; i < 10; i++) {
  let ball = new Ball(
    random(0, windowWidth),
    random(0, windowHeight),
    random(1, 5),
    random(2, 5),
    `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
    random(20, 40)
  );
  ballArray.push(ball);
}
function applySettings() {
  const ballSize = parseInt(document.getElementById("ballSize").value);
  const ballCount = parseInt(document.getElementById("ballCount").value);
  const colorRange = parseInt(document.getElementById("colorRange").value);

  ballArray = [];

  for (let i = 0; i < ballCount; i++) {
    let ball = new Ball(
      random(0, windowWidth),
      random(0, windowHeight),
      random(1, 5),
      random(2, 5),
      `rgb(${random(colorRange, 255)}, ${random(colorRange, 255)}, ${random(
        colorRange,
        255
      )})`,
      ballSize
    );
    ballArray.push(ball);
  }

  toggleModal();
}

document
  .getElementById("applySettings")
  .addEventListener("click", applySettings);

document.getElementById("button").addEventListener("click", function () {
  return !isAnimating ? ((isAnimating = true), loop()) : (isAnimating = false);
});
