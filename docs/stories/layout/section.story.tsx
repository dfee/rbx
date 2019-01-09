import { select } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Container, Title } from "src/elements";
import { Section } from "src/layout";
import { SECTION_DEFAULTS } from "src/layout/section/section";

import { filterUndefined, iterableToSelectObject } from "docs/stories/utils";

export const knobs = {
  size: (title: string = "Size") =>
    select(
      title,
      iterableToSelectObject(SECTION_DEFAULTS.sizes, { undefined: "" }),
      "",
    ),
};

storiesOf("Layout/Section", module).add("Default", () => {
  const props = filterUndefined({
    size: knobs.size(),
  });

  return (
    <div>
      <Section {...props}>
        <Container>
          <Title>Section</Title>
          <Title as="h2" subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Title>
        </Container>
      </Section>
    </div>
  );
});
