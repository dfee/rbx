import { storiesOf } from "@storybook/react";
import React from "react";

import { Menu } from "src/components";
import { Column } from "src/grid";
import { Section } from "src/layout";

storiesOf("Components/Menu", module)
  .addDecorator(story => (
    <Section>
      <Column.Group>
        <Column desktop={{ size: "one-quarter" }} size="half">
          {story()}
        </Column>
      </Column.Group>
    </Section>
  ))
  .add("Default", () => (
    <Menu>
      <Menu.Label>General</Menu.Label>
      <Menu.List>
        <Menu.List.Item>Dashboard</Menu.List.Item>
        <Menu.List.Item>Customer</Menu.List.Item>
      </Menu.List>

      <Menu.Label>Administration</Menu.Label>
      <Menu.List>
        <Menu.List.Item>Team Settings</Menu.List.Item>
        <Menu.List.Item
          active
          menu={
            <Menu.List>
              <Menu.List.Item>Members</Menu.List.Item>
              <Menu.List.Item active>Plugins</Menu.List.Item>
              <Menu.List.Item>Add a member</Menu.List.Item>
            </Menu.List>
          }
        >
          Manage Your Teeam
        </Menu.List.Item>
        <Menu.List.Item>Invitations</Menu.List.Item>
        <Menu.List.Item>Cloud Storage Environment Settings</Menu.List.Item>
        <Menu.List.Item>Authentication</Menu.List.Item>
      </Menu.List>

      <Menu.Label>Transactions</Menu.Label>
      <Menu.List>
        <Menu.List.Item>Payments</Menu.List.Item>
        <Menu.List.Item>Transfers</Menu.List.Item>
        <Menu.List.Item>Balance</Menu.List.Item>
      </Menu.List>
    </Menu>
  ));
