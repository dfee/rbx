import { select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Content, Title } from "@/elements";
import { CONTENT_SIZES, ContentSizes } from "@/elements/content/content";
import {
  CONTENT_ORDERED_LIST_TYPES,
  ContentOrderedListTypes,
} from "@/elements/content/content-ordered-list";

const makeSizeSelect = () =>
  select(
    "Size",
    {
      None: "",
      ...Object.assign({}, ...CONTENT_SIZES.map(size => ({ [size]: size }))),
    },
    "None",
  );

const makeOrderedListTypeSelect = () =>
  select(
    "Ordered List Type",
    {
      None: "",
      ...Object.assign(
        {},
        ...CONTENT_ORDERED_LIST_TYPES.map(type => ({ [type]: type })),
      ),
    },
    "None",
  );

storiesOf("Elements/Content", module)
  .add("Default", () => (
    <Content size={makeSizeSelect() as ContentSizes}>
      <Title>Hello World</Title>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla accumsan,
        metus ultrices eleifend gravida, nulla nunc varius lectus, nec rutrum
        justo nibh eu lectus. Ut vulputate semper dui. Fusce erat odio,
        sollicitudin vel erat vel, interdum mattis neque.
      </p>
      <Title<"h2"> as="h2">Second Level</Title>
      <p>
        Curabitur accumsan turpis pharetra <strong>augue tincidunt</strong>{" "}
        blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum
        id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam
        mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut
        et neque nisl.
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
  ))
  .add("Ordered List", () => (
    <Content>
      <Content.OrderedList
        type={makeOrderedListTypeSelect() as ContentOrderedListTypes}
      >
        <Content.OrderedList.Item>Coffee</Content.OrderedList.Item>
        <Content.OrderedList.Item>Tea</Content.OrderedList.Item>
        <Content.OrderedList.Item>Milk</Content.OrderedList.Item>
      </Content.OrderedList>
    </Content>
  ));
