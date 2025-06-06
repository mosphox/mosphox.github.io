function spanify(input) {
  let result = '';
  let i = 0;

  while (i < input.length) {
    if (input[i] === '<') {
      const textStart = i + 1;
      const textEnd = input.indexOf('>', textStart);
      if (textEnd === -1) break; // malformed

      const className = input.slice(textEnd + 1, textEnd + 7);
      const block = input.slice(textStart, textEnd);

      for (const char of block) {
        result += `<span class="${className}">${char}</span>`;
      }

      i = textEnd + 7; // move past ; and 6-char class
    } else {
      result += `<span class="nulxxx">${input[i]}</span>`;
      i += 1;
    }
  }

  return result;
}
