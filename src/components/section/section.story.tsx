import React from "react";

import { storiesOf } from "@storybook/react";

import Container from "components/container";
import Heading from "components/heading";
import Section from "components/section";

// TODO: doesn't seem to differentiate on sizes
storiesOf("Section", module)
  .add("Default", () => (
    <div>
      <Section>
        <Container>
          <Heading>Section</Heading>
          <Heading subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Heading>
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading>Section</Heading>
          <Heading subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Heading>
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading>Section</Heading>
          <Heading subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Heading>
        </Container>
      </Section>
      <Section>
        <Container>
          <Heading>Section</Heading>
          <Heading subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Heading>
        </Container>
      </Section>
    </div>
  ))
  .add("Medium", () => (
    <div>
      <Section size={"medium" as "medium"}>
        <Container>
          <Heading>Section</Heading>
          <Heading subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Heading>
        </Container>
      </Section>
      <Section size={"medium" as "medium"}>
        <Container>
          <Heading>Section</Heading>
          <Heading subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Heading>
        </Container>
      </Section>
      <Section size={"medium" as "medium"}>
        <Container>
          <Heading>Section</Heading>
          <Heading subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Heading>
        </Container>
      </Section>
    </div>
  ))
  .add("Large", () => (
    <div>
      <Section size={"large" as "large"}>
        <Container>
          <Heading>Section</Heading>
          <Heading subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Heading>
        </Container>
      </Section>
      <Section size={"large" as "large"}>
        <Container>
          <Heading>Section</Heading>
          <Heading subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Heading>
        </Container>
      </Section>
      <Section size={"large" as "large"}>
        <Container>
          <Heading>Section</Heading>
          <Heading subtitle>
            A simple container to divide your page into{" "}
            <strong>sections</strong>, like the one you are currently reading
          </Heading>
        </Container>
      </Section>
    </div>
  ));
