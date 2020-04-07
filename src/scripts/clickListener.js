import renderKeyboard from './keyboardRender';
import { stateButtons } from '../constants/stateButtons';

const clickListenerKeyboard = () => {
  const textarea = document.querySelector('.textarea');
  const keyboard = document.querySelector('.keyboard');

  let language = localStorage.getItem('keyboardLanguage') || 'en';

  const functionalButtonsHandler = (event) => {
    if (!event.target.classList.contains('key-button')) return;

    let button = keyboard.querySelector(
      `[data-letter='${
        event.target.innerHTML === '&amp;' ? '&' : event.target.innerHTML
      }']`
    );

    setTimeout(() => {
      event.target.classList.toggle('key-button--active');

      if (button.innerText === 'RU/EN') {
        language = language === 'en' ? 'ru' : 'en';
        localStorage.setItem('keyboardLanguage', `${language}`);
        renderKeyboard();
        return;
      }

      if (button.innerText === 'CapsLock') {
        stateButtons.isCapsLockActive = !stateButtons.isCapsLockActive;
        renderKeyboard();
        return;
      }
    }, 200);

    event.target.classList.toggle('key-button--active');

    const functionalButtons = ['RU/EN', 'CapsLock', 'Alt', 'Ctrl'];
    if (functionalButtons.includes(button.innerText)) return;

    if (button.innerText === 'Shift') {
      stateButtons.isShiftActive = !stateButtons.isShiftActive;
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

    if (button.innerText === 'Tab') {
      textarea.value += '\t';
      textarea.focus();
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

    textarea.value += button.innerText;
  };

  if (keyboard) {
    keyboard.removeEventListener('click', functionalButtonsHandler);
    keyboard.addEventListener('click', functionalButtonsHandler);
  }
};

export default clickListenerKeyboard;
