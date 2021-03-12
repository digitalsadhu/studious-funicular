import { h, Component } from "preact";
import htm from "htm";

const html = htm.bind(h);

class SettingsForm extends Component {
  state = { value: "" };

  onSubmit = (e) => {
    alert("Submitted a todo");
    e.preventDefault();
  };

  onInput = (e) => {
    const { value } = e.target;
    this.setState({ value });
  };

  render(_, { value }) {
    return html`
      <form onSubmit=${this.onSubmit}>
        <input type="text" value=${value} onInput=${this.onInput} />
        <p>You typed this value: ${value}</p>
        <button type="submit">Submit</button>
      </form>
    `;
  }
}

export default SettingsForm;
