import dataKeyboard from './dataKeyboard';

import './style.css';

const mainContainer = document.createElement('div');
const textarea = document.createElement('textarea');

let language = localStorage.getItem('keyboardLanguage') || 'en';
let isCapsLockActive = false;
let isShiftActive = false;
let keyboard;

const renderTextarea = () => {
  textarea.classList = 'textarea';
  textarea.setAttribute = 'row = 50';
  textarea.setAttribute = 'cols = 5';
  mainContainer.prepend(textarea);
};

const clickListenerKeyboard = () => {
  const functionalButtonsHandler = (event) => {
    if (!event.target.classList.contains('key-button')) return;

    setTimeout(() => {
      event.target.classList.toggle('key-button:active');

      if (button.innerText === 'RU/EN') {
        language = language === 'en' ? 'ru' : 'en';
        localStorage.setItem('keyboardLanguage', `${language}`);
        renderKeyboard();
        return;
      }
    }, 200);

    let button = keyboard.querySelector(
      `[data-letter='${event.target.innerHTML}']`
    );
    event.target.classList.toggle('key-button:active');

    const functionalButtons = ['RU/EN', 'CapsLock', 'Alt', 'Ctrl'];
    if (functionalButtons.includes(button.innerText)) return;

    if (button.innerText === 'Shift') {
      isShiftActive = !isShiftActive;
      return;
    }

    if (button.innerText === 'Space') {
      textarea.value += ' ';
      return;
    }

    if (button.innerText === 'Enter') {
      textarea.value += '\n';
      return;
    }

    if (button.innerText === 'Backspace' || textarea.value === 'Backspace') {
      if (textarea.value.length < 0) return;
      for (let i = 0; i < textarea.value.length; i++) {
        textarea.value = textarea.value.slice(i, textarea.value.length - 1);
        return;
      }
      return;
    }
  };
  keyboard.removeEventListener('click', functionalButtonsHandler);
  keyboard.addEventListener('click', functionalButtonsHandler);
};

const renderKeyboard = () => {
  const isKeyboardExist = document.querySelector('keyboard');

  if (isKeyboardExist) mainContainer.removeChild(isKeyboardExist);

  keyboard = document.createElement('div');
  keyboard.className = 'keyboard';

  const languageKeyboard = dataKeyboard[language];
  languageKeyboard.forEach((row) => {
    const rowWrapper = document.createElement('div');
    rowWrapper.classList = 'row-wrapper';

    let ind = 0;
    while (ind < row.length) {
      const span = document.createElement('span');

      if (row[ind].id) {
        span.id = row[ind].id;
      }

      span.className = row[ind].class;
      span.setAttribute('data-code', `${row[ind].code}`);

      span.textContent = row[ind].letter;
      span.setAttribute(
        'data-letter',
        `${
          isCapsLockActive && row[ind].letter.length === 1
            ? row[ind].letter.toUpperCase()
            : row[ind].letter
        }`
      );

      span.setAttribute('data-code', `${row[ind].code}`);

      span.textContent =
        isCapsLockActive && row[ind].letter.length === 1
          ? row[ind].letter.toUpperCase()
          : row[ind].letter;

      if (row[ind].letter === 'Alt' || row[ind].letter === 'Ctrl') {
        span.style.width = '50px';
      }

      rowWrapper.append(span);
      ind++;
    }

    keyboard.append(rowWrapper);
  });

  mainContainer.append(keyboard);
  clickListenerKeyboard();
};

const render = () => {
  renderTextarea();
  renderKeyboard();

  mainContainer.className = 'container';
  document.body.prepend(mainContainer);
};
render();

window.onload = () => {
  document.querySelector('.textarea').focus();
};

document.addEventListener('keyup', (event) => {
  if (event.code === 'CapsLock' && !event.getModifierState('CapsLock')) {
    isCapsLockActive = false;
    renderKeyboard();
  }

  if (event.code === 'CapsLock') {
    const button = keyboard.querySelector(`[data-letter='${event.code}']`);
    button.classList.toggle('key-button:active');

    setTimeout(() => {
      button.classList.toggle('key-button:active');
    }, 200);
  }
});

document.addEventListener('keydown', (event) => {
  const functionalButtons = [
    'ControlLeft',
    'ControlRight',
    'AltLeft',
    'AltRight',
    'ShiftLeft',
    'ShiftRight',
  ];

  if (event.code === 'CapsLock' && event.getModifierState('CapsLock')) {
    isCapsLockActive = true;
    renderKeyboard();
  }

  if (
    (event.ctrlKey && event.code === 'ShiftLeft') ||
    (event.ctrlKey && event.code === 'ShiftRight')
  ) {
    language = language === 'en' ? 'ru' : 'en';
    localStorage.setItem('keyboardLanguage', `${language}`);
    renderKeyboard();
  }

  if (event.key === 'Meta') return;

  let button;
  if (functionalButtons.includes(event.code)) {
    button = keyboard.querySelector(`#${event.code}`);
  } else {
    button = button = keyboard.querySelector(`[data-code="${event.code}"]`);
  }

  button.classList.toggle('key-button:active');

  setTimeout(() => {
    button.classList.toggle('clicked');
  }, 200);
});

textarea.addEventListener('keypress', (event) => {
  event.preventDefault();

  const languageLetters = dataKeyboard[language].flat();
  const enteredLetter = languageLetters.find(
    (value) => value.code === event.code
  );
  const enteredValue =
    enteredLetter.letter.length === 1 ? enteredLetter.letter : '';

  if (enteredLetter.letter === 'Shift') {
    isShiftActive = !isShiftActive;
    return;
  }

  if (enteredLetter.letter === 'Enter') {
    textarea.value += '\n';
    return;
  }

  if (enteredLetter.letter === 'Space') {
    textarea.value += ' ';
    return;
  }

  if (isCapsLockActive || event.shiftKey) {
    textarea.value += enteredValue.toUpperCase();
    return;
  }

  textarea.value = textarea.value + enteredValue;
});
