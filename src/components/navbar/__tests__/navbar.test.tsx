import React from "react";
import { renderToString } from "react-dom/server";
import renderer, { ReactTestRenderer } from "react-test-renderer";

import { setupWindow, teardownWindow } from "@/__tests__/helpers";
import { getHtmlClasses, Navbar } from "../navbar";

describe("Navbar component", () => {
  let component: ReactTestRenderer;

  beforeEach(() => {
    setupWindow();
  });

  afterEach(() => {
    if (component && component.unmount) {
      component.unmount();
    }
    teardownWindow();
  });

  it("should Exist", () => {
    expect(Navbar).toMatchSnapshot();
  });

  it("should render on server side", () => {
    const html = renderToString(<Navbar fixed="top" />);
    expect(html).toMatchSnapshot();
    expect(getHtmlClasses()).toMatchSnapshot("top");
  });

  it("should have Navbar classname", () => {
    component = renderer.create(
      <Navbar>
        <Navbar.Brand>
          <Navbar.Item<"a"> as="a" href="#">
            <img src="/" alt="" />
          </Navbar.Item>
          <Navbar.Burger className="trigger-menu" />
        </Navbar.Brand>
        <div>TEST</div>
        <Navbar.Menu>
          <Navbar.Container>
            <Navbar.Item dropdown hoverable>
              <Navbar.Link>Docs</Navbar.Link>
              <Navbar.Dropdown boxed>
                <Navbar.Item href="#">Home</Navbar.Item>
                <Navbar.Divider />
                <Navbar.Item href="#">Home</Navbar.Item>
              </Navbar.Dropdown>
            </Navbar.Item>
          </Navbar.Container>
        </Navbar.Menu>
      </Navbar>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat Bulma class with classes in props", () => {
    component = renderer.create(<Navbar className="other-class test" />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render as an html section", () => {
    component = renderer.create(<Navbar<"section"> as="section" />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should have custom inline styles", () => {
    component = renderer.create(<Navbar style={{ width: 200, zIndex: 1 }} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should be fixed on top", () => {
    component = renderer.create(<Navbar fixed="top" />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
