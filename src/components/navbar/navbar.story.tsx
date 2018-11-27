import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Navbar } from "components/navbar";
import { COLORS } from "modifiers/colors";

const makeColorSelect = () =>
  select(
    "Colors",
    {
      Default: "",
      ...Object.assign(
        {},
        ...COLORS.map((color: string) => ({ [color]: color })),
      ),
    },
    "Default",
  );

// https://github.com/storybooks/storybook/issues/4865
const fixedSelectOptions = ({
  Default: null,
  bottom: "bottom",
  top: "top",
} as unknown) as { [k: string]: string };

const makeFixedSelect = () => select("Fixed", fixedSelectOptions, "Default");

storiesOf("Navbar", module).add("Default", () => {
  return (
    <Navbar
      color={makeColorSelect()}
      fixed={makeFixedSelect()}
      active={boolean("Active", false)}
      transparent={boolean("Transparent", false)}
    >
      <Navbar.Brand>
        <Navbar.Item renderAs="a" href="#">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            alt="Bulma: a modern CSS framework based on Flexbox"
            width="112"
            height="28"
          />
        </Navbar.Item>
        <Navbar.Burger
        // TODO:
        // active={open}
        // onClick={() =>
        //   this.setState(state => {
        //     open: !state.open;
        //   })
        // }
        />
      </Navbar.Brand>
      {/* <Navbar.Menu active={open}> */}
      <Navbar.Menu>
        <Navbar.Container>
          <Navbar.Item href="#">Second</Navbar.Item>
        </Navbar.Container>
        <Navbar.Container position={"end" as "end"}>
          <Navbar.Item href="#">At the end</Navbar.Item>
        </Navbar.Container>
      </Navbar.Menu>
    </Navbar>
  );
});
