// TODO: Keyboard Class
class Keyboard {
  constructor(output, lang = 'en') {
    this.lang = lang;
    this.output = output;
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

  keyLayouts = {
    en: {
      normal: [
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
        'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'del',
        'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
        'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'shift-r',
        'ctrl', 'win', 'alt', 'space', 'alt', '◄', '▼', '►', 'ctrl',
      ],

      shifted: [
        '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
        'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', 'del',
        'caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'enter',
        'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '▲', 'shift-r',
        'ctrl', 'win', 'alt', 'space', 'alt', '◄', '▼', '►', 'ctrl',
      ],
    },
    ru: {
      normal: [
        'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
        'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'del',
        'caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
        'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'shift-r',
        'ctrl', 'win', 'alt', 'space', 'alt', '◄', '▼', '►', 'ctrl',
      ],
      shifted: [
        'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'backspace',
        'tab', 'Й', 'Й', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'del',
        'caps', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'enter',
        'shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '▲', 'shift-r',
        'ctrl', 'win', 'alt', 'space', 'alt', '◄', '▼', '►', 'ctrl',
      ],
    },
  };

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

          keyElement.addEventListener('click', () => {
            this.toggleCapsLock();
            keyElement.classList.toggle('keyboard__key--active', this.capsLock);
          });
          break;

        case 'shift':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Shift';

          keyElement.addEventListener('mousedown', () => this.toggleShift());
          keyElement.addEventListener('mouseup', () => this.toggleShift());
          break;

        case 'shift-r':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Shift';

          keyElement.addEventListener('mousedown', () => this.toggleShift());
          keyElement.addEventListener('mouseup', () => this.toggleShift());
          break;

        case 'ctrl':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Ctrl';

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

          keyElement.addEventListener('click', () => { });
          break;

        // TODO: arrows
        case '◄':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '◄';

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

          keyElement.addEventListener('click', () => {
            const position = this.output.selectionStart;
            this.output.value = this.output.value.substring(0, this.output.selectionStart)
            + (this.capsLock ? key.toUpperCase() : key)
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
  triggerEvent(event) {
    this.output.focus();
    // this.output.value = this.value;
    console.log(event);
  }

  // TODO: toggle Caps
  toggleCapsLock() {
    this.capsLock = !this.capsLock;

    this.elements.key.forEach((key) => {
      if (key.textContent.length === 1) {
        key.textContent = this.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    });
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
}

// TODO: textarea
const textarea = document.createElement('textarea');
textarea.setAttribute('id', 'textarea');
document.body.append(textarea);

const keyboard = new Keyboard(textarea);
window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});
