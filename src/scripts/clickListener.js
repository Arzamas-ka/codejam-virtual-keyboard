import renderKeyboard from './keyboardRender';
import { stateButtons } from '../constants/stateButtons';
import { valueButtons } from '../constants/valueButtons';

const clickListenerKeyboard = () => {
  const textarea = document.querySelector('.textarea');
  const keyboard = document.querySelector('.keyboard');

  let language =
    localStorage.getItem('keyboardLanguage') || valueButtons.englishLang;

  const functionalButtonsHandler = (event) => {
    if (!event.target.classList.contains('key-button')) return;

    let button = keyboard.querySelector(
      `[data-letter='${
        event.target.innerHTML === valueButtons.ampersandSymbol
          ? valueButtons.ampersand
          : event.target.innerHTML
      }']`
    );

    setTimeout(() => {
      event.target.classList.toggle('key-button--active');

      if (button.innerText === valueButtons.langButton) {
        language =
          language === valueButtons.englishLang
            ? valueButtons.russianLang
            : valueButtons.englishLang;
        localStorage.setItem('keyboardLanguage', `${language}`);
        renderKeyboard();
        return;
      }

      if (button.innerText === valueButtons.capsLockButton) {
        stateButtons.isCapsLockActive = !stateButtons.isCapsLockActive;
        renderKeyboard();
        return;
      }
    }, 200);

    event.target.classList.toggle('key-button--active');

    const functionalButtons = [
      valueButtons.langButton,
      valueButtons.capsLockButton,
      valueButtons.altButton,
      valueButtons.ctrlButton,
    ];
    if (functionalButtons.includes(button.innerText)) return;

    if (button.innerText === valueButtons.shiftButton) {
      stateButtons.isShiftActive = !stateButtons.isShiftActive;
      return;
    }

    if (button.innerText === valueButtons.spaceButton) {
      textarea.value += valueButtons.emptyString;
      return;
    }

    if (button.innerText === valueButtons.enterButton) {
      textarea.value += valueButtons.enterSymbol;
      return;
    }

    if (button.innerText === valueButtons.tabButton) {
      textarea.value += valueButtons.tabSymbol;
      textarea.focus();
      return;
    }

    if (
      button.innerText === valueButtons.backspaceButton ||
      textarea.value === valueButtons.backspaceButton
    ) {
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
