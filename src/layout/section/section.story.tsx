import { storiesOf } from "@storybook/react";
import React from "react";

import { Title } from "@/elements";
import { Container, Section } from "@/layout";

storiesOf("Layout/Section", module)
  .add("Default", () => (
    <div>
      <Section>
        <Container>
          <Title>Section</Title>
          <Title subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Title>
        </Container>
      </Section>
      <Section>
        <Container>
          <Title>Section</Title>
          <Title subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Title>
        </Container>
      </Section>
      <Section>
        <Container>
          <Title>Section</Title>
          <Title subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Title>
        </Container>
      </Section>
      <Section>
        <Container>
          <Title>Section</Title>
          <Title subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Title>
        </Container>
      </Section>
    </div>
  ))
  .add("Medium", () => (
    <div>
      <Section size="medium">
        <Container>
          <Title>Section</Title>
          <Title subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Title>
        </Container>
      </Section>
      <Section size="medium">
        <Container>
          <Title>Section</Title>
          <Title subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Title>
        </Container>
      </Section>
      <Section size="medium">
        <Container>
          <Title>Section</Title>
          <Title subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Title>
        </Container>
      </Section>
    </div>
  ))
  .add("Large", () => (
    <div>
      <Section size="large">
        <Container>
          <Title>Section</Title>
          <Title subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Title>
        </Container>
      </Section>
      <Section size="large">
        <Container>
          <Title>Section</Title>
          <Title subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Title>
        </Container>
      </Section>
      <Section size="large">
        <Container>
          <Title>Section</Title>
          <Title subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Title>
        </Container>
      </Section>
    </div>
  ));
