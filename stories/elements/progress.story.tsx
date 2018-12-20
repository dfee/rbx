import { number, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Progress } from "@/elements";
import { PROGRESS_SIZES } from "@/elements/progress/progress";
import { Section } from "@/layout";

import { colorKnob } from "../common";
import { iterableToSelectObject } from "../utils";

export const knobs = {
  max: (title: string = "Max") =>
    number(title, 100, { range: true, min: 1, max: 100, step: 1 }),
  size: (title: string = "Size") =>
    select(
      title,
      iterableToSelectObject(PROGRESS_SIZES, { undefined: "" }),
      "",
    ),
  value: (title: string = "Value") =>
    number(title, 15, { range: true, min: 0, max: 100, step: 1 }),
};

storiesOf("Elements/Progress", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const { color, size, ...rest } = {
      color: colorKnob(),
      max: knobs.max(),
      size: knobs.size(),
      value: knobs.value(),
    };
    return (
      <Progress color={color || undefined} size={size || undefined} {...rest} />
    );
  });
