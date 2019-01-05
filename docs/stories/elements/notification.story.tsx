import { storiesOf } from "@storybook/react";
import React from "react";

import { Delete, Notification } from "src/elements";
import { Section } from "src/layout";

import { colorKnob } from "docs/stories/common";
import { filterUndefined } from "docs/stories/utils";

storiesOf("Elements/Notification", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const props = filterUndefined({
      color: colorKnob(),
    });

    return (
      <Notification {...props}>
        <Delete as="button" />
        Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem
        ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis
        placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet
        fringilla. Nullam gravida purus diam, et dictum{" "}
        <a href="#felis">felis venenatis</a> efficitur. Sit amet, consectetur
        adipiscing elit
      </Notification>
    );
  });
