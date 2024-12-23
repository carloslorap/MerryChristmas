var Snowball = (function () {
  var balls;
  var totalBalls = 100;
  var breeze = 0;

  function SnowBall(size, x, y, vx, vy) {
      this.size = size;
      this.x = x;
      this.y = y;
      this.vx = vx;
      this.vy = vy;
      this.hit = false;
      this.melt = false;
      this.div = document.createElement('div');

      this.div.classList.add("snowball");
      this.div.style.width = this.size + 'px';
      this.div.style.height = this.size + 'px';
  }

  SnowBall.prototype.move = function () {
      if (this.hit) {
          if (Math.random() > 0.995) {
              this.melt = true;
          }
      } else {
          this.x += this.vx + Math.min(Math.max(breeze, -10), 10);
          this.y += this.vy;
      }

      if (this.x > window.innerWidth + this.size) {
          this.x -= window.innerWidth + this.size;
      }

      if (this.x < -this.size) {
          this.x += window.innerWidth + this.size;
      }

      if (this.y > window.innerHeight + this.size) {
          this.x = Math.random() * window.innerWidth;
          this.y -= window.innerHeight + this.size * 2;
          this.melt = false;
      }
  };

  SnowBall.prototype.draw = function () {
      this.div.style.transform = 'translate3d(' + this.x + 'px' + ',' + this.y + 'px, 0)';
      this.div.style.MozTransform = 'translate3d(' + this.x + 'px' + ',' + this.y + 'px, 0)';
      this.div.style.webkitTransform = 'translate3d(' + this.x + 'px' + ',' + this.y + 'px, 0)';
  };

  function update() {
      for (var i = balls.length; i--;) {
          var flake = balls[i];
          flake.move();
          flake.draw();
      }
      requestAnimationFrame(update);
  }

  SnowBall.init = function (container) {
      balls = [];

      for (var i = totalBalls; i--;) {
          var size = (Math.random() + 0.2) * 12 + 1;
          var flake = new SnowBall(size, Math.random() * window.innerWidth, Math.random() * window.innerHeight, Math.random() - 0.5, size * 0.3);
          container.appendChild(flake.div);
          balls.push(flake);
      }

      window.ondeviceorientation = function (event) {
          if (event) {
              breeze = event.gamma / 10;
          }
      };

      update();
  };

  return SnowBall;
}());

window.onload = function () {
  setTimeout(function () {
      Snowball.init(document.getElementById('falling-snow'));
  }, 500);
}