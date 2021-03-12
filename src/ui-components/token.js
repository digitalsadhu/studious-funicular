import UIComponent from "./ui-component.js";

const clone = (val) => JSON.parse(JSON.stringify(val));

export default class Token extends UIComponent {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      dragPosition: {
        current: {},
        previous: {},
      },
    };
  }

  drag(e) {
    // keep track of clientX and clientY position during drag
    this.state.dragPosition.previous = clone(this.state.dragPosition.current);
    this.state.dragPosition.current.x = e.clientX;
    this.state.dragPosition.current.y = e.clientY;
  }

  dragend() {
    this.props.copy({
      src: this.props.src,
      // final drag event has zeroed out values so we use previous
      x: this.state.dragPosition.previous.x,
      y: this.state.dragPosition.previous.y,
    });
  }

  doubleClick(e) {
    console.log("double click");
  }

  render() {
    const el = this.template(
      `<li><div draggable="true"><img src="${this.props.src}" /></div></li>`
    );
    el.firstChild.addEventListener("dragend", this.dragend.bind(this));
    el.firstChild.addEventListener("drag", this.drag.bind(this));
    el.firstChild.addEventListener("dblclick", this.doubleClick.bind(this));
    return el;
  }
}
