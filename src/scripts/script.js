import Keyboard from './keyboard.js';

// TODO: textarea
const textarea = document.createElement('textarea');
textarea.setAttribute('id', 'textarea');
document.body.append(textarea);

// TODO: main

const lang = localStorage.getItem('lang') || 'en';
const keyboard = new Keyboard(textarea, lang);
window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});

// TODO: key hook
const keysHandler = (event) => {
  keyboard.handleKeyboardEvents(event);
};
window.addEventListener('keydown', keysHandler);
window.addEventListener('keyup', keysHandler);
