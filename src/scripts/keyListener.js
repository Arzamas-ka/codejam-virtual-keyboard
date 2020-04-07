import renderKeyboard from './keyboardRender';
import dataKeyboard from '../constants/dataKeyboard';
import { stateButtons } from '../constants/stateButtons';

const listenKeyboardKeys = () => {
  document.addEventListener('keyup', (event) => {
    if (event.code === 'CapsLock' && !event.getModifierState('CapsLock')) {
      stateButtons.isCapsLockActive = false;
      renderKeyboard();
    }

    if (event.code === 'CapsLock') {
      const keyboard = document.querySelector('.keyboard');
      const button = keyboard.querySelector(`[data-letter='${event.code}']`);
      button.classList.toggle('key-button--active');
      setTimeout(() => {
        button.classList.toggle('key-button--active');
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

    const textarea = document.querySelector('.textarea');

    if (event.code === 'Tab') {
      event.preventDefault();
      textarea.value += '\t';
    }

    if (event.code === 'CapsLock' && event.getModifierState('CapsLock')) {
      stateButtons.isCapsLockActive = true;
      renderKeyboard();
    }

    let language = localStorage.getItem('keyboardLanguage') || 'en';

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
    const keyboard = document.querySelector('.keyboard');

    if (functionalButtons.includes(event.code)) {
      button = keyboard.querySelector(`#${event.code}`);
    } else {
      button = button = keyboard.querySelector(`[data-code="${event.code}"]`);
    }

    button.classList.toggle('key-button--active');

    setTimeout(() => {
      button.classList.toggle('key-button--active');
    }, 200);
  });

  const textarea = document.querySelector('.textarea');
  textarea.addEventListener('keypress', (event) => {
    event.preventDefault();

    let language = localStorage.getItem('keyboardLanguage') || 'en';

    const languageLetters = dataKeyboard[language].flat();
    const enteredLetter = languageLetters.find(
      (value) => value.code === event.code
    );
    const enteredValue =
      enteredLetter.letter.length === 1 ? enteredLetter.letter : '';

    if (enteredLetter.letter === 'Shift') {
      stateButtons.isShiftActive = !stateButtons.isShiftActive;

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

    if (stateButtons.isCapsLockActive || event.shiftKey) {
      textarea.value += enteredValue.toUpperCase();
      return;
    }

    textarea.value = textarea.value + enteredValue;
  });
};

export default listenKeyboardKeys;
