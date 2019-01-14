import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Navbar } from "src/components";
import { NAVBAR_DEFAULTS } from "src/components/navbar/navbar-container";
import { NAVBAR_DROPDOWN_DEFAULTS } from "src/components/navbar/navbar-dropdown";
import { Button } from "src/elements";
import { Section } from "src/layout";

import { colorKnob } from "docs/stories/common";
import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";

export const knobs = {
  active: (title: string = "Active") => boolean(title, false),
  dropdown: {
    align: (title: string = "align") =>
      select(
        title,
        iterableToSelectObject(NAVBAR_DROPDOWN_DEFAULTS.alignments, {
          undefined: "",
        }),
        "",
      ),
    boxed: (title: string = "Boxed") => boolean(title, false),
  },
  fixed: (title: string = "Fixed") =>
    select(
      title,
      iterableToSelectObject(NAVBAR_DEFAULTS.fixedAlignments, {
        undefined: "",
      }),
      "",
    ),
  item: {
    active: (title: string = "Active") => boolean(title, false),
    hoverable: (title: string = "Hoverable") => boolean(title, false),
    managed: (title: string = "Managed") => boolean(title, false),
    up: (title: string = "Dropup") => boolean(title, false),
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
    const navbarProps = filterUndefined({
      active: knobs.active("Navbar: active (mobile, when managed)"),
      color: colorKnob("Navbar: color"),
      fixed: knobs.fixed("Navbar: fixed"),
      managed: knobs.managed(),
      transparent: knobs.transparent("Navbar: transparent"),
    });

    const itemProps = {
      active: knobs.item.active("Navbar > Menu > Item: active (when active)"),
      hoverable: knobs.item.hoverable("Navbar > Menu > Item: hoverable"),
      managed: knobs.item.active("Navbar > Menu > Item: managed"),
      up: knobs.item.up("Navbar > Menu > Item: dropup"),
    };
    const linkProps = {
      arrowless: knobs.link.arrowless("Navbar > Menu > Item > Link: arrowless"),
    };

    const dropdownProps = filterUndefined({
      align: knobs.dropdown.align("Navbar > Menu > Item > Dropdown: align"),
      boxed: knobs.dropdown.boxed("Navbar > Menu > Item > Dropdown: boxed"),
    });

    return (
      <Navbar {...navbarProps}>
        <Navbar.Brand>
          <Navbar.Item href="#">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              alt=""
              role="presentation"
              width="112"
              height="28"
            />
          </Navbar.Item>
          <Navbar.Burger />
        </Navbar.Brand>

        <Navbar.Menu>
          <Navbar.Segment align="start">
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
          </Navbar.Segment>

          <Navbar.Segment align="end">
            <Navbar.Item>
              <Button.Group>
                <Button color="primary">
                  <strong>Sign up</strong>
                </Button>
                <Button color="light">Log in</Button>
              </Button.Group>
            </Navbar.Item>
          </Navbar.Segment>
        </Navbar.Menu>
      </Navbar>
    );
  });
