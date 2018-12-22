import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Navbar } from "../../../src/components";
import { NAVBAR_FIXED_ALIGNMENTS } from "../../../src/components/navbar/navbar";
import { Button } from "../../../src/elements";
import { Section } from "../../../src/layout";

import { colorKnob } from "../common";
import { iterableToSelectObject } from "../utils";

export const knobs = {
  active: (title: string = "Active (mobile display)") =>
    select(
      title,
      {
        "false (when managed)": "false",
        "true (when managed)": "true",
        "undefined (unmanaged)": "",
      },
      "",
    ),
  dropdown: {
    boxed: (title: string = "Boxed") => boolean(title, false),
    right: (title: string = "Right") => boolean(title, false),
  },
  fixed: (title: string = "Fixed") =>
    select(
      title,
      iterableToSelectObject(NAVBAR_FIXED_ALIGNMENTS, { undefined: "" }),
      "",
    ),
  item: {
    active: (title: string = "Active") => boolean(title, false),
    dropdownUp: (title: string = "Dropdown up") => boolean(title, false),
    hoverable: (title: string = "Hoverable") => boolean(title, false),
  },
  link: {
    arrowless: (title: string = "Arrowless") => boolean(title, false),
  },
  managed: (title: string = "Managed") => boolean(title, false),
  menu: {
    active: (title: string = "Active") => boolean(title, false),
  },
  transparent: (title: string = "Transparent") => boolean(title, true),
};

storiesOf("Components/Navbar", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const { active, color, fixed, ...rest } = {
      active: knobs.active("Navbar: active (mobile)") as string,
      color: colorKnob("Navbar: color"),
      fixed: knobs.fixed("Navbar: fixed"),
      managed: knobs.managed(),
      transparent: knobs.transparent("Navbar: transparent"),
    };

    const itemProps = {
      active: knobs.item.active("Navbar > Menu > Item: active"),
      dropdownUp: knobs.item.dropdownUp("Navbar > Menu > Item: dropdownUp"),
      hoverable: knobs.item.hoverable("Navbar > Menu > Item: hoverable"),
    };
    const linkProps = {
      arrowless: knobs.link.arrowless("Navbar > Menu > Item > Link: arrowless"),
    };

    const dropdownProps = {
      boxed: knobs.dropdown.boxed("Navbar > Menu > Item > Dropdown: boxed"),
      right: knobs.dropdown.right("Navbar > Menu > Item > Dropdown: right"),
    };

    const menuProps = {};

    return (
      <Navbar
        active={active === "" ? undefined : active === "true" ? true : false}
        color={color || undefined}
        fixed={fixed || undefined}
        {...rest}
      >
        <Navbar.Brand>
          <Navbar.Item href="#">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>

        <Navbar.Menu {...menuProps}>
          <Navbar.Start>
            <Navbar.Item>Home</Navbar.Item>
            <Navbar.Item>Documentation</Navbar.Item>

            <Navbar.Item dropdown {...itemProps}>
              <Navbar.Link {...linkProps}>More</Navbar.Link>
              <Navbar.Dropdown {...dropdownProps}>
                <Navbar.Item>About</Navbar.Item>
                <Navbar.Item>Jobs</Navbar.Item>
                <Navbar.Item>Contact</Navbar.Item>
                <Navbar.Divider />
                <Navbar.Item>Report an issue</Navbar.Item>
              </Navbar.Dropdown>
            </Navbar.Item>
          </Navbar.Start>

          <Navbar.End>
            <Navbar.Item>
              <Button.Group>
                <Button color="primary">
                  <strong>Sign up</strong>
                </Button>
                <Button color="light">Log in</Button>
              </Button.Group>
            </Navbar.Item>
          </Navbar.End>
        </Navbar.Menu>
      </Navbar>
    );
  });
