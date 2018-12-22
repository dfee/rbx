import { select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Message } from "../../../src/components";
import {
  Block,
  Delete,
  Heading,
  Highlight,
  Loader,
  Notification,
  Numeric,
  Tag,
} from "../../../src/elements";
import { DELETE_SIZES } from "../../../src/elements/other/delete";
import { Section } from "../../../src/layout";

import { iterableToSelectObject } from "../utils";

export const knobs = {
  deleteSize: (title: string = "Size") =>
    select(title, iterableToSelectObject(DELETE_SIZES, { undefined: "" }), ""),
};

storiesOf("Elements/Other", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Block", () => <Block>block</Block>)
  .add("Delete", () => {
    const size = knobs.deleteSize();
    return (
      <div>
        <Delete size={size || undefined} />
      </div>
    );
  })
  .add("Delete (combinations)", () => (
    <React.Fragment>
      <Block>
        <Tag color="success">
          Hello World
          <Delete size="small" />
        </Tag>
      </Block>

      <Notification color="danger">
        <Delete />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum
        dolor sit amet, consectetur adipiscing elit
      </Notification>

      <Message color="info">
        <Message.Header>
          Info
          <Delete />
        </Message.Header>
        <Message.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          risus mi, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus
          ac ex sit amet fringilla. Nullam gravida purus diam, et dictum felis
          venenatis efficitur. Aenean ac eleifend lacus, in mollis lectus. Donec
          sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id
          porttitor mi magna a neque. Donec dui urna, vehicula et sem eget,
          facilisis sodales sem.
        </Message.Body>
      </Message>
    </React.Fragment>
  ))
  .add("Heading", () => <Heading>heading</Heading>)
  .add("Highlight", () => <Highlight>highlight</Highlight>)
  .add("Loader", () => <Loader />)
  .add("Numeric", () => <Numeric>3</Numeric>);
