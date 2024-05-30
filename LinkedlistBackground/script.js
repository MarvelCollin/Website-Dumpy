document.addEventListener("DOMContentLoaded", function () {
    var width = window.innerWidth;
    var height = window.innerHeight;
  
    function random(min, max) {
      return Math.random() * (max - min) + min;
    }
  
    function createParticle() {
      var particle = document.createElement("div");
      particle.classList.add("particle");
      document.body.appendChild(particle);
      return particle;
    }
  
    function moveParticle(particle) {
      var x = random(0, width) * 2;
      var y = random(0, height - 10) * 2;
  
      particle.style.transform = `translate(${x}px, ${y}px)`;
    }
  
    for (var i = 0; i < 50; i++) {
      var particle = createParticle();
      moveParticle(particle);
    }
  
    function moving() {
      var particles = document.querySelectorAll(".particle");
      particles.forEach(function (particle) {
        moveParticle(particle);
      });
    }
  
    moving(); 
    setTimeout(moving, 1);  
  });
  