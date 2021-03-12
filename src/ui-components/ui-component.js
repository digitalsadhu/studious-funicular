export default class UIComponent {
  template(htmlString) {
    const temp = document.createElement("template");
    const html = htmlString.trim();
    temp.innerHTML = html;
    return temp.content.firstChild;
  }
}
