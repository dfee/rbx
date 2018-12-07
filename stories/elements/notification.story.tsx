import { storiesOf } from "@storybook/react";
import React from "react";

import { Delete, Notification } from "@/elements";
import { Section } from "@/layout";

import { knobs as modifiersKnobs } from "../modifiers";

storiesOf("Elements/Notification", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const color = modifiersKnobs.color();
    return (
      <Notification color={color || undefined}>
        <Delete as="button" />
        Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem
        ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis
        placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet
        fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a>{" "}
        efficitur. Sit amet, consectetur adipiscing elit
      </Notification>
    );
  });
