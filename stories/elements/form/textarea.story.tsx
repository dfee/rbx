import { boolean, number, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Control, Textarea } from "../../../src/elements/form";
import {
  TEXTAREA_SIZES,
  TEXTAREA_STATES,
} from "../../../src/elements/form/textarea";
import { Section } from "../../../src/layout";

import { colorKnob } from "../../common";
import { iterableToSelectObject } from "../../utils";

export const knobs = {
  disabled: (title: string = "Disabled") => boolean(title, false),
  fixedSize: (title: string = "Fixed size") => boolean(title, false),
  readOnly: (title: string = "Read only") => boolean(title, false),
  rows: (title: string = "Rows") =>
    number(title, 3, {
      max: 10,
      min: 3,
      range: true,
      step: 1,
    }),
  size: (title: string = "Size") =>
    select(
      title,
      iterableToSelectObject(TEXTAREA_SIZES, { undefined: "" }),
      "",
    ),
  state: (title: string = "State") =>
    select(
      title,
      iterableToSelectObject(TEXTAREA_STATES, { undefined: "" }),
      "",
    ),
};

storiesOf("Elements/Form/Textarea", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const { color, size, state, ...rest } = {
      color: colorKnob(),
      disabled: knobs.disabled(),
      fixedSize: knobs.fixedSize(),
      readOnly: knobs.readOnly(),
      rows: knobs.rows(),
      size: knobs.size(),
      state: knobs.state(),
    };
    return (
      <Control>
        <Textarea
          color={color || undefined}
          state={state || undefined}
          size={size || undefined}
          {...rest}
        />
      </Control>
    );
  });
