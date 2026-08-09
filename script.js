const particlesConfig = {
  particles: {
    number: {
      value: 32,
      density: { enable: true, value_area: 900 },
    },
    color: { value: "#ffffff" },
    shape: {
      type: "image",
      image: { src: "heart.png", width: 50, height: 50 },
    },
    opacity: {
      value: 0.65,
      random: true,
      anim: { enable: true, speed: 0.6, opacity_min: 0.25, sync: false },
    },
    size: {
      value: 14,
      random: true,
      anim: { enable: false },
    },
    line_linked: {
      enable: true,
      distance: 120,
      color: "#ffffff",
      opacity: 0.35,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.6,
      direction: "none",
      random: true,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: {
        distance: 160,
        line_linked: { opacity: 0.6 },
      },
      push: { particles_nb: 3 },
    },
  },
  retina_detect: true,
};

document.addEventListener("DOMContentLoaded", function () {
  particlesJS("particles-js", particlesConfig, function () {
    console.log("hati siap ngikutin sentuhan kamu");
  });

  // Musik latar
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");

  function setPlayingUI(isPlaying) {
    musicToggle.textContent = isPlaying ? "❚❚" : "♪";
    musicToggle.classList.toggle("playing", isPlaying);
  }

  function playMusic() {
    bgMusic.play().then(function () {
      setPlayingUI(true);
    }).catch(function () {
      // Browser blokir autoplay, nunggu klik user
      setPlayingUI(false);
    });
  }

  musicToggle.addEventListener("click", function () {
    if (bgMusic.paused) playMusic();
    else {
      bgMusic.pause();
      setPlayingUI(false);
    }
  });

  // Coba autoplay begitu halaman dibuka
  playMusic();

  // Kalau autoplay diblokir, sentuhan/klik pertama di mana pun akan mulai muter
  const startOnFirstInteraction = function () {
    if (bgMusic.paused) playMusic();
    document.removeEventListener("click", startOnFirstInteraction);
    document.removeEventListener("touchstart", startOnFirstInteraction);
  };
  document.addEventListener("click", startOnFirstInteraction);
  document.addEventListener("touchstart", startOnFirstInteraction);

  // Support touch devices: dragging a finger should move the hearts too,
  // since particles.js only listens for mouse hover by default.
  const canvasWrap = document.getElementById("particles-js");
  canvasWrap.addEventListener(
    "touchmove",
    function (e) {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("mousemove", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvasWrap.dispatchEvent(mouseEvent);
    },
    { passive: true }
  );

  canvasWrap.addEventListener(
    "touchstart",
    function (e) {
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent("click", {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvasWrap.dispatchEvent(mouseEvent);
    },
    { passive: true }
  );

  // Tombol "Nggak dulu" kabur setiap mau disentuh/diklik
  const btnTidak = document.querySelector(".btn.btn-big2");
  if (btnTidak) {
    const dodge = function () {
      const w = btnTidak.offsetWidth;
      const h = btnTidak.offsetHeight;
      const margin = 16;
      const maxX = window.innerWidth - w - margin;
      const maxY = window.innerHeight - h - margin;
      const x = margin + Math.random() * (maxX - margin);
      const y = margin + Math.random() * (maxY - margin);

      btnTidak.style.position = "fixed";
      btnTidak.style.left = x + "px";
      btnTidak.style.top = y + "px";
      btnTidak.style.margin = "0";
    };

    // Desktop: kabur pas kursor mendekat
    btnTidak.addEventListener("mouseenter", dodge);

    // Mobile: kabur pas disentuh, jangan langsung buka modal
    btnTidak.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();
        dodge();
      },
      { passive: false }
    );

    // Jaga-jaga kalau somehow ke-klik, tetap kabur dulu
    btnTidak.addEventListener("click", function (e) {
      e.preventDefault();
      dodge();
    });
  }
});
