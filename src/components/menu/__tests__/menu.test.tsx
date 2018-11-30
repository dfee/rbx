import React from "react";
import renderer from "react-test-renderer";

import { Menu } from "../menu";

describe("Menu component", () => {
  it("should Exist", () => {
    expect(Menu).toMatchSnapshot();
  });

  it("should have menu classnames", () => {
    const component = renderer.create(
      <Menu>
        <Menu.List title="General">
          <Menu.List.Item>Dashboard</Menu.List.Item>
          <Menu.List.Item>Customer</Menu.List.Item>
        </Menu.List>
      </Menu>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should concat Menu.List to display as submenus", () => {
    const component = renderer.create(
      <Menu>
        <Menu.List title="General">
          <Menu.List.Item>Dashboard</Menu.List.Item>
          <Menu.List.Item>
            <Menu.List.Item active>
              <Menu.List title="Manage Your Team">
                <Menu.List.Item>Members</Menu.List.Item>
                <Menu.List.Item active>Plugins</Menu.List.Item>
                <Menu.List.Item>Add a member</Menu.List.Item>
              </Menu.List>
            </Menu.List.Item>
          </Menu.List.Item>
        </Menu.List>
      </Menu>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("should render custom item child", () => {
    const component = renderer.create(
      <Menu>
        <Menu.List title="General">
          <Menu.List.Item>
            <p>Custom children 1</p>
          </Menu.List.Item>
          <Menu.List.Item>
            <a>Custom children 2</a>
          </Menu.List.Item>
        </Menu.List>
      </Menu>,
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
