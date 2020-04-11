import clickListenerKeyboard from './clickListener';
import dataKeyboard from '../constants/dataKeyboard';
import { stateButtons } from '../constants/stateButtons';
import { valueButtons } from '../constants/valueButtons';

const renderKeyboard = () => {
  const isKeyboardExist = document.querySelector('.keyboard');
  const mainContainer = document.querySelector('.container');

  if (isKeyboardExist) mainContainer.removeChild(isKeyboardExist);

  const keyboard = document.createElement('div');
  keyboard.className = 'keyboard';

  const language = localStorage.getItem('keyboardLanguage') || valueButtons.englishLang;

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
          stateButtons.isCapsLockActive && row[ind].letter.length === 1
            ? row[ind].letter.toUpperCase()
            : row[ind].letter
        }`
      );

      span.setAttribute('data-code', `${row[ind].code}`);

      span.textContent =
        stateButtons.isCapsLockActive && row[ind].letter.length === 1
          ? row[ind].letter.toUpperCase()
          : row[ind].letter;

      if (row[ind].letter === valueButtons.altButton || row[ind].letter === valueButtons.ctrlButton) {
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

export default renderKeyboard;
