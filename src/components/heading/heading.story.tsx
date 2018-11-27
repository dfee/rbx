import React from "react";

import { storiesOf } from "@storybook/react";

import { Box } from "components/box";
import { Heading } from "components/heading";

storiesOf("Heading", module).add("Default", () => (
  <div>
    <Box>
      <Heading>Title</Heading>
      <Heading subtitle size={6 as 6}>
        Subtitle
      </Heading>
    </Box>
    <Box>
      <Heading size={1 as 1}>Title</Heading>
      <Heading subtitle size={3 as 3}>
        Subtitle
      </Heading>
    </Box>
    <Box>
      <Heading size={2 as 2}>Title</Heading>
      <Heading subtitle size={4} renderAs="h2">
        Subtitle
      </Heading>
    </Box>
    <Box>
      <Heading size={3 as 3}>Title</Heading>
      <Heading subtitle size={5} renderAs="h2">
        Subtitle
      </Heading>
    </Box>
    <Box>
      <Heading size={4 as 4}>Title</Heading>
      <Heading subtitle size={6} renderAs="h2">
        Subtitle
      </Heading>
    </Box>
  </div>
));
