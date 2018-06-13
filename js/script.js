// Definitions
// -----------
function Circle (initialX, initialY) {
  this.x = initialX;
  this.y = initialY;
  this.radius = 25;
  this.dead = false;
}

Circle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.closePath();
};

Circle.prototype.move = function () {

}

function circleCollision (circleA, circleB) {
  var totalRadius = circleA.radius + circleB.radius;
  var distance = getDistance(circleA.x, circleA.y, circleB.x, circleB.y);
  return distance <= totalRadius;
}

function getDistance (x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}


// -----------------------------------------------------------------------------
// Canvas
// ------
var myCanvas = document.querySelector("canvas");

// make the canvas take up the entire screen
myCanvas.width = window.innerWidth;
myCanvas.height = window.innerHeight;

window.onresize = function () {
  // when the window is resized, resize the canvas
  myCanvas.width = window.innerWidth;
  myCanvas.height = window.innerHeight;
};

var ctx = myCanvas.getContext("2d");

var score = 0;
var myCircle = new Circle(100, 100);
var enemyCircles = [
  new Circle(10, 10),
  new Circle(500, 500),
  new Circle(100, 500),
  new Circle(898, 700),
  new Circle(10, 200),
  new Circle(200, 10),
  new Circle(999, 500),
  new Circle(600, 450),
  new Circle(750, 900),
  new Circle(300, 400),
];

setInterval(function () {
  // erase the entire canvas
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

  // draw everything again
  myCircle.draw();
  enemyCircles.forEach(function (oneCircle) {
    if (circleCollision(myCircle, oneCircle)) {
      // make the circle bigger
      myCircle.radius += 5;
      score += 1;
      // mark the enemy circle as dead
      oneCircle.dead = true;
    }
    oneCircle.draw();
  });

  // remove all dead circles
  enemyCircles = enemyCircles.filter(function (oneCircle) {
    return !oneCircle.dead;
  });

  // draw score
  ctx.font = "bold 25px monospace";
  ctx.strokeStyle = "white";
  ctx.fillText("Score: " + score, 25, 25);
  ctx.strokeText("Score: " + score, 25, 25);
}, 1000 / 60);
  // redraw everything 60 times per second for smooth animations


// -----------------------------------------------------------------------------
// User inputs
// -----------

var body = document.querySelector("body");
body.onkeydown = function (event) {
  switch (event.keyCode) {
    case 32: // space bar
    case 87: // W key (90 for French keyboards)
    case 38: // up arrow
      myCircle.y -= 5;
      event.preventDefault();
      break;

    case 65: // A key (81 for French keyboards)
    case 37: // left arrow
      myCircle.x -= 5;
      event.preventDefault();
      break;

    case 83: // S key
    case 40: // down arrow
      myCircle.y += 5;
      event.preventDefault();
      break;

    case 68: // D key
    case 39: // right arrow
      myCircle.x += 5;
      event.preventDefault();
      break;
  }
};
