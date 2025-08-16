const animationModules = [];
let pageNumber = 0;

export function registerAnimation(handler) {
  animationModules.push(handler);
}

export function AnimationHandler(slideID) {
  animationModules.forEach(handler => {
    handler(slideID);
  });
}

function slider() {
  const container = document.getElementById('container');
  const sections = Array.from(container.children);
  const delay = 400;

  let inMove = false;
  let touchStartY = 0;

  function slideTransition(from, to, direction) {
    inMove = true;
    history.replaceState(null, '', `#${to + 1}`);

    const outAnim = direction === 'up' ? 'slide-fade-out-down' : 'slide-fade-out-up';
    const inAnim = direction === 'up' ? 'slide-fade-in-down' : 'slide-fade-in-up';

    sections[from].classList.remove('active');
    sections[from].style.animation = `${outAnim} 0.3s ease forwards`;

    setTimeout(() => {
      sections[from].style.animation = 'none';

      sections[to].scrollIntoView({ block: 'start' });
      sections[to].classList.add('active');

      sections[to].style.animation = `${inAnim} 0.3s ease forwards`;

      const currentSection = sections[to];
      if (currentSection && currentSection.id) {
        AnimationHandler(currentSection.id);
      }

      setTimeout(() => {
        sections[to].style.animation = 'none';
        pageNumber = to;
        inMove = false;
      }, delay);
    }, delay);
  }

  function moveUp() {
    if (inMove || pageNumber <= 0) return;
    slideTransition(pageNumber, pageNumber - 1, 'up');
  }

  function moveDown() {
    if (inMove || pageNumber >= sections.length - 1) return;
    slideTransition(pageNumber, pageNumber + 1, 'down');
  }

  function handleWheel(e) {
    if (inMove) return;
    e.preventDefault();

    if (e.deltaY < -30) {
      moveUp();
    } else if (e.deltaY > 30) {
      moveDown();
    }
  }

  function handleTouchStart(e) {
    touchStartY = e.touches[0].clientY;
  }

  function handleTouchMove(e) {
    if (inMove) return false;

    const currentY = e.touches[0].clientY;
    if (touchStartY > currentY + 5) {
      moveDown();
    } else if (touchStartY < currentY - 5) {
      moveUp();
    }

    e.preventDefault();
  }

  function handleKeyPress(e) {
    if (inMove) return;

    if (e.key === 'ArrowUp') {
      moveUp();
    } else if (e.key === 'ArrowDown') {
      moveDown();
    }
  }

  container.addEventListener('wheel', handleWheel, { passive: false });
  container.addEventListener('touchstart', handleTouchStart, {passive: false });
  container.addEventListener('touchmove', handleTouchMove, {passive: false });
  document.addEventListener('keydown', handleKeyPress);
}

slider();

window.addEventListener('DOMContentLoaded', () => {
  const hash = window.location.hash.replace('#', '');
  const index = parseInt(hash, 10) - 1;
  const sections = document.querySelectorAll('.slide');
  const section = sections[index] || sections[0];

  pageNumber = index >= 0 && index < sections.length ? index : 0;

  if (section && section.id) {
    section.scrollIntoView({ block: 'start' });
    section.classList.add('active');
    AnimationHandler(section.id);
  }
});
