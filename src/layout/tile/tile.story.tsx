import { storiesOf } from "@storybook/react";
import React from "react";

import { Box, Image, Title } from "@/elements";
import { Section, Tile } from "@/layout";

storiesOf("Layout/Tile", module).add("Default", () => (
  <Section>
    <Box>
      <Tile kind="ancestor">
        <Tile size={8} vertical>
          <Tile>
            <Tile kind="parent" vertical>
              <Tile<"article">
                as="article"
                kind="child"
                notification
                color="primary"
              >
                <Title>Vertical...</Title>
                <Title subtitle>Top tile</Title>
              </Tile>
              <Tile<"article">
                as="article"
                kind="child"
                notification
                color="warning"
              >
                <Title>Tiles...</Title>
                <Title subtitle>Bottom Tile...</Title>
              </Tile>
            </Tile>
            <Tile kind="parent">
              <Tile<"article">
                as="article"
                kind="child"
                notification
                color="info"
              >
                <Title>Middle Tile...</Title>
                <Title subtitle>With image Tile...</Title>
                <Image
                  size="4by3"
                  src="http://bulma.io/images/placeholders/640x480.png"
                />
              </Tile>
            </Tile>
          </Tile>
          <Tile kind="parent">
            <Tile<"article">
              as="article"
              kind="child"
              notification
              color="danger"
            >
              <Title>Wide tile</Title>
              <Title subtitle>Aligned with the right tile</Title>
              <div className="content" />
            </Tile>
          </Tile>
        </Tile>
        <Tile kind="parent">
          <Tile<"article">
            as="article"
            kind="child"
            notification
            color="success"
          >
            <div className="content">
              <Title>Tall tile</Title>
              <Title subtitle>With even more content</Title>
              <div className="content" />
            </div>
          </Tile>
        </Tile>
      </Tile>
    </Box>
  </Section>
));
