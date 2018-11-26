import { storiesOf } from "@storybook/react";
import React from "react";

import { Control, Field } from "components/form";
import Tag from "components/tag";

storiesOf("Tag", module)
  .addDecorator(story => <div style={{ margin: 10 }}>{story()}</div>)
  .add("Default", () => <Tag>Tag Text</Tag>)
  .add("Group Tags", () => (
    <Tag.Group>
      <Tag color={"primary" as "primary"}>Tag Text</Tag>
      <Tag color={"success" as "success"}>Tag Text</Tag>
      <Tag color={"danger" as "danger"}>Tag Text</Tag>
      <Tag color={"warrning" as "warning"}>Tag Text</Tag>
      <Tag color={"info" as "info"}>Tag Text</Tag>
    </Tag.Group>
  ))
  .add("Group Tags without gap", () => (
    <div>
      <Tag.Group gapless>
        <Tag>Tag Text</Tag>
        <Tag color={"primary" as "primary"}>Tag Text</Tag>
      </Tag.Group>
      <Tag.Group gapless>
        <Tag color={"danger" as "danger"}>Delete</Tag>
        <Tag remove renderAs="a" />
      </Tag.Group>
    </div>
  ))
  .add("Group Tags without gap multiline", () => (
    <div>
      <Field multiline kind={"group" as "group"}>
        <Control>
          <Tag.Group gapless>
            <Tag color={"dark" as "dark"}>npm</Tag>
            <Tag color={"info" as "info"}>V 5.3</Tag>
          </Tag.Group>
        </Control>
        <Control>
          <Tag.Group gapless>
            <Tag color={"dark" as "dark"}>Build</Tag>
            <Tag color={"success" as "success"}>Pass</Tag>
          </Tag.Group>
        </Control>
        <Control>
          <Tag.Group gapless>
            <Tag color={"dark" as "dark"}>Chat</Tag>
            <Tag color={"primary" as "primary"}>Slack</Tag>
          </Tag.Group>
        </Control>
      </Field>
    </div>
  ))
  .add("Others", () => (
    <Tag.Group>
      <Tag rounded>Rounded</Tag>
      <Tag remove />
    </Tag.Group>
  ));
