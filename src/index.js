import { render } from './scripts/appRender';
import listenKeyboardKeys from './scripts/keyListener';
import './style.css';

render();

window.onload = () => {
  const textarea = document.querySelector('.textarea');
  textarea.focus();
  listenKeyboardKeys();
};
