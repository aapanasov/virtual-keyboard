import Layouts from './keyboard-layouts.js';

// TODO: Keyboard Class
class Keyboard {
  constructor(output, lang = 'en') {
    this.lang = lang;
    this.output = output;
    this.keyLayouts = Layouts;
  }

  elements = {
    main: null,
    keysContainer: null,
    key: [],
  };

  eventHandlers = {
    oninput: null,
  };

  // value = '';

  capsLock = false;

  shift = false;

  pressed = new Set();

  // TODO: init
  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.append(this.createKeys(this.keyLayouts[this.lang].normal));

    this.elements.key = this.elements.keysContainer.querySelectorAll('.keyboard__key');

    // Add to DOM
    this.elements.main.append(this.elements.keysContainer);
    document.body.append(this.elements.main);
  }

  // TODO: create keys

  createKeys(layout) {
    const fragment = document.createDocumentFragment();

    layout.forEach((key) => {
      const keyElement = document.createElement('button');
      const lineBreak = ['backspace', 'del', 'enter', 'shift-r'].indexOf(key) !== -1;
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        // TODO: backspace
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Backspace';
          keyElement.setAttribute('keyCode', 'Backspace');

          keyElement.addEventListener('click', () => {
            const position = this.output.selectionStart;

            this.output.value = this.output.value.substring(0, this.output.selectionStart - 1)
              + this.output.value.substring(this.output.selectionStart);

            this.output.setSelectionRange(
              position - 1,
              position - 1,
            );

            this.triggerEvent('backspace');
          });
          break;

        case 'del':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Del';
          keyElement.setAttribute('keyCode', 'Delete');

          keyElement.addEventListener('click', () => {
            const position = this.output.selectionStart;

            if (position < this.output.value.length) {
              this.output.value = this.output.value.substring(0, this.output.selectionStart)
                + this.output.value.substring(this.output.selectionStart + 1);
            }

            this.output.setSelectionRange(
              position,
              position,
            );
            this.triggerEvent('del');
          });
          break;

        case 'caps':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable',
            'keyboard__key--dark',
          );
          keyElement.innerText = 'Caps';
          keyElement.setAttribute('keyCode', 'CapsLock');

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active', this.capsLock);
          });
          break;

        case 'shift':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Shift';
          keyElement.setAttribute('keyCode', 'ShiftLeft');

          keyElement.addEventListener('mousedown', () => this.toggleShift());
          keyElement.addEventListener('mouseup', () => this.toggleShift());
          break;

        case 'shift-r':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Shift';
          keyElement.setAttribute('keyCode', 'ShiftRight');

          keyElement.addEventListener('mousedown', () => this.toggleShift());
          keyElement.addEventListener('mouseup', () => this.toggleShift());
          break;

        case 'ctrl':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Ctrl';
          keyElement.setAttribute('keyCode', 'ControlLeft');

          keyElement.addEventListener('click', () => { });
          break;
        case 'ctrl-r':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Ctrl';
          keyElement.setAttribute('keyCode', 'ControlRight');

          keyElement.addEventListener('click', () => { });
          break;

        case 'win':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Win';

          keyElement.addEventListener('click', () => { });
          break;

        case 'alt':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Alt';
          keyElement.setAttribute('keyCode', 'AltLeft');

          keyElement.addEventListener('click', () => { });
          break;

        case 'alt-r':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Alt';
          keyElement.setAttribute('keyCode', 'AltRight');

          keyElement.addEventListener('click', () => { });
          break;

        // TODO: arrows
        case '◄':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '◄';
          keyElement.setAttribute('keyCode', 'ArrowLeft');

          keyElement.addEventListener('click', () => {
            this.output.setSelectionRange(
              this.output.selectionStart - 1,
              this.output.selectionStart - 1,
            );
            this.triggerEvent('left');
          });
          break;

        case '▲':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '▲';
          keyElement.setAttribute('keyCode', 'ArrowUp');

          keyElement.addEventListener('click', () => {
            const position = this.output.selectionStart;
            this.output.value = this.output.value.substring(0, this.output.selectionStart)
              + key
              + this.output.value.substring(this.output.selectionStart);

            this.output.setSelectionRange(
              position + 1,
              position + 1,
            );

            this.triggerEvent('up');
          });

          break;

        case '►':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '►';
          keyElement.setAttribute('keyCode', 'ArrowRight');

          keyElement.addEventListener('click', () => {
            this.output.setSelectionRange(
              this.output.selectionStart + 1,
              this.output.selectionStart + 1,
            );

            this.triggerEvent('right');
          });

          break;

        case '▼':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '▼';
          keyElement.setAttribute('keyCode', 'ArrowDown');

          keyElement.addEventListener('click', () => {
            const position = this.output.selectionStart;
            this.output.value = this.output.value.substring(0, this.output.selectionStart)
              + key
              + this.output.value.substring(this.output.selectionStart);

            this.output.setSelectionRange(
              position + 1,
              position + 1,
            );

            this.triggerEvent('down');
          });
          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Enter';
          keyElement.setAttribute('keyCode', 'Enter');

          keyElement.addEventListener('click', () => {
            const position = this.output.selectionStart;
            this.output.value = `${this.output.value.substring(0, this.output.selectionStart)
            }\n${this.output.value.substring(this.output.selectionStart)}`;

            this.output.setSelectionRange(
              position + 1,
              position + 1,
            );

            this.triggerEvent('enter');
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide', 'keyboard__key--dark');
          keyElement.innerText = '';
          keyElement.setAttribute('keyCode', 'Space');

          keyElement.addEventListener('click', () => {
            const position = this.output.selectionStart;
            this.output.value = `${this.output.value.substring(0, this.output.selectionStart)
            } ${this.output.value.substring(this.output.selectionStart)}`;

            this.output.setSelectionRange(
              position + 1,
              position + 1,
            );

            this.triggerEvent('space');
          });
          break;

        case 'tab':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Tab';
          keyElement.setAttribute('keyCode', 'Tab');

          keyElement.addEventListener('click', () => {
            const position = this.output.selectionStart;
            this.output.value = `${this.output.value.substring(0, this.output.selectionStart)
            }\t${this.output.value.substring(this.output.selectionStart)}`;

            this.output.setSelectionRange(
              position + 1,
              position + 1,
            );

            this.triggerEvent('tab');
          });
          break;

        // TODO: default key pressed
        default:
          keyElement.textContent = key;
          if (key === '0' || key === '1'
            || key === '2' || key === '3'
            || key === '4' || key === '5'
            || key === '6' || key === '7'
            || key === '8' || key === '9') {
            keyElement.setAttribute('keyCode', `Digit${key}`);
          } else
          if (key === '`') { keyElement.setAttribute('keyCode', 'Backquote'); } else
          if (key === '-') { keyElement.setAttribute('keyCode', 'Minus'); } else
          if (key === '=') { keyElement.setAttribute('keyCode', 'Equal'); } else
          if (key === '[') { keyElement.setAttribute('keyCode', 'BracketLeft'); } else
          if (key === ']') { keyElement.setAttribute('keyCode', 'BracketRight'); } else
          if (key === ';') { keyElement.setAttribute('keyCode', 'Semicolon'); } else
          if (key === "'") { keyElement.setAttribute('keyCode', 'Quote'); } else
          if (key === ',') { keyElement.setAttribute('keyCode', 'Comma'); } else
          if (key === '.') { keyElement.setAttribute('keyCode', 'Period'); } else
          if (key === '/') { keyElement.setAttribute('keyCode', 'Slash'); } else {
            keyElement.setAttribute('keyCode', `Key${key.toUpperCase()}`);
          }

          keyElement.addEventListener('click', () => {
            const position = this.output.selectionStart;
            this.output.value = this.output.value.substring(0, this.output.selectionStart)
              // + (this.capsLock ? key.toUpperCase() : key.toLowerCase())
              + keyElement.innerText
              + this.output.value.substring(this.output.selectionStart);

            this.output.setSelectionRange(
              position + 1,
              position + 1,
            );

            this.triggerEvent(key);
          });
          break;
      }

      fragment.append(keyElement);
      if (lineBreak) {
        fragment.append(document.createElement('br'));
      }
    });

    return fragment;
  }

  // TODO: triggerEvent
  triggerEvent() {
    this.output.focus();
  }

  // TODO: toggle Caps
  toggleCapsLock() {
    this.capsLock = !this.capsLock;
    const keys = this.elements.key;

    for (let i = 0; i < keys.length; i += 1) {
      if (keys[i].textContent.length === 1) {
        keys[i].textContent = this.capsLock
          ? keys[i].textContent.toUpperCase()
          : keys[i].textContent.toLowerCase();
      }
    }
  }

  // TODO: toggle Shift
  toggleShift() {
    this.shift = !this.shift;

    for (let i = 0; i < this.elements.key.length; i += 1) {
      if (this.shift) {
        if (this.elements.key[i].innerText.length === 1) {
          this.elements.key[i].innerText = this.capsLock
            ? this.keyLayouts[this.lang].shifted[i].toLowerCase()
            : this.keyLayouts[this.lang].shifted[i].toUpperCase();
        }
      } else if (this.elements.key[i].innerText.length === 1) {
        this.elements.key[i].innerText = this.capsLock
          ? this.keyLayouts[this.lang].normal[i].toUpperCase()
          : this.keyLayouts[this.lang].normal[i].toLowerCase();
      }
    }
  }

  // TODO: change lang
  changeLang() {
    this.lang = this.lang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', this.lang);
  }

  // TODO: physical keyboard events handler
  handleKeyboardEvents(event) {
    this.output.focus();

    if ((event.type === 'keydown' && event.code === 'ControlLeft')
    || (event.type === 'keydown' && event.code === 'ShiftLeft')) {
      this.pressed.add(event.code);
      if (this.pressed.size === 2) { this.changeLang(); }
    } else (this.pressed.clear());

    const keys = this.elements.key;
    for (let i = 0; i < keys.length; i += 1) {
      if (event.code === keys[i].getAttribute('keyCode')) {
        keys[i].classList.toggle('active');

        if (event.type === 'keydown' && event.code === 'CapsLock') {
          this.toggleCapsLock();
          keys[i].classList.toggle('keyboard__key--active', this.capsLock);
        }

        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          this.toggleShift();
        }

        if (event.code === 'Tab') {
          event.preventDefault();
          if (event.type === 'keyup') {
            const position = this.output.selectionStart;
            this.output.value = `${this.output.value.substring(0, this.output.selectionStart)
            }\t${this.output.value.substring(this.output.selectionStart)}`;

            this.output.setSelectionRange(
              position + 1,
              position + 1,
            );

            this.triggerEvent('tab');
          }
        }
      }
    }
  }
}

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
