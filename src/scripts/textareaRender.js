const renderTextarea = () => {
  const mainContainer = document.querySelector('.container');
  const textarea = document.createElement('textarea');
  textarea.className = 'textarea';
  textarea.setAttribute = 'row = 50';
  textarea.setAttribute = 'cols = 5';
  mainContainer.prepend(textarea);
  return textarea;
};

export default renderTextarea;
