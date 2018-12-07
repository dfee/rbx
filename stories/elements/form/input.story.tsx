import { boolean, select, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Control, Input } from "@/elements";
import {
  INPUT_SIZES,
  INPUT_STATES,
  INPUT_TYPES,
  InputProps,
} from "@/elements/form/input";
import { Section } from "@/layout";

import { iterableToSelectObject } from "../../helpers";
import { knobs as modifiersKnobs } from "../../modifiers";

export interface ControlledInputState {
  value: string;
}
export class ControlledInput extends React.PureComponent<
  InputProps,
  ControlledInputState
> {
  public readonly state: ControlledInputState = { value: "" };

  constructor(props: InputProps) {
    super(props);
    this.state = { value: props.value || "" };
  }

  public render() {
    const { value, ...rest } = this.props;
    return (
      <Control>
        <Input
          {...rest}
          value={this.state.value}
          onChange={event =>
            this.setState({ value: event.currentTarget.value })
          }
        />
      </Control>
    );
  }
}

export const knobs = {
  disabled: (title: string = "Disabled") => boolean(title, false),
  placeholder: (title: string = "Placeholder") => text(title, "Placeholder"),
  readOnly: (title: string = "Read only") => boolean(title, false),
  rounded: (title: string = "Rounded") => boolean(title, false),
  size: (title: string = "Size") =>
    select(title, iterableToSelectObject(INPUT_SIZES, { undefined: "" }), ""),
  state: (title: string = "State") =>
    select(title, iterableToSelectObject(INPUT_STATES, { undefined: "" }), ""),
  static: (title: string = "Static") => boolean(title, false),
  type: (title: string = "Type") =>
    select(title, iterableToSelectObject(INPUT_TYPES, { undefined: "" }), ""),
  value: (title: string = "Value") => text(title, ""),
};

storiesOf("Elements/Form/Input", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const { color, size, state, ...rest } = {
      color: modifiersKnobs.color(),
      disabled: knobs.disabled(),
      placeholder: knobs.placeholder(),
      readOnly: knobs.readOnly(),
      rounded: knobs.rounded(),
      size: knobs.size(),
      state: knobs.state(),
      static: knobs.static(),
      value: knobs.value(),
    };
    return (
      <Control>
        <Input
          color={color || undefined}
          state={state || undefined}
          size={size || undefined}
          {...rest}
        />
      </Control>
    );
  })
  .add("Controlled", () => {
    const { color, size, state, type, ...rest } = {
      color: modifiersKnobs.color(),
      disabled: knobs.disabled(),
      placeholder: knobs.placeholder(),
      readOnly: knobs.readOnly(),
      rounded: knobs.rounded(),
      size: knobs.size(),
      state: knobs.state(),
      static: knobs.static(),
      type: knobs.type(),
    };
    return (
      <ControlledInput
        color={color || undefined}
        size={size || undefined}
        state={state || undefined}
        type={type || undefined}
        {...rest}
      />
    );
  });
