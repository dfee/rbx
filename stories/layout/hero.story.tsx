import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Navbar, Tabs } from "../../src/components";
import { Button, Container, Icon, Title } from "../../src/elements";
import { Hero } from "../../src/layout";
import { HERO_SIZES } from "../../src/layout/hero/hero";

import { colorKnob } from "../common";
import { iterableToSelectObject } from "../utils";

export const knobs = {
  gradient: (title: string = "Gradient") => boolean(title, false),
  size: (title: string = "Size") =>
    select(title, iterableToSelectObject(HERO_SIZES, { undefined: "" }), ""),
};

storiesOf("Layout/Hero", module)
  .add("Default", () => {
    const color = colorKnob();
    const gradient = knobs.gradient();
    const size = knobs.size();
    return (
      <Hero
        color={color || undefined}
        gradient={gradient}
        size={size || undefined}
      >
        <Hero.Body>
          <Container>
            <Title>Primary title</Title>
            <Title as="h2" subtitle>
              Primary Subtitle
            </Title>
          </Container>
        </Hero.Body>
      </Hero>
    );
  })
  .add("3 parts", () => (
    <Hero size="medium" color="primary">
      {/* Hero head: will stick at the top */}
      <Hero.Head>
        <Navbar>
          <Container>
            <Navbar.Brand>
              <Navbar.Item>
                <img
                  src="https://bulma.io/images/bulma-type-white.png"
                  alt="Logo"
                />
              </Navbar.Item>
              <Navbar.Burger />
            </Navbar.Brand>
            <Navbar.Menu>
              <Navbar.End>
                <Navbar.Item active>Home</Navbar.Item>
                <Navbar.Item>Examples</Navbar.Item>
                <Navbar.Item>Documentation</Navbar.Item>
                <Navbar.Item as="span">
                  <Button color="primary" inverted>
                    <Icon>
                      <FontAwesomeIcon icon={faGithub} />
                    </Icon>
                    <span>Download</span>
                  </Button>
                </Navbar.Item>
              </Navbar.End>
            </Navbar.Menu>
          </Container>
        </Navbar>
      </Hero.Head>

      {/* Hero content: will be in the middle */}
      <Hero.Body>
        <Container textAlignment="centered">
          <Title>Title</Title>
          <Title as="h2" subtitle>
            Subtitle
          </Title>
        </Container>
      </Hero.Body>

      {/* Hero footer: will stick at the bottom */}
      <Hero.Foot>
        <Container>
          <Tabs as="nav" type="boxed" fullwidth>
            <Tabs.Tab active>Overview</Tabs.Tab>
            <Tabs.Tab>Modifiers</Tabs.Tab>
            <Tabs.Tab>Grid</Tabs.Tab>
            <Tabs.Tab>Elements</Tabs.Tab>
            <Tabs.Tab>Components</Tabs.Tab>
            <Tabs.Tab>Layout</Tabs.Tab>
          </Tabs>
        </Container>
      </Hero.Foot>
    </Hero>
  ));
