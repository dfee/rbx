import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Control, Label, Radio } from "src/elements";
import { Section } from "src/layout";

export interface ControlledRadioGroupProps {
  items: { title: string; value: string }[];
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
        {items.map((item, i) => {
          const checked = item.value === this.state.selected;

          return (
            <Label key={i}>
              <Radio
                checked={checked}
                name={name}
                onClick={this.handleOnClick(item.value)}
                value={item.value}
              />
              {` ${item.title}`}
            </Label>
          );
        })}
      </Control>
    );
  }

  private readonly handleOnClick = (value: string) => () => {
    this.setState({ selected: value });
  }
}

export const knobs = {
  checked: (title: string = "Checked") => boolean(title, false),
  disabled: (title: string = "Disabled") => boolean(title, false),
};

storiesOf("Elements/Form/Radio", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const props = {
      disabled: knobs.disabled(),
    };

    return (
      <Control>
        <Label disabled={props.disabled}>
          <Radio name="rsvp" {...props} /> Going
        </Label>
        <Label>
          <Radio name="rsvp" {...props} /> Not going
        </Label>
        <Label>
          <Radio name="rsvp" {...props} /> Maybe
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
