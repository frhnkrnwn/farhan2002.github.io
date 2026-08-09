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

// ===== Tema warna =====
const themes = {
  sunset: ["#ff6a88", "#ff99ac", "#a18cd1", "#fbc2eb", "#a1477a"],
  ocean: ["#4facfe", "#7fd8ff", "#00c9ff", "#00f2fe", "#0d6b8a"],
  peach: ["#ffb199", "#ff9a76", "#ff6a5c", "#ff0844", "#b3324a"],
  lavender: ["#a18cd1", "#c9a7eb", "#d5b8f0", "#fbc2eb", "#7a5a9e"],
  mint: ["#43e97b", "#6ff0a0", "#20d3c2", "#38f9d7", "#1f8a6f"],
  night: ["#232946", "#3a3f6b", "#565e8f", "#6b6f9e", "#1a1e33"],
};

function applyTheme(colors) {
  const root = document.documentElement.style;
  root.setProperty("--c1", colors[0]);
  root.setProperty("--c2", colors[1]);
  root.setProperty("--c3", colors[2]);
  root.setProperty("--c4", colors[3]);
  root.setProperty("--accent", colors[4]);
}

function lighten(hex, amount) {
  const num = parseInt(hex.replace("#", ""), 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;
  r = Math.max(Math.min(255, r), 0);
  g = Math.max(Math.min(255, g), 0);
  b = Math.max(Math.min(255, b), 0);
  return "#" + (0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1);
}

function customThemeFrom(hex) {
  return [hex, lighten(hex, 30), lighten(hex, -40), lighten(hex, 60), lighten(hex, -70)];
}

// ===== Kata-kata gantian =====
const quotes = [
  "Keberanian itu bukan nggak takut, tapi tetep jalan walau deg-degan.",
  "Kadang yang paling susah cuma ngomong dua kalimat pertama.",
  "Semoga apapun jawabannya, kita tetep bisa temenan baik-baik.",
  "Nggak semua hal harus direncanain, kadang cukup jujur aja.",
  "Satu pertanyaan simpel, tapi mikirnya lama banget wkwk.",
  "Terima kasih udah baca sampai sini.",
];

document.addEventListener("DOMContentLoaded", function () {
  particlesJS("particles-js", particlesConfig, function () {
    console.log("hati siap ngikutin sentuhan kamu");
  });

  // ---- Jam & sapaan ----
  const clockTime = document.getElementById("clockTime");
  const clockGreet = document.getElementById("clockGreet");

  function pad(n) {
    return n < 10 ? "0" + n : "" + n;
  }

  function greetingFor(h) {
    if (h < 4) return "Tengah malam";
    if (h < 10) return "Selamat pagi";
    if (h < 15) return "Selamat siang";
    if (h < 18) return "Selamat sore";
    return "Selamat malam";
  }

  function tickClock() {
    const now = new Date();
    clockTime.textContent =
      pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());
    clockGreet.textContent = greetingFor(now.getHours());
  }
  tickClock();
  setInterval(tickClock, 1000);

  // ---- Kata-kata gantian ----
  const quoteEl = document.getElementById("quoteText");
  let quoteIndex = 0;
  function showQuote() {
    quoteEl.style.opacity = 0;
    setTimeout(function () {
      quoteEl.textContent = quotes[quoteIndex];
      quoteEl.style.opacity = 1;
      quoteIndex = (quoteIndex + 1) % quotes.length;
    }, 300);
  }
  showQuote();
  setInterval(showQuote, 6000);

  // ---- Panel ganti warna ----
  const themeToggle = document.getElementById("themeToggle");
  const themePanel = document.getElementById("themePanel");
  const customColor = document.getElementById("customColor");

  themeToggle.addEventListener("click", function () {
    themePanel.classList.toggle("open");
  });

  document.querySelectorAll(".swatch").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const key = btn.getAttribute("data-theme");
      applyTheme(themes[key]);
    });
  });

  customColor.addEventListener("input", function () {
    applyTheme(customThemeFrom(customColor.value));
  });

  document.addEventListener("click", function (e) {
    if (
      themePanel.classList.contains("open") &&
      !themePanel.contains(e.target) &&
      e.target !== themeToggle
    ) {
      themePanel.classList.remove("open");
    }
  });

  // ---- Musik latar ----
  const bgMusic = document.getElementById("bgMusic");
  const musicToggle = document.getElementById("musicToggle");

  function setPlayingUI(isPlaying) {
    musicToggle.textContent = isPlaying ? "❚❚" : "♪";
    musicToggle.classList.toggle("playing", isPlaying);
  }

  function playMusic() {
    bgMusic
      .play()
      .then(function () {
        setPlayingUI(true);
      })
      .catch(function () {
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

  playMusic();

  const startOnFirstInteraction = function () {
    if (bgMusic.paused) playMusic();
    document.removeEventListener("click", startOnFirstInteraction);
    document.removeEventListener("touchstart", startOnFirstInteraction);
  };
  document.addEventListener("click", startOnFirstInteraction);
  document.addEventListener("touchstart", startOnFirstInteraction);

  // ---- Support touch buat hati ngikutin sentuhan ----
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

  // ---- Tombol "Nggak dulu" kabur ----
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

    btnTidak.addEventListener("mouseenter", dodge);

    btnTidak.addEventListener(
      "touchstart",
      function (e) {
        e.preventDefault();
        dodge();
      },
      { passive: false }
    );

    btnTidak.addEventListener("click", function (e) {
      e.preventDefault();
      dodge();
    });
  }
});
