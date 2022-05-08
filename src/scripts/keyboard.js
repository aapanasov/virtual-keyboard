import Layouts from './keyboard-layouts.js';

// TODO: Keyboard Class
export default class Keyboard {
  constructor(output, lang = 'en') {
    this.lang = lang;
    this.output = output;
    this.keyLayouts = Layouts;
  }

  elements = {
    main: null,
    keysContainer: null,
    keys: [],
  };

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

    this.elements.keys = this.elements.keysContainer.querySelectorAll('.keyboard__key');

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
          keyElement.addEventListener('click', () => this.eventHandle('backspace'));
          break;

        case 'del':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Del';
          keyElement.setAttribute('keyCode', 'Delete');
          keyElement.addEventListener('click', () => this.eventHandle('delete'));
          break;

        case 'caps':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable',
            'keyboard__key--dark',
            this.capsLock ? 'keyboard__key--active' : 'nocaps',
          );
          keyElement.innerText = 'Caps';
          keyElement.setAttribute('keyCode', 'CapsLock');

          keyElement.addEventListener('click', () => {
            this.eventHandle('capslock');
            keyElement.classList.toggle('keyboard__key--active', this.capsLock);
          });
          break;

        case 'shift':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Shift';
          keyElement.setAttribute('keyCode', 'ShiftLeft');
          keyElement.id = 'ShiftLeft';
          keyElement.addEventListener('mousedown', () => this.eventHandle('shift'));
          keyElement.addEventListener('mouseup', () => this.eventHandle('shift'));
          break;

        case 'shift-r':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Shift';
          keyElement.setAttribute('keyCode', 'ShiftRight');
          keyElement.id = 'ShiftRight';

          keyElement.addEventListener('mousedown', () => this.eventHandle('shift'));
          keyElement.addEventListener('mouseup', () => this.eventHandle('shift'));

          break;

        case 'ctrl':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Ctrl';
          keyElement.setAttribute('keyCode', 'ControlLeft');

          keyElement.addEventListener('click', () => { });
          keyElement.id = 'ControlLeft';

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
          keyElement.id = 'AltLeft';

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
          keyElement.addEventListener('click', () => this.eventHandle('arrowLeft'));
          break;

        case '▲':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '▲';
          keyElement.setAttribute('keyCode', 'ArrowUp');
          keyElement.addEventListener('click', () => this.eventHandle('arrowUp'));
          break;

        case '►':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '►';
          keyElement.setAttribute('keyCode', 'ArrowRight');
          keyElement.addEventListener('click', () => this.eventHandle('arrowRight'));
          break;

        case '▼':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '▼';
          keyElement.setAttribute('keyCode', 'ArrowDown');
          keyElement.addEventListener('click', () => this.eventHandle('arrowDown'));
          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Enter';
          keyElement.setAttribute('keyCode', 'Enter');
          keyElement.addEventListener('click', () => this.eventHandle('enter'));
          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide', 'keyboard__key--dark');
          keyElement.innerText = '';
          keyElement.setAttribute('keyCode', 'Space');

          keyElement.addEventListener('click', () => this.eventHandle('space'));
          break;

        case 'tab':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Tab';
          keyElement.setAttribute('keyCode', 'Tab');
          keyElement.addEventListener('click', () => this.eventHandle('tab'));
          break;

          // TODO: create default key
        default:
          keyElement.textContent = this.capsLock ? key.toUpperCase() : key.toLowerCase();
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

          keyElement.addEventListener('click', () => this.eventHandle(key));
          break;
      }

      fragment.append(keyElement);
      if (lineBreak) {
        fragment.append(document.createElement('br'));
      }
    });

    return fragment;
  }

  // TODO: HANDLES
  handles = {
    backspace: () => {
      this.output.focus();
      const position = this.output.selectionStart;

      this.output.value = this.output.value.substring(0, this.output.selectionStart - 1)
                + this.output.value.substring(this.output.selectionStart);

      this.output.setSelectionRange(
        position - 1,
        position - 1,
      );
    },

    delete: () => {
      const position = this.output.selectionStart;

      if (position < this.output.value.length) {
        this.output.value = this.output.value.substring(0, this.output.selectionStart)
            + this.output.value.substring(this.output.selectionStart + 1);
      }

      this.output.setSelectionRange(
        position,
        position,
      );
    },

    capslock: () => {
      this.capsLock = !this.capsLock;
      localStorage.setItem('capslock', this.capsLock);
      const { keys } = this.elements;

      for (let i = 0; i < keys.length; i += 1) {
        if (keys[i].textContent.length === 1) {
          keys[i].textContent = this.capsLock
            ? keys[i].textContent.toUpperCase()
            : keys[i].textContent.toLowerCase();
        }
      }
    },

    shift: () => {
      this.shift = !this.shift;

      for (let i = 0; i < this.elements.keys.length; i += 1) {
        if (this.shift) {
          if (this.elements.keys[i].innerText.length === 1) {
            this.elements.keys[i].innerText = this.capsLock
              ? this.keyLayouts[this.lang].shifted[i].toLowerCase()
              : this.keyLayouts[this.lang].shifted[i].toUpperCase();
          }
        } else if (this.elements.keys[i].innerText.length === 1) {
          this.elements.keys[i].innerText = this.capsLock
            ? this.keyLayouts[this.lang].normal[i].toUpperCase()
            : this.keyLayouts[this.lang].normal[i].toLowerCase();
        }
      }
    },

    arrowLeft: () => {
      this.output.setSelectionRange(
        this.output.selectionStart - 1,
        this.output.selectionStart - 1,
      );
    },
    arrowRight: () => {
      this.output.setSelectionRange(
        this.output.selectionStart + 1,
        this.output.selectionStart + 1,
      );
    },

    arrowUp: () => {
      const position = this.output.selectionStart;
      this.output.value = `${this.output.value.substring(0, this.output.selectionStart)
      }▲${this.output.value.substring(this.output.selectionStart)}`;

      this.output.setSelectionRange(
        position + 1,
        position + 1,
      );
    },
    arrowDown: () => {
      const position = this.output.selectionStart;
      this.output.value = `${this.output.value.substring(0, this.output.selectionStart)
      }▼${this.output.value.substring(this.output.selectionStart)}`;

      this.output.setSelectionRange(
        position + 1,
        position + 1,
      );
    },

    enter: () => {
      const position = this.output.selectionStart;
      this.output.value = `${this.output.value.substring(0, this.output.selectionStart)
      }\n${this.output.value.substring(this.output.selectionStart)}`;

      this.output.setSelectionRange(
        position + 1,
        position + 1,
      );
    },

    space: () => {
      const position = this.output.selectionStart;
      this.output.value = `${this.output.value.substring(0, this.output.selectionStart)
      } ${this.output.value.substring(this.output.selectionStart)}`;

      this.output.setSelectionRange(
        position + 1,
        position + 1,
      );
    },

    tab: () => {
      const position = this.output.selectionStart;
      this.output.value = `${this.output.value.substring(0, this.output.selectionStart)
      }\t${this.output.value.substring(this.output.selectionStart)}`;

      this.output.setSelectionRange(
        position + 1,
        position + 1,
      );
    },

    default: (key) => {
      const position = this.output.selectionStart;
      let character = key;

      if (this.capsLock && !this.shift) {
        character = character.toUpperCase();
      }

      if (this.shift) {
        const index = this.keyLayouts[this.lang].normal.indexOf(key);
        if (!this.capsLock) {
          character = this.keyLayouts[this.lang].shifted[index];
        } else character = this.keyLayouts[this.lang].shifted[index].toLowerCase();
      }

      this.output.value = this.output.value.substring(0, this.output.selectionStart)
        + character
        + this.output.value.substring(this.output.selectionStart);

      this.output.setSelectionRange(
        position + 1,
        position + 1,
      );
    },

    // TODO: change lang
    changeLang: () => {
      this.elements.main.remove();
      this.lang = this.lang === 'ru' ? 'en' : 'ru';
      localStorage.setItem('lang', this.lang);
      localStorage.setItem('capslock', this.capsLock);
      this.init();
    },

  };

  // TODO: eventHandle
  eventHandle(event) {
    this.output.focus();

    // TODO: V-keyboard events
    if (typeof event === 'string') {
      if (event === 'backspace') { this.handles.backspace(); } else
      if (event === 'delete') { this.handles.delete(); } else
      if (event === 'capslock') { this.handles.capslock(); } else
      if (event === 'shift') { this.handles.shift(); } else
      if (event === 'arrowLeft') { this.handles.arrowLeft(); } else
      if (event === 'arrowUp') { this.handles.arrowUp(); } else
      if (event === 'arrowRight') { this.handles.arrowRight(); } else
      if (event === 'arrowDown') { this.handles.arrowDown(); } else
      if (event === 'enter') { this.handles.enter(); } else
      if (event === 'space') { this.handles.space(); } else
      if (event === 'tab') { this.handles.tab(); } else { this.handles.default(event); }
    } else {
      console.log(event.code);
    }

    // TODO: HW-keyboard events
    // TODO: change lang
    if ((event.type === 'keyup' && event.code === 'ControlLeft')
      || (event.type === 'keyup' && event.code === 'AltLeft')) {
      this.pressed.add(event.code);
      if (this.pressed.size === 2) {
        this.handles.changeLang();
      }
    } else {
      this.pressed.clear();
    }

    // TODO: on shift
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      if (this.shift === false) {
        document.getElementById(`${event.code}`).classList.toggle('active');
        this.handles.shift();
      } else if (event.type === 'keyup') {
        document.getElementById(`${event.code}`).classList.toggle('active');
        this.handles.shift();
      }
    }

    // const { keys } = this.elements;
    // for (let i = 0; i < keys.length; i += 1) {
    //   if (event.code === keys[i].getAttribute('keyCode')) {
    //     keys[i].classList.toggle('active');
    //   }
    // }

    // if (event.type === 'keydown' && event.code === 'CapsLock') {
    //   this.handles.capslock();
    //   keys[i].classList.toggle('keyboard__key--active', this.capsLock);
    // }

    // event.preventDefault();
    if (event.code === 'Tab' && event.type === 'keyup') {
      this.handles.tab();
    }
  }
}
