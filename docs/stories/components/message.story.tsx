import { select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Message } from "src/components";
import { MESSAGE_DEFAULTS } from "src/components/message/message";
import { Delete } from "src/elements";
import { Section } from "src/layout";

import { colorKnob } from "docs/stories/common";
import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";

export const knobs = {
  size: (title: string = "Size") =>
    select(
      title,
      iterableToSelectObject(MESSAGE_DEFAULTS.sizes, { undefined: "" }),
      "",
    ),
};

storiesOf("Components/Message", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const props = filterUndefined({
      color: colorKnob(),
      size: knobs.size(),
    });

    return (
      <Message {...props}>
        <Message.Header>
          <p>Hello world</p>
          <Delete as="button" />
        </Message.Header>
        <Message.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta
          nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida
          purus diam, et dictum <a href="#felis">felis venenatis</a> efficitur.
          Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales,
          arcu et sollicitudin porttitor, tortor urna tempor ligula, id
          porttitor mi magna a neque. Donec dui urna, vehicula et sem eget,
          facilisis sodales sem.
        </Message.Body>
      </Message>
    );
  })
  .add("Body only", () => {
    const props = filterUndefined({
      color: colorKnob(),
      size: knobs.size(),
    });

    return (
      <Message {...props}>
        <Message.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta
          nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida
          purus diam, et dictum <a href="#felis">felis venenatis</a> efficitur.
          Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales,
          arcu et sollicitudin porttitor, tortor urna tempor ligula, id
          porttitor mi magna a neque. Donec dui urna, vehicula et sem eget,
          facilisis sodales sem.
        </Message.Body>
      </Message>
    );
  });
