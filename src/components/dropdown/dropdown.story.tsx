import React from "react";

import { storiesOf } from "@storybook/react";

import { Colors } from "modifiers/colors";
import { Dropdown } from ".";

interface DropdownControllerProps {
  hoverable?: boolean;
  color?: Colors;
}

interface DropdownControllerState {
  selected: string;
}

class DropdownController extends React.Component<
  DropdownControllerProps,
  DropdownControllerState
> {
  public readonly state: DropdownControllerState = {
    selected: "active",
  };

  public onChange = (selected: string) => {
    this.setState({ selected });
  }

  public render() {
    return (
      <Dropdown
        value={this.state.selected}
        onChange={this.onChange}
        color="info"
        {...this.props}
      >
        <Dropdown.Item value="item">Dropdown item</Dropdown.Item>
        <Dropdown.Item value="other">Other Dropdown item</Dropdown.Item>
        <Dropdown.Item value="active">Active Dropdown item</Dropdown.Item>
        <Dropdown.Item value="other 2">Other Dropdown item</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item value="divider">With divider</Dropdown.Item>
      </Dropdown>
    );
  }
}

storiesOf("Dropdown", module)
  .add("Default", () => (
    <Dropdown>
      <Dropdown.Item value="item">Dropdown item</Dropdown.Item>
      <Dropdown.Item value="other">Other Dropdown item</Dropdown.Item>
      <Dropdown.Item value="active">Active Dropdown item</Dropdown.Item>
      <Dropdown.Item value="other 2">Other Dropdown item</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item value="divider">With divider</Dropdown.Item>
    </Dropdown>
  ))
  .add("Hoverable", () => (
    <Dropdown hoverable>
      <Dropdown.Item value="item">Dropdown item</Dropdown.Item>
      <Dropdown.Item value="other">Other Dropdown item</Dropdown.Item>
      <Dropdown.Item value="active">Active Dropdown item</Dropdown.Item>
      <Dropdown.Item value="other 2">Other Dropdown item</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item value="divider">With divider</Dropdown.Item>
    </Dropdown>
  ))
  .add("Controlled component", () => <DropdownController />)
  .add("Controlled component Hoverable", () => (
    <DropdownController hoverable color="dark" />
  ));
