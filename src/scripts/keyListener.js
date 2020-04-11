import renderKeyboard from './keyboardRender';
import dataKeyboard from '../constants/dataKeyboard';
import { stateButtons } from '../constants/stateButtons';
import { valueButtons } from '../constants/valueButtons';

const listenKeyboardKeys = () => {
  document.addEventListener('keyup', (event) => {
    if (
      event.code === valueButtons.capsLockButton &&
      !event.getModifierState(valueButtons.capsLockButton)
    ) {
      stateButtons.isCapsLockActive = false;
      renderKeyboard();
    }

    if (event.code === valueButtons.capsLockButton) {
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
      valueButtons.controlLeftButton,
      valueButtons.controlRightButton,
      valueButtons.altLeftButton,
      valueButtons.altRightButton,
      valueButtons.shiftLeftButton,
      valueButtons.shiftRightButton,
    ];

    const textarea = document.querySelector('.textarea');

    if (event.code === valueButtons.tabButton) {
      event.preventDefault();
      textarea.value += valueButtons.tabSymbol;
    }

    if (
      event.code === valueButtons.capsLockButton &&
      event.getModifierState(valueButtons.capsLockButton)
    ) {
      stateButtons.isCapsLockActive = true;
      renderKeyboard();
    }

    let language =
      localStorage.getItem('keyboardLanguage') || valueButtons.englishLang;

    if (
      (event.ctrlKey && event.code === valueButtons.shiftLeftButton) ||
      (event.ctrlKey && event.code === valueButtons.shiftRightButton)
    ) {
      language =
        language === valueButtons.englishLang
          ? valueButtons.russianLang
          : valueButtons.englishLang;
      localStorage.setItem('keyboardLanguage', `${language}`);
      renderKeyboard();
    }

    if (event.key === valueButtons.metaButton) return;

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

    let language =
      localStorage.getItem('keyboardLanguage') || valueButtons.englishLang;

    const languageLetters = dataKeyboard[language].flat();
    const enteredLetter = languageLetters.find(
      (value) => value.code === event.code
    );
    const enteredValue =
      enteredLetter.letter.length === 1
        ? enteredLetter.letter
        : valueButtons.emptyString;

    if (enteredLetter.letter === valueButtons.shiftButton) {
      stateButtons.isShiftActive = !stateButtons.isShiftActive;

      return;
    }

    if (enteredLetter.letter === valueButtons.enterButton) {
      textarea.value += valueButtons.enterSymbol;
      return;
    }

    if (enteredLetter.letter === valueButtons.spaceButton) {
      textarea.value += valueButtons.emptyString;
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
