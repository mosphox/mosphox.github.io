window.addEventListener('DOMContentLoaded', () => {
  const target = document.getElementById('maintyped');

  // Wait for Typed to inject the cursor
  const waitForCursor = setInterval(() => {
    const cursor = document.querySelector('.typed-cursor');
    if (!cursor) return;

    clearInterval(waitForCursor);

    const observer = new MutationObserver(() => {
      const spans = target.querySelectorAll('span');
      const last = spans[spans.length - 1];

      if (last && last.className) {
        cursor.className = 'typed-cursor ' + last.className;
      } else {
        cursor.className = 'typed-cursor nul';
      }
    });

    observer.observe(target, {
      childList: true,
      subtree: true,
      characterData: true
    });
  }, 50);
});

