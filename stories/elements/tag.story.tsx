import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Control, Delete, Field, Tag } from "@/elements";
import { TAG_SIZES } from "@/elements/tag/tag";
import { Section } from "@/layout";

import { iterableToSelectObject } from "../helpers";
import { colorKnob } from "../modifiers";

export const knobs = {
  delete: (title: string = "Delete") => boolean(title, false),
  rounded: (title: string = "Rounded") => boolean(title, false),
  size: (title: string = "Size") =>
    select(
      title,
      iterableToSelectObject(TAG_SIZES, { undefined: "" }),
      "normal",
    ),
};

storiesOf("Elements/Tag", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const { color, size, ...rest } = {
      color: colorKnob(),
      delete: knobs.delete(),
      rounded: knobs.rounded(),
      size: knobs.size(),
    };
    return (
      <Tag color={color || undefined} size={size || undefined} {...rest}>
        Tag Text
      </Tag>
    );
  })
  .add("Combinations", () => (
    <React.Fragment>
      <Section>
        <Tag color="success">
          Bar
          <Delete size="small" />
        </Tag>
      </Section>
      <Section>
        <Tag color="warning" size="medium">
          Hello
          <Delete size="small" />
        </Tag>
      </Section>
      <Section>
        <Tag color="danger" size="large">
          World
          <Delete />
        </Tag>
      </Section>
    </React.Fragment>
  ))
  .add("Tag Group", () => (
    <Tag.Group>
      {[
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
        "Twenty",
      ].map(name => (
        <Tag key={name}>{name}</Tag>
      ))}
    </Tag.Group>
  ))
  .add("Tag Group (with addons)", () => (
    <React.Fragment>
      <Section>
        <Tag.Group gapless>
          <Tag>Package</Tag>
          <Tag color="primary">Bulma</Tag>
        </Tag.Group>
      </Section>
      <Section>
        <Tag.Group gapless>
          <Tag color="danger">Alex Smith</Tag>
          <Tag as="a" delete />
        </Tag.Group>
      </Section>
    </React.Fragment>
  ))
  .add("Tag Group (gapless, multiline)", () => (
    <React.Fragment>
      <Section>
        <Field multiline kind="group">
          <Control>
            <Tag.Group gapless>
              <Tag color="dark">npm</Tag>
              <Tag color="info">V 5.3</Tag>
            </Tag.Group>
          </Control>
          <Control>
            <Tag.Group gapless>
              <Tag color="dark">Build</Tag>
              <Tag color="success">Pass</Tag>
            </Tag.Group>
          </Control>
          <Control>
            <Tag.Group gapless>
              <Tag color="dark">Chat</Tag>
              <Tag color="primary">Slack</Tag>
            </Tag.Group>
          </Control>
        </Field>
      </Section>
      <Section>
        <Field multiline kind="group">
          {[
            "Technology",
            "CSS",
            "Flexbox",
            "Web Design",
            "Open Source",
            "Community",
            "Documentation",
          ].map(name => (
            <Control key={name}>
              <Tag.Group gapless>
                <Tag color="link">{name}</Tag>
                <Tag delete />
              </Tag.Group>
            </Control>
          ))}
        </Field>
      </Section>
    </React.Fragment>
  ));
