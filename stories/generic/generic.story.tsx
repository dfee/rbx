import { storiesOf } from "@storybook/react";
import React from "react";

import { Generic } from "@/generic";
import { Section } from "@/layout";

import { knobs as modifiersKnobs } from "../modifiers";

storiesOf("Generic", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const backgroundColor = modifiersKnobs.color("Background color");
    const textColor = modifiersKnobs.color("Text color");
    return (
      <Generic<"p">
        as="p"
        textColor={textColor || undefined}
        backgroundColor={backgroundColor || undefined}
      >
        The generic component takes advantage of all the modifiers available
        with Bulma.
      </Generic>
    );
  });
