import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Box } from "components/box";
import { Content } from "components/content";
import { Image } from "components/image";
import { Media } from "components/media";

storiesOf("Box", module).add("Default", () => (
  <Box
    paddingless={boolean("paddingless", false)}
    responsive={{
      desktop: {
        display: "inline-flex",
        only: true,
      },
      mobile: {
        display: "block",
      },
      tablet: {
        display: "flex",
      },
      widescreen: {
        display: "inline-block",
      },
    }}
    hide={{
      tablet: {
        hide: true,
        only: true,
      },
      widescreen: {
        hide: true,
      },
    }}
  >
    <Media>
      <Media.Item renderAs="figure" position="left">
        <Image
          size={64 as 64}
          alt="64x64"
          src="http://bulma.io/images/placeholders/128x128.png"
        />
      </Media.Item>
      <Media.Item>
        <Content>
          <p>
            <strong>John Smith</strong> <small>@johnsmith</small>{" "}
            <small>31m</small>
            <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas
            non massa sem. Etiam finibus odio quis feugiat facilisis.
          </p>
        </Content>
      </Media.Item>
    </Media>
  </Box>
));
