import { boolean, select, text } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Control, Input } from "src/elements";
import {
  INPUT_SIZES,
  INPUT_STATES,
  INPUT_TYPES,
  InputProps,
} from "src/elements/form/input";
import { Section } from "src/layout";
import { Prefer } from "src/types";

import { colorKnob } from "docs/stories/common";
import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";

export type ControlledInputProps = Prefer<
  InputProps,
  React.InputHTMLAttributes<HTMLInputElement>
>;

export interface ControlledInputState {
  value: React.InputHTMLAttributes<HTMLInputElement>["value"];
}

export class ControlledInput extends React.PureComponent<
  ControlledInputProps,
  ControlledInputState
> {
  public readonly state: ControlledInputState = { value: "" };

  constructor(props: ControlledInputProps) {
    super(props);
    this.state = { value: props.value !== undefined ? props.value : "" };
  }

  public render() {
    const { value, ...rest } = this.props;

    return (
      <Control>
        <Input {...rest} value={this.state.value} onChange={this.onChange} />
      </Control>
    );
  }

  private readonly onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.currentTarget.value });
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
    const props = filterUndefined({
      color: colorKnob(),
      disabled: knobs.disabled(),
      placeholder: knobs.placeholder(),
      readOnly: knobs.readOnly(),
      rounded: knobs.rounded(),
      size: knobs.size(),
      state: knobs.state(),
      static: knobs.static(),
      value: knobs.value(),
    });

    return (
      <Control>
        <Input {...props} />
      </Control>
    );
  })
  .add("Controlled", () => {
    const props = filterUndefined({
      color: colorKnob(),
      disabled: knobs.disabled(),
      placeholder: knobs.placeholder(),
      readOnly: knobs.readOnly(),
      rounded: knobs.rounded(),
      size: knobs.size(),
      state: knobs.state(),
      static: knobs.static(),
      type: knobs.type(),
    });

    return <ControlledInput {...props} />;
  });
