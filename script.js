document.addEventListener("DOMContentLoaded", () => {

  let currentPage = 0;
  const pages = document.querySelectorAll(".page");

  function showPage(i) {
    pages.forEach(p => p.classList.remove("active"));
    pages[i].classList.add("active");
  }

  function nextPage() {
    currentPage++;
    if (currentPage < pages.length) showPage(currentPage);
  }

  document.querySelectorAll(".nextBtn").forEach(btn =>
    btn.addEventListener("click", nextPage)
  );

  // 🔐 unlock
  document.getElementById("unlockBtn").addEventListener("click", () => {
    const pass = document.getElementById("password").value;
    if (pass === "I Love You Pattu") nextPage();
    else alert("Wrong password 😢 - I Love You Pattu");
  });

  // ⏳ countdown
  const targetDate = new Date("April 27, 2026 00:00:00").getTime();
  const timer = document.getElementById("timer");
  const unlock = document.getElementById("unlockContainer");

  setInterval(() => {
    const now = new Date().getTime();
    // const diff = targetDate - now;
    const diff = 0;

    if (diff <= 0) {
      timer.innerHTML = "🎉 Time to unlock!";
      unlock.classList.remove("hidden");
      return;
    }

    const h = Math.floor((diff % (1000*60*60*24))/(1000*60*60));
    const m = Math.floor((diff % (1000*60*60))/(1000*60));
    const s = Math.floor((diff % (1000*60))/1000);

    timer.innerHTML = `<div>${h}h</div><div>${m}m</div><div>${s}s</div>`;
  }, 1000);

  // 🎆 fireworks
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function createFirework(x, y) {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x, y,
          dx: (Math.random()-0.5)*6,
          dy: (Math.random()-0.5)*6,
          life: 100
        });
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0,0,canvas.width,canvas.height);

      particles.forEach((p,i)=>{
        p.x+=p.dx; p.y+=p.dy; p.life--;
        ctx.fillStyle="#ff2e63";
        ctx.fillRect(p.x,p.y,2,2);
        if(p.life<=0) particles.splice(i,1);
      });

      requestAnimationFrame(animate);
    }

    animate();

    document.getElementById("blastBtn")?.addEventListener("click", () => {
      for(let i=0;i<6;i++){
        createFirework(Math.random()*canvas.width, Math.random()*canvas.height/2);
      }
    });
  }

  // 🎆 confetti
  document.getElementById("confettiBtn")?.addEventListener("click", () => {
    confetti({ particleCount: 200, spread: 120 });
  });

});
