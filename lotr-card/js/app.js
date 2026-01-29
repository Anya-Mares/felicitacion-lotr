const openBtn = document.getElementById("openBtn");
const closeBtn = document.getElementById("closeBtn");
const cardMessage = document.getElementById("cardMessage");
const elvishEl = document.getElementById("elf-text");
const particlesContainer = document.querySelector(".particles");
const fire = document.getElementById("fireSfx");


let writing = false; // evita ejecución múltiple de la escritura

// Escribir letra por letra
const TYPE_SPEED = 90;
function writeElvishText() {
  if (!elvishEl || writing) return;
  writing = true;

  if (!elvishEl.dataset.original) elvishEl.dataset.original = elvishEl.textContent.trim();
  const text = elvishEl.dataset.original;
  elvishEl.textContent = "";

  let i = 0;
  function step() {
    if (i < text.length) {
      elvishEl.textContent += text[i];
      if (i % 6 === 0) {
        elvishEl.classList.add("elf-glow");
        setTimeout(() => elvishEl.classList.remove("elf-glow"), 300);
      }
      i++; setTimeout(step, TYPE_SPEED);
    } else {
      elvishEl.classList.add("elf-glow");
      setTimeout(() => elvishEl.classList.remove("elf-glow"), 900);
      writing = false;
    }
  }
  step();
}

// Crear partículas doradas
function createParticles(count = 30) {
  const rect = particlesContainer.getBoundingClientRect();

  for (let i = 0; i < count; i++) {
    const span = document.createElement("span");

    span.style.left = Math.random() * rect.width + "px";
    span.style.top = Math.random() * rect.height + "px";

    span.style.animationDuration = (5 + Math.random() * 10) + "s";
    span.style.width = span.style.height = (2 + Math.random() * 4) + "px";
    span.style.animationDelay = (Math.random() * 5) + "s";
    
    particlesContainer.appendChild(span);
  }
}
createParticles();

// Abrir tarjeta
openBtn.addEventListener("click", () => {
  cardMessage.classList.remove("oculto");
  cardMessage.classList.add("abierta");

  // reproducir fuego
  fire.play().catch(e => console.log("No se pudo reproducir: ", e));

  setTimeout(writeElvishText, 200);
});

// Cerrar tarjeta
closeBtn.addEventListener("click", () => {
  elvishEl.textContent = "";
  cardMessage.classList.add("oculto");
  cardMessage.classList.remove("abierta");

  // detener fuego
  fire.pause();
  fire.currentTime = 0;
});

// Sombra dinámica del Anillo
document.addEventListener('mousemove', e => {
  const anillo = document.querySelector('.anillo-imagen');
  if (anillo.matches(':hover')) {
    anillo.style.filter = 'drop-shadow(0 0 40px orange) blur(3px)';
  } else {
    const x = (window.innerWidth / 2 - e.pageX) / 20;
    const y = (window.innerHeight / 2 - e.pageY) / 20;
    anillo.style.filter = `drop-shadow(${x}px ${y}px 20px orange)`;
  }
});




