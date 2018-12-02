import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Box, Content, Image } from "@/elements";
import { Media } from "@/layout";

storiesOf("Elements/Box", module).add("Default", () => (
  <Box
    paddingless={boolean("paddingless", false)}
    responsive={{
      desktop: {
        display: {
          only: true,
          value: "inline-flex",
        },
      },
      mobile: {
        display: { value: "block" },
      },
      tablet: {
        display: { value: "flex" },
      },
      widescreen: {
        display: { value: "inline-block" },
      },
    }}
  >
    <Media>
      <Media.Item<"figure"> as="figure" position="left">
        <Image
          size={64}
          alt="64x64"
          src="http://bulma.io/images/placeholders/128x128.png"
        />
      </Media.Item>
      <Media.Item>
        <Content>
          <p>
            <strong>Devin Fee</strong> <small>@dfee</small> <small>31m</small>
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
