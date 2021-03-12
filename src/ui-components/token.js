import { Component, h } from "preact";
import htm from "htm";

const html = htm.bind(h);
const clone = (val) => JSON.parse(JSON.stringify(val));

export default class Token extends Component {
  constructor() {
    super();
    this.state = {
      dragPosition: {
        current: {},
        previous: {},
      },
    };
  }

  drag(e) {
    // keep track of clientX and clientY position during drag
    this.setState({
      dragPosition: {
        previous: clone(this.state.dragPosition.current),
        current: {
          x: e.clientX,
          y: e.clientY,
        },
      },
    });
  }

  doubleClick(e) {
    console.log("double click");
  }

  render(props, state) {
    const { x, y } = state.dragPosition.previous;
    const { src, copy } = props;

    return html`<li>
      <div
        draggable="true"
        onDragend="${() => copy({ src, x, y })}"
        onDrag="${this.drag.bind(this)}"
        onDblclick="${this.doubleClick.bind(this)}"
      >
        <img src="${src}" />
      </div>
    </li>`;
  }
}
