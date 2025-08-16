import { registerAnimation } from '../slider.js';

const SLIDE_ID = 'slide-1';
let typed = null;

function parseStyledText(str) {
  return str.replace(/<<([^<>]+)>>([^\s.]+)/g, (_, word, color) => {
    return `<span style="color: ${color}">${word}</span>`;
  });
}

async function fetchTypedPool() {
  const res = await fetch("assets/typed/pool.json");
  if (!res.ok) throw new Error("Can't load typed pool");
  const Pool = await res.json();
  return Pool.map(parseStyledText);
}

async function start() {
  const typedElement = document.querySelector("#typed");
  if (!typedElement || typed) return;

  const strings = await fetchTypedPool();

  typed = new Typed("#typed", {
    strings,
    typeSpeed: 35,
    backSpeed: 25,
    loop: true,
    showCursor: true,
    cursorChar: '_',
    smartBackspace: true,
    startDelay: 400,
    backDelay: 1000,
    contentType: 'html'
  });
}

function stop() {
  if (typed) {
    setTimeout(() => {
      typed.destroy();
      typed = null;
    }, 300);
  }
}

function summoner(slideID) {
  if (slideID === SLIDE_ID) {
    start();
  } else {
    stop();
  }
}

registerAnimation(summoner);
