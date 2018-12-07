import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Checkbox, Control } from "@/elements";
import { Section } from "@/layout";

export interface ControlledCheckboxProps {
  name: string;
  children: React.ReactNode;
  value?: string;
  checked?: boolean;
}

export interface ControlledCheckboxState {
  checked?: boolean;
}

export class ControlledCheckbox extends React.PureComponent<
  ControlledCheckboxProps,
  ControlledCheckboxState
> {
  public readonly state: ControlledCheckboxState;

  constructor(props: ControlledCheckboxProps) {
    super(props);
    this.state = { checked: props.checked };
  }

  public render() {
    const { children, name, value } = this.props;
    return (
      <Control>
        <Checkbox
          checked={this.state.checked}
          name={name}
          onClick={() =>
            this.setState(({ checked }) => ({ checked: !checked }))
          }
          value={value}
        >
          {children}
        </Checkbox>
      </Control>
    );
  }
}

export const knobs = {
  checked: (title: string = "Checked") => boolean(title, false),
  disabled: (title: string = "Disabled") => boolean(title, false),
};

storiesOf("Elements/Form/Checkbox", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const props = {
      checked: knobs.checked(),
      disabled: knobs.disabled(),
    };
    return (
      <Control>
        <Checkbox {...props}>
          {" "}
          I agree to the <a href="#">terms and conditions</a>
        </Checkbox>
      </Control>
    );
  })
  .add("Controlled", () => {
    return (
      <ControlledCheckbox name="agreed">
        {" "}
        I agree to the <a href="#">terms and conditions</a>
      </ControlledCheckbox>
    );
  });
