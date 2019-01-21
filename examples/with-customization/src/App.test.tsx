import Enzyme from "enzyme";
import React from "react";
import ReactDOM from "react-dom";
import { Container, Delete, Notification } from "rbx";
import { ThemeContext } from "rbx/base/theme";

import App, { HelloWorldNotification } from "./App";

describe("app", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders a HelloWorldNotification", () => {
    const node = <App />;
    const wrapper = Enzyme.shallow(node);
    expect(wrapper.is(ThemeContext.Provider)).toBe(true);
    expect(wrapper.children().is(Container)).toBe(true);
    expect(
      wrapper
        .children()
        .children()
        .is(HelloWorldNotification),
    ).toBe(true);
  });
});

describe("HelloWorldNotification", () => {
  it("renders a Notification by default", () => {
    const node = <HelloWorldNotification />;
    const wrapper = Enzyme.shallow(node);
    expect(wrapper.is(Notification)).toBe(true);
  });

  it('is renders nothing on "Delete" click', () => {
    const node = <HelloWorldNotification />;
    const wrapper = Enzyme.shallow(node);
    wrapper.find(Delete).simulate("click");
    expect(wrapper.isEmptyRender()).toBe(true);
  });
});
