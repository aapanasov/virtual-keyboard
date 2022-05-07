import Keyboard from './keyboard.js';

// TODO: hint
const hint = document.createElement('div');
hint.classList.add('hint');
hint.innerText = 'Клавиатура создана в операционной системе Windows\nДля переключения языка комбинация: левыe ctrl + shift';
document.body.append(hint);

// TODO: textarea
const textarea = document.createElement('textarea');
textarea.setAttribute('id', 'textarea');
document.body.append(textarea);

// TODO: keyboard

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
