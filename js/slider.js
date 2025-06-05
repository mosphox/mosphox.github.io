function slider() {
  const container = document.getElementById('container');
  const sections = Array.from(document.querySelectorAll('section'));

  let page = 0;
  let isscrolling = false;

  const margin = 50;
  const cooldown = 500;

  function scroll(index) {
    if (index < 0 || index >= sections.length) return;
    page = index;
    const offset = sections[index].offsetTop;

    container.scrollTo({
      top: offset,
      behavior: 'smooth'
    });

    sections.forEach(sec => sec.classList.remove('active'));
    sections[index].classList.add('active');
  }

  function handler(event) {
    if (isscrolling) return;

    event.preventDefault();

    const delta = event.deltaY;

    if (delta > margin) {
      page = Math.min(page + 1, sections.length - 1);
    } else if (delta < margin * -1) {
      page = Math.max(page - 1, 0);
    } else {
      return;
    }

    scroll(page);
    isscrolling = true;

    setTimeout(() => {
      isscrolling = false;
    }, cooldown);

  }

  function initfromhash() {
    const hash = window.location.hash;

    if (hash) {
      const number = parseInt(hash.replace('#', ''), 10);

      if (!isNaN(number) && number >= 1 && number <= sections.length) {
        page = number - 1;
        scroll(page);
      }
    }
  }

  function hashobserver() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            history.replaceState(null, '', `#${id}`);
            page = sections.findIndex(section => section.id === id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(section => observer.observe(section));
  }

  window.addEventListener('wheel', handler, { passive: false });

  window.addEventListener('hashchange', () => {
    const hash = window.location.hash;
    const number = parseInt(hash.replace('#', ''), 10);

    if (!isNaN(number) && number >= 1 && number <= sections.length) {
      page = number - 1;
      scroll(currentIndex);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    initfromhash();
    hashobserver();
    scroll(page);
  });
}

slider();
