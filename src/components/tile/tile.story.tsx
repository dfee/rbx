import { storiesOf } from "@storybook/react";
import React from "react";

import Box from "components/box";
import Heading from "components/heading";
import Image from "components/image";
import Section from "components/section";
import Tile from "components/tile";

storiesOf("Tile", module).add("Default", () => (
  <Section>
    <Box>
      <Tile kind={"ancestor" as "ancestor"}>
        <Tile size={8 as 8} vertical>
          <Tile>
            <Tile kind={"parent" as "parent"} vertical>
              <Tile
                renderAs="article"
                kind="child"
                notification
                color="primary"
              >
                <Heading>Vertical...</Heading>
                <Heading subtitle>Top tile</Heading>
              </Tile>
              <Tile
                renderAs="article"
                kind="child"
                notification
                color="warning"
              >
                <Heading>Tiles...</Heading>
                <Heading subtitle>Bottom Tile...</Heading>
              </Tile>
            </Tile>
            <Tile kind={"parent" as "parent"}>
              <Tile renderAs="article" kind="child" notification color="info">
                <Heading>Middle Tile...</Heading>
                <Heading subtitle>With image Tile...</Heading>
                <Image
                  size={"4by3" as "4by3"}
                  src="http://bulma.io/images/placeholders/640x480.png"
                />
              </Tile>
            </Tile>
          </Tile>
          <Tile kind={"parent" as "parent"}>
            <Tile renderAs="article" kind="child" notification color="danger">
              <Heading>Wide tile</Heading>
              <Heading subtitle>Aligned with the right tile</Heading>
              <div className="content" />
            </Tile>
          </Tile>
        </Tile>
        <Tile kind={"parent" as "parent"}>
          <Tile renderAs="article" kind="child" notification color="success">
            <div className="content">
              <Heading>Tall tile</Heading>
              <Heading subtitle>With even more content</Heading>
              <div className="content" />
            </div>
          </Tile>
        </Tile>
      </Tile>
    </Box>
  </Section>
));
