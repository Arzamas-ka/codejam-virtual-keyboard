import renderTextarea from './textareaRender';
import renderKeyboard from './keyboardRender';

export const render = () => {
  const mainContainer = document.createElement('div');
  mainContainer.className = 'container';
  document.body.prepend(mainContainer);

  renderTextarea();
  renderKeyboard();
};
