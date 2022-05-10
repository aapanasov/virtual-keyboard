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
          keyElement.id = 'Backspace';
          keyElement.addEventListener('click', () => this.eventHandle('backspace'));
          break;

        case 'del':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Del';
          keyElement.id = 'Delete';
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
          keyElement.id = 'CapsLock';
          keyElement.addEventListener('click', () => {
            this.eventHandle('capslock');
            keyElement.classList.toggle('keyboard__key--active', this.capsLock);
          });
          break;

        case 'shift':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Shift';
          keyElement.id = 'ShiftLeft';
          keyElement.addEventListener('mousedown', () => this.eventHandle('shift'));
          keyElement.addEventListener('mouseup', () => this.eventHandle('shift'));
          break;

        case 'shift-r':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Shift';
          keyElement.id = 'ShiftRight';
          keyElement.addEventListener('mousedown', () => this.eventHandle('shift'));
          keyElement.addEventListener('mouseup', () => this.eventHandle('shift'));

          break;

        case 'ctrl':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Ctrl';
          keyElement.addEventListener('click', () => { });
          keyElement.id = 'ControlLeft';
          break;

        case 'ctrl-r':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Ctrl';
          keyElement.id = 'ControlRight';
          keyElement.addEventListener('click', () => { });
          break;

        case 'win':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Win';
          keyElement.id = 'MetaLeft';
          keyElement.addEventListener('click', () => { });
          break;

        case 'alt':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Alt';
          keyElement.id = 'AltLeft';
          keyElement.addEventListener('click', () => { });
          break;

        case 'alt-r':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Alt';
          keyElement.id = 'AltRight';
          keyElement.addEventListener('click', () => { });
          break;

          // TODO: arrows
        case '◄':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '◄';
          keyElement.id = 'ArrowLeft';
          keyElement.addEventListener('click', () => this.eventHandle('arrowLeft'));
          break;

        case '▲':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '▲';
          keyElement.id = 'ArrowUp';
          keyElement.addEventListener('click', () => this.eventHandle('arrowUp'));
          break;

        case '►':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '►';
          keyElement.id = 'ArrowRight';
          keyElement.addEventListener('click', () => this.eventHandle('arrowRight'));
          break;

        case '▼':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '▼';
          keyElement.id = 'ArrowDown';

          keyElement.addEventListener('click', () => this.eventHandle('arrowDown'));
          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Enter';
          keyElement.id = 'Enter';
          keyElement.addEventListener('click', () => this.eventHandle('enter'));
          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide', 'keyboard__key--dark');
          keyElement.innerText = '';
          keyElement.id = 'Space';
          keyElement.addEventListener('click', () => this.eventHandle('space'));
          break;

        case 'tab':
          keyElement.classList.add(
            'keyboard__key--dark',
          );
          keyElement.innerText = 'Tab';
          keyElement.id = 'Tab';
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
            keyElement.id = `Digit${key}`;
          } else
          if (key === '\\') { keyElement.id = 'Backslash'; } else
          if (key === '`' || key === 'ё') { keyElement.id = 'Backquote'; } else
          if (key === '-') { keyElement.id = 'Minus'; } else
          if (key === '=') { keyElement.id = 'Equal'; } else
          if (key === '[' || key === 'х') { keyElement.id = 'BracketLeft'; } else
          if (key === ']' || key === 'ъ') { keyElement.id = 'BracketRight'; } else
          if (key === ';' || key === 'ж') { keyElement.id = 'Semicolon'; } else
          if (key === "'" || key === 'э') { keyElement.id = 'Quote'; } else
          if (key === ',') { keyElement.id = 'Comma'; } else
          if (key === '.') {
            keyElement.id = this.lang === 'en' ? 'Period' : 'Slash';
          } else
          if (key === '/') {
            keyElement.id = this.lang === 'en' ? 'Slash' : 'Period';
          } else
          if (key === 'б') { keyElement.id = 'Comma'; } else
          if (key === 'ю') { keyElement.id = 'Period'; } else {
            const index = this.keyLayouts[this.lang].normal.indexOf(key);
            const character = this.keyLayouts.en.normal[index];
            keyElement.id = `Key${character.toUpperCase()}`;
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

    virtualDefault: (key) => {
      let char = key;
      const index = this.keyLayouts[this.lang].normal.indexOf(key);

      if (this.shift && !this.capsLock) {
        char = this.keyLayouts[this.lang].shifted[index];
      }
      if (!this.shift && this.capsLock) {
        char = key.toUpperCase();
      }
      if (this.shift && this.capsLock) {
        char = this.keyLayouts[this.lang].shifted[index].toLowerCase();
      }

      const position = this.output.selectionStart;

      this.output.value = this.output.value.substring(0, this.output.selectionStart)
      + char
        + this.output.value.substring(this.output.selectionStart);

      this.output.setSelectionRange(
        position + 1,
        position + 1,
      );
    },

    // TODO: hwDefault handle
    hardwareDefault: (event) => {
      const char = document.getElementById(event.code)
        ? document.getElementById(event.code).textContent
        : '';

      const position = this.output.selectionStart;
      this.output.value = this.output.value.substring(0, this.output.selectionStart)
        + char
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

  // TODO: Virtual-Keyboard eventHandle
  eventHandle(event) {
    this.output.focus();
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
    if (event === 'tab') { this.handles.tab(); } else {
      this.handles.virtualDefault(event);
    }
  }

  // TODO: HW-keyboard event handle
  hwEventHandle(event) {
    let KEY;
    if (document.getElementById(event.code)) {
      KEY = document.getElementById(event.code);
    } else {
      KEY = document.createElement('div');
      KEY.id = event.code;
    }

    switch (KEY.id) {
      // TODO: on Tab
      case 'Tab':
        KEY.classList.add('active');
        event.preventDefault();
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
          this.handles.tab();
        }
        break;

        // TODO: on CapsLock
      case 'CapsLock':
        KEY.classList.add('active');
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
          KEY.classList.toggle('keyboard__key--active');
          this.handles.capslock();
        }
        break;

        // TODO: on ShiftLeft
      case 'ShiftLeft':
        if (!this.shift) {
          KEY.classList.add('active');
          this.handles.shift();
        } else if (event.type === 'keyup') {
          this.handles.shift();
          KEY.classList.remove('active');
        }
        break;

        // TODO: on ShiftRight
      case 'ShiftRight':
        if (!this.shift) {
          KEY.classList.add('active');
          this.handles.shift();
        } else if (event.type === 'keyup') {
          this.handles.shift();
          KEY.classList.remove('active');
        }
        break;

        // TODO: on AltLeft
      case 'AltLeft':
        KEY.classList.add('active');
        event.preventDefault();
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
        }
        break;

        // TODO: on AltRight
      case 'AltRight':
        KEY.classList.add('active');
        document.getElementById('ControlLeft').classList.remove('active');
        event.preventDefault();
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
        }
        break;

      case 'MetaLeft':
        event.preventDefault();
        KEY.classList.add('active');
        setTimeout(() => { KEY.classList.remove('active'); }, 1000);
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
        }

        break;

      case 'ArrowLeft':
        if (event.type === 'keydown') {
          KEY.classList.add('active');
        }
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
        }
        break;

      case 'ArrowRight':
        if (event.type === 'keydown') {
          KEY.classList.add('active');
        }
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
        }
        break;

      case 'ArrowUp':
        if (event.type === 'keydown') {
          KEY.classList.add('active');
        }
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
        }
        break;

      case 'ArrowDown':
        if (event.type === 'keydown') {
          KEY.classList.add('active');
        }
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
        }
        break;

      case 'Backspace':
        if (event.type === 'keydown') {
          KEY.classList.add('active');
          event.preventDefault();
          this.handles.backspace();
        }
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
        }
        break;

      case 'Enter':
        if (event.type === 'keydown') {
          KEY.classList.add('active');
        }
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
        }
        break;

      case 'Delete':
        if (event.type === 'keydown') {
          KEY.classList.add('active');
        }
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
        }
        break;

      case 'Space':
        if (event.type === 'keydown') {
          KEY.classList.add('active');
        }
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
        }
        break;

      case 'Backslash':
        if (event.type === 'keydown') {
          event.preventDefault();
          KEY.classList.add('active');
          this.handles.hardwareDefault(event);
        }
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
        }
        break;

      case 'ControlLeft':
        if (event.type === 'keydown') {
          KEY.classList.add('active');
        }
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
        }
        break;
      case 'ControlRight':
        if (event.type === 'keydown') {
          KEY.classList.add('active');
        }
        if (event.type === 'keyup') {
          KEY.classList.remove('active');
        }
        break;

      case 'F12':
        break;

        // TODO: on Default
      default:
        if (event.type === 'keydown') {
          KEY.classList.add('active');
          event.preventDefault();
          this.handles.hardwareDefault(event);
        } else if (event.type === 'keyup') {
          KEY.classList.remove('active');
        }
        break;
    }

    // TODO: on Change lang
    if ((event.type === 'keydown' && event.code === 'ControlLeft')
    || (event.type === 'keydown' && event.code === 'AltLeft')) {
      this.pressed.add(event.code);
      if (this.pressed.size === 2) {
        this.handles.changeLang();
      }
    } else {
      this.pressed.clear();
    }
  }
}
