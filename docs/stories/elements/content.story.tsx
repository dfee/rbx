import { select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Content, Title } from "src/elements";
import { CONTENT_DEFAULTS } from "src/elements/content/content";
import { CONTENT_ORDERED_LIST_DEFAULTS } from "src/elements/content/content-ordered-list";

import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";
import { Section } from "src/layout";

export const knobs = {
  orderedList: {
    type: (title: string = "Ordered List Type") =>
      select(
        title,
        iterableToSelectObject(CONTENT_ORDERED_LIST_DEFAULTS.types, {
          undefined: "",
        }),
        "",
      ),
  },
  size: (title: string = "Size") =>
    select(
      title,
      iterableToSelectObject(CONTENT_DEFAULTS.sizes, { undefined: "" }),
      "",
    ),
};

storiesOf("Elements/Content", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const props = filterUndefined({
      size: knobs.size(),
    });

    return (
      <Content {...props}>
        <Title>Hello World</Title>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          accumsan, metus ultrices eleifend gravida, nulla nunc varius lectus,
          nec rutrum justo nibh eu lectus. Ut vulputate semper dui. Fusce erat
          odio, sollicitudin vel erat vel, interdum mattis neque.
        </p>
        <Title as="h2">Second Level</Title>
        <p>
          Curabitur accumsan turpis pharetra <strong>augue tincidunt</strong>{" "}
          blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum
          id. Proin pretium urna vel cursus venenatis. Suspendisse potenti.
          Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim
          dui. Ut et neque nisl.
        </p>
        <ul>
          <li>In fermentum leo eu lectus mollis, quis dictum mi aliquet.</li>
          <li>Morbi eu nulla lobortis, lobortis est in, fringilla felis.</li>
          <li>
            Aliquam nec felis in sapien venenatis viverra fermentum nec lectus.
          </li>
          <li>Ut non enim metus.</li>
        </ul>
      </Content>
    );
  })
  .add("Ordered lists", () => {
    const props = filterUndefined({
      type: knobs.orderedList.type(),
    });

    return (
      <Content>
        <Content.OrderedList {...props}>
          <Content.OrderedList.Item>Coffee</Content.OrderedList.Item>
          <Content.OrderedList.Item>Tea</Content.OrderedList.Item>
          <Content.OrderedList.Item>Milk</Content.OrderedList.Item>
        </Content.OrderedList>
      </Content>
    );
  });
