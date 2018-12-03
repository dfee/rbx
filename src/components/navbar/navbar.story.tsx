import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Navbar } from "@/components";
import { NavbarProps } from "@/components/navbar/navbar";
import { Button } from "@/elements";
import { COLORS, Colors } from "@/modifiers/color";

const makeColorSelect = () =>
  select(
    "Navbar Color",
    {
      None: "",
      ...Object.assign(
        {},
        ...COLORS.map((color: string) => ({ [color]: color })),
      ),
    },
    "white",
  );

const makeFixedSelect = () =>
  select(
    "Navbar Fixed",
    {
      None: "",
      bottom: "bottom",
      top: "top",
    },
    "",
  );

storiesOf("Components/Navbar", module).add("Basic Navbar", () => {
  return (
    <Navbar
      color={makeColorSelect() as Colors}
      fixed={makeFixedSelect() as NavbarProps["fixed"]}
      active={boolean("Navbar Active", false)}
      transparent={boolean("Navbar Transparent", false)}
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

      <Navbar.Menu>
        <Navbar.Container position="start">
          <Navbar.Item href="#">Home</Navbar.Item>
          <Navbar.Item href="#">Documentation</Navbar.Item>

          <Navbar.Item dropdown hoverable>
            <Navbar.Link
              arrowless={boolean("Navbar > More (arrowless)", false)}
            >
              More
            </Navbar.Link>
            <Navbar.Dropdown>
              <Navbar.Item href="#">About</Navbar.Item>
              <Navbar.Item href="#">Jobs</Navbar.Item>
              <Navbar.Item href="#">Contact</Navbar.Item>
              <Navbar.Divider />
              <Navbar.Item href="#">Report an issue</Navbar.Item>
            </Navbar.Dropdown>
          </Navbar.Item>
        </Navbar.Container>

        <Navbar.Container position="end">
          <Navbar.Item>
            <Button.Group>
              <Button color="primary">
                <strong>Sign up</strong>
              </Button>
              <Button color="light">Log in</Button>
            </Button.Group>
          </Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
});
