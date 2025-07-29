function revealSurprise() {
  document.getElementById('surprise').classList.remove('hidden');
}

// Lightbox
function openLightbox(img) {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = img.src;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

// Floating hearts
const canvas = document.getElementById("hearts-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];

function Heart() {
  this.x = Math.random() * canvas.width;
  this.y = canvas.height + Math.random() * 100;
  this.size = Math.random() * 20 + 10;
  this.speed = Math.random() * 1 + 0.5;
  this.alpha = 1;
  this.color = `rgba(255, 105, 180, ${this.alpha})`;

  this.update = () => {
    this.y -= this.speed;
    this.alpha -= 0.005;
    this.color = `rgba(255, 105, 180, ${this.alpha})`;
  };

  this.draw = () => {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size, this.y - this.size,
                      this.x + this.size * 2, this.y + this.size,
                      this.x, this.y + this.size * 2);
    ctx.bezierCurveTo(this.x - this.size * 2, this.y + this.size,
                      this.x - this.size, this.y - this.size,
                      this.x, this.y);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.1) {
    hearts.push(new Heart());
  }

  hearts.forEach((heart, index) => {
    heart.update();
    heart.draw();
    if (heart.alpha <= 0) hearts.splice(index, 1);
  });

  requestAnimationFrame(animate);
}

animate();
