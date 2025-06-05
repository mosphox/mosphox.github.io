const texts = [
  "Built different. Like… incorrectly",
  "Scroll down for more...",
  "Open-source. Closed mind",
  "This site is a cry for help",
  "Made with love and zero planning",
  "Now with 70% more confusion",
  "Abandon hope, all ye who deploy",
  "404: dignity not found",
  "One more feature and it’ll explode",
  "This code has seen things",
  "Ask me about my demons (or don’t)",
  "Best viewed in utter darkness",
  "If it works, it's a miracle",
  "Git committed. Should’ve been.",
  "Dark mode by moral necessity",
  "UI by accident, vibes by design",
  "Some features sold separately",
  "Hello from the other side()",
  "npm install regret",
  "No refunds. Ever.",
];

const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetween = 1000;

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedText = document.getElementById('typed-text');

function type() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    typedText.textContent = currentText.substring(0, charIndex--);

    if (charIndex < 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(type, typingSpeed);

    } else {
      setTimeout(type, deletingSpeed);
    }

  } else {
    typedText.textContent = currentText.substring(0, charIndex++);
    
    if (charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(type, delayBetween);
    
    } else {
      setTimeout(type, typingSpeed);
    }
  }
}

type();
