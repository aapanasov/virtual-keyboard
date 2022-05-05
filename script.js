// TODO: Keyboard Class
class Keyboard {
  elements = {
    main: null,
    keysContainer: null,
    key: [],
  };

  eventHandlers = {
    oninput: null,
  };

  value = '';

  capsLock = false;

  shift = false;

  lang = 'en';

  keyLayouts = {
    en: [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'del',
      'caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'shift-r',
      'ctrl', 'win', 'alt', 'space', 'alt', '◄', '▼', '►', 'ctrl',
    ],
    enShift: [
      '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'backspace',
      'tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', 'del',
      'caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'enter',
      'shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '▲', 'shift-r',
      'ctrl', 'win', 'alt', 'space', 'alt', '◄', '▼', '►', 'ctrl',
    ],
  };

  // TODO: init
  init() {
    // Create main elements
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup main elements
    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.append(this.createKeys(this.keyLayouts.en));

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
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Backspace';

          keyElement.addEventListener('click', () => {
            this.value = this.value.substring(0, this.value.length - 1);
            this.triggerEvent('oninput');
          });
          break;

        case 'del':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Del';

          keyElement.addEventListener('click', () => {
            this.value = this.value
              .substring(0, this.value.length - 1);
            this.triggerEvent('oninput');
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

          keyElement.addEventListener('click', () => {

          });
          break;

        case 'alt':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = 'Alt';

          keyElement.addEventListener('click', () => {

          });
          break;

        case 'left':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '◄';

          keyElement.addEventListener('click', () => { });
          break;

        case 'up':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '▲';

          keyElement.addEventListener('click', () => { });
          break;

        case 'right':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '►';

          keyElement.addEventListener('click', () => { });
          break;

        case 'down':
          keyElement.classList.add('keyboard__key', 'keyboard__key--dark');
          keyElement.innerText = '▼';

          keyElement.addEventListener('click', () => { });
          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Enter';

          keyElement.addEventListener('click', () => {
            this.value += '\n';
            this.triggerEvent('oninput');
          });
          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide', 'keyboard__key--dark');
          keyElement.innerText = '';

          keyElement.addEventListener('click', () => {
            this.value += ' ';
            this.triggerEvent('oninput');
          });
          break;
        case 'tab':
          keyElement.classList.add('keyboard__key--wide', 'keyboard__key--dark');
          keyElement.innerText = 'Tab';

          keyElement.addEventListener('click', () => {
            this.value += '\t';
            this.triggerEvent('oninput');
          });
          break;

        default:
          keyElement.textContent = key;
          keyElement.addEventListener('click', () => {
            this.value += this.capsLock
              ? key.toUpperCase()
              : key.toLocaleLowerCase();

            this.triggerEvent('oninput');
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
  triggerEvent(handleName) {
    console.log(`Event Triggered! Event name: ${handleName}`);
    this.eventHandlers.oninput(this.value);
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
            ? this.keyLayouts.enShift[i].toLowerCase()
            : this.keyLayouts.enShift[i].toUpperCase();
        }
      } else if (this.elements.key[i].innerText.length === 1) {
        this.elements.key[i].innerText = this.capsLock
          ? this.keyLayouts.en[i].toUpperCase()
          : this.keyLayouts.en[i].toLowerCase();
      }
    }
  }
}

// TODO: textarea
const textarea = document.createElement('textarea');
textarea.setAttribute('id', textarea);
document.body.append(textarea);

const keyboard = new Keyboard();
window.addEventListener('DOMContentLoaded', () => {
  keyboard.init();
});
