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
  mainContainer.append(textarea);
};

const clickListenerKeyboard = () => {
  const handler = (event) => {
    if (!event.target.classList.contains('key-button')) return;

    setTimeout(() => {
      event.target.classList.contains('key-button');

      if (event.target.innerText === 'RU/EN') {
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
    console.log(button);
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
  keyboard.removeEventListener('click', handler);
  keyboard.addEventListener('click', handler);
};

const renderKeyboard = () => {
  keyboard = document.createElement('div');
  keyboard.classList = 'keyboard';

  const languageKeyboard = dataKeyboard['en'];
  languageKeyboard.forEach((row) => {
    const rowWrapper = document.createElement('div');
    rowWrapper.classList = 'row-wrapper';

    let ind = 0;
    while (ind < row.length) {
      const span = document.createElement('span');
      span.classList = row[ind].class;

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
  document.body.append(mainContainer);
};
render();

window.onload = () => {
  document.querySelector('.textarea').focus();
};
