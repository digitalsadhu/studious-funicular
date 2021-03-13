import { h, Component } from "preact";
import htm from "htm";

const html = htm.bind(h);

class BackgroundsForm extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
  }

  onSelect = (background) => {
    this.setState({ selected: background });
  };

  render(props, state) {
    return html`<div id="background-selector">
      <div id="background-thumbnails">
        ${props.backgrounds.map(
          (background) =>
            html`<div
              class="background-thumbnail"
              onClick="${() => this.onSelect(background)}"
            >
              <img src="${background}" />
            </div>`
        )}
      </div>
      <button
        id="select-button"
        onClick="${() => props.select(state.selected)}"
      >
        select
      </button>
    </div>`;
  }
}

export default BackgroundsForm;
