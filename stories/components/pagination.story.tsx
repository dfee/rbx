import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Pagination } from "@/components";
import {
  PAGINATION_ALIGNMENTS,
  PAGINATION_SIZES,
} from "@/components/pagination/pagination";
import { Section } from "@/layout";

import { iterableToSelectObject } from "../utils";

export const knobs = {
  align: (title: string = "Position") =>
    select(
      title,
      iterableToSelectObject(PAGINATION_ALIGNMENTS, { undefined: "" }),
      "",
    ),
  link: {
    current: (title: string = "Current") => boolean(title, false),
  },
  rounded: (title: string = "Rounded") => boolean(title, false),
  size: (title: string = "Size") =>
    select(
      title,
      iterableToSelectObject(PAGINATION_SIZES, { undefined: "" }),
      "",
    ),
};

storiesOf("Components/Pagination", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const align = knobs.align();
    const rounded = knobs.rounded();
    const size = knobs.size();
    const linkProps = {
      current: knobs.link.current("Page 45: current"),
    };

    return (
      <Pagination
        align={align || undefined}
        rounded={rounded}
        size={size || undefined}
      >
        <Pagination.Previous />
        <Pagination.Next />
        <Pagination.List>
          <Pagination.Link>1</Pagination.Link>
          <Pagination.Ellipsis />
          <Pagination.Link {...linkProps}>45</Pagination.Link>
          <Pagination.Link>46</Pagination.Link>
          <Pagination.Link>47</Pagination.Link>
          <Pagination.Ellipsis />
          <Pagination.Link>86</Pagination.Link>
        </Pagination.List>
      </Pagination>
    );
  });
