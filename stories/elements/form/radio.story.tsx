import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Control, Label, Radio } from "@/elements";
import { Section } from "@/layout";

export interface ControlledRadioGroupProps {
  items: Array<{ title: string; value: string }>;
  name: string;
  selected?: string;
}

export interface ControlledRadioGroupState {
  selected?: string;
}

export class ControlledRadioGroup extends React.PureComponent<
  ControlledRadioGroupProps,
  ControlledRadioGroupState
> {
  public readonly state: ControlledRadioGroupState;

  constructor(props: ControlledRadioGroupProps) {
    super(props);
    this.state = { selected: props.selected };
  }

  public render() {
    const { items, name } = this.props;
    return (
      <Control>
        {items.map(item => (
          <Label specifier="radio">
            <Radio
              checked={item.value === this.state.selected}
              name={name}
              onClick={() => this.setState({ selected: item.value })}
              value={item.value}
            />
            {` ${item.title}`}
          </Label>
        ))}
      </Control>
    );
  }
}

export const knobs = {
  checked: (title: string = "Checked") => boolean(title, false),
  disabled: (title: string = "Disabled") => boolean(title, false),
};

storiesOf("Elements/Form/Radio", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const checked = knobs.checked();
    const disabled = knobs.disabled();
    return (
      <Control>
        <Label specifier="radio" disabled={disabled}>
          <Radio name="rsvp" checked={checked} disabled={disabled} /> Going
        </Label>
        <Label specifier="radio">
          <Radio name="rsvp" /> Not going
        </Label>
        <Label specifier="radio">
          <Radio name="rsvp" /> Maybe
        </Label>
      </Control>
    );
  })
  .add("Controlled", () => {
    const items = [
      { title: "Going", value: "going" },
      { title: "Not going", value: "notGoing" },
      { title: "Maybe", value: "maybe" },
    ];
    return <ControlledRadioGroup items={items} name="rsvp" />;
  });
