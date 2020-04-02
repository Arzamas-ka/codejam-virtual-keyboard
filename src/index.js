import dataKeyboard from './dataKeyboard';

import './style.css';


const mainContainer = document.createElement('div');

const renderTextarea = () => {
  const textarea = document.createElement('textarea');
  textarea.classList = 'textarea';
  textarea.setAttribute = 'row = 50';
  textarea.setAttribute = 'cols = 5';
  mainContainer.append(textarea);
};

const renderKeyboard = () => {
  const keyboard = document.createElement('div');
  keyboard.classList = 'keyboard';

  const languageKeyboard = dataKeyboard['en'];
  languageKeyboard.forEach(row => {
    const rowWrapper = document.createElement('div');
    rowWrapper.classList = 'row-wrapper';

    let ind = 0;
    while (ind < row.length) {
      const span = document.createElement('span');
      span.classList = row[ind].class;

      span.textContent = row[ind].letter;

      rowWrapper.append(span);
      ind++;
    }

    keyboard.append(rowWrapper);
  });

   mainContainer.append(keyboard);
};

const render = () => {
  renderTextarea();
  renderKeyboard();

  mainContainer.className = 'container';
  document.body.append(mainContainer);
};
render();