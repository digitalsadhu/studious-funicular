import { h, Component } from "preact";
import htm from "htm";

const html = htm.bind(h);

class SettingsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.initialSettings,
    };
  }

  onSubmit = (e) => {
    this.props.submit(this.state);
    e.preventDefault();
  };

  onInput = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render(_, state) {
    const {
      name,
      width,
      height,
      cellsize,
      backgroundImage,
      resolution,
      backgroundColor,
      gridTransparency,
    } = state;
    return html`
      <form onSubmit=${this.onSubmit}>
        <div>
          <p>Map Name:</p>
          <input
            name="name"
            type="text"
            value=${name}
            onInput=${this.onInput}
          />
        </div>

        <div>
          <p>Width (Number of Cells):</p>
          <input
            name="width"
            type="number"
            value=${width}
            onInput=${this.onInput}
          />
        </div>

        <div>
          <p>Height (Number of Cells):</p>
          <input
            name="height"
            type="number"
            value=${height}
            onInput=${this.onInput}
          />
        </div>

        <div>
          <p>Cell Size (px):</p>
          <input
            name="cellsize"
            type="number"
            value=${cellsize}
            onInput=${this.onInput}
          />
        </div>

        <div>
          <p>backgroundImage URL (relative):</p>
          <input
            name="backgroundImage"
            type="text"
            value=${backgroundImage}
            onInput=${this.onInput}
          />
        </div>

        <div>
          <p>Resolution</p>
          <input
            name="resolution"
            type="number"
            value=${resolution}
            onInput=${this.onInput}
          />
        </div>

        <div>
          <p>Background Color (hexidecimal string eg. 8f8f8f)</p>
          <input
            name="backgroundColor"
            type="text"
            value=${backgroundColor}
            onInput=${this.onInput}
          />
        </div>

        <div>
          <p>Grid Transparency (from 0 - 1)</p>
          <input
            name="gridTransparency"
            type="number"
            step="0.1"
            value=${gridTransparency}
            onInput=${this.onInput}
          />
        </div>

        <button type="submit">Save</button>
      </form>
    `;
  }
}

export default SettingsForm;
