import { boolean, select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Title } from "src/elements";
import { TITLE_DEFAULTS } from "src/elements/title/title";

import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";
import { Section } from "src/layout";

export const knobs = {
  size: (title: string = "Size") =>
    select(
      title,
      iterableToSelectObject(TITLE_DEFAULTS.sizes, { undefined: "" }),
      "",
    ),
  spaced: (title: string = "Spaced") => boolean(title, false),
};

storiesOf("Elements/Title", module)
  .addDecorator(story => <Section children={story()} />)
  .add("Default", () => {
    const titleProps = filterUndefined({
      size: knobs.size("Title size"),
      spaced: knobs.spaced("Title spaced"),
    });

    const subtitleProps = filterUndefined({
      size: knobs.size("Subtitle size"),
    });

    return (
      <div>
        <Title {...titleProps}>Title</Title>
        <Title as="h2" subtitle {...subtitleProps}>
          Subtitle
        </Title>
      </div>
    );
  });
