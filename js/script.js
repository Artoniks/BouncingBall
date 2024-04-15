let canvas = document.getElementById("canvas");
const canvas2d = canvas.getContext("2d");
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

canvas.width = windowWidth;
canvas.height = windowHeight;
console.log(canvas.width);
console.log(canvas.height);

let random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
console.log(random(10, 23));

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
    canvas2d.fillStyle = this.color;
    canvas2d.arc(this.xValue, this.yValue, this.size, 0, 2 * Math.PI);
    canvas2d.fill();
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
    random(-5, 5),
    random(-5, 5),
    `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
    random(10, 50)
  );
  ballArray.push(ball);
}

loop();
