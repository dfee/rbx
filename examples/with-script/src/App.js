"use strict";

const e = React.createElement;

class HelloWorldNotification extends React.Component {
  constructor(props) {
    super(props);
    this.state = { active: true };
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.setState({ active: false });
  }

  render() {
    if (!this.state.active) {
      return e("div", {}, [
        e("span", {}, "You've closed the notification "),
        e("span", { role: "img", "aria-label": "shoe" }, "👟"),
      ]);
    }
    const children = [
      e("span", { key: 0 }, "Welcome to "),
      e("span", { key: 1, role: "img", "aria-label": "shoe" }, "👟"),
      e("span", { key: 2 }, e("strong", {}, " rbx")),
      e(rbx.Delete, { key: 3, onClick: this.onClose }),
    ];
    return e(rbx.Notification, { color: "primary" }, children);
  }
}

const App = () => e(rbx.Container, {}, e(HelloWorldNotification, {}));

const domContainer = document.querySelector("#root");
ReactDOM.render(React.createElement(App), domContainer);
