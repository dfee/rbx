"use strict";

const e = React.createElement;

const HelloWorldNotification = () => {
  const [active, setActive] = React.useState(true);
  if (!active) {
    return e("div", {}, [
      e("span", { key: 0 }, "You've closed the notification "),
      e("span", { key: 1, role: "img", "aria-label": "shoe" }, "👟"),
    ]);
  }
  const children = [
    e("span", { key: 0 }, "Welcome to "),
    e("span", { key: 1, role: "img", "aria-label": "shoe" }, "👟"),
    e("span", { key: 2 }, e("strong", {}, " rbx")),
    e(rbx.Delete, { key: 3, onClick: () => setActive(false) }),
  ];
  return e(rbx.Notification, { color: "primary" }, children);
};

const App = () => e(rbx.Container, {}, e(HelloWorldNotification, {}));

const domContainer = document.querySelector("#root");
ReactDOM.render(React.createElement(App), domContainer);
