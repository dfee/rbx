import React from "react";

import { storiesOf } from "@storybook/react";

import { Box } from "@/components/box";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Control, Field, Input } from "@/components/form";
import { Heading } from "@/components/heading";
import { Hero } from "@/components/hero";
import { Level } from "@/components/level";
import { Section } from "@/components/section";

const style: React.CSSProperties = { textAlign: "center" };

storiesOf("Level", module)
  .addDecorator(story => (
    <Hero size="fullheight">
      <Hero.Head<"header"> as="header">
        <Container>{story()}</Container>
      </Hero.Head>
    </Hero>
  ))
  .add("Default", () => (
    <Section>
      <Box>
        <Level<"nav"> as="nav">
          <Level.Side align="left">
            <Level.Item>
              <Heading size={5} subtitle>
                <strong>123</strong> posts
              </Heading>
            </Level.Item>
            <Level.Item>
              <Field kind="addons">
                <Control>
                  <Input placeholder="Find a post" />
                </Control>
                <Control>
                  <Button<"button"> as="button">Search</Button>
                </Control>
              </Field>
            </Level.Item>
          </Level.Side>

          <Level.Side align="right">
            <Level.Item>
              <strong>All</strong>
            </Level.Item>
            <Level.Item>
              <a>Published</a>
            </Level.Item>
            <Level.Item>
              <a>Drafts</a>
            </Level.Item>
            <Level.Item>
              <a>Deleted</a>
            </Level.Item>
            <Level.Item>
              <Button<"a"> as="a" color="success">
                New
              </Button>
            </Level.Item>
          </Level.Side>
        </Level>
      </Box>
    </Section>
  ))
  .add("Items Centered", () => (
    <Section>
      <Box>
        <Level<"nav"> as="nav">
          <Level.Item style={style}>
            <div>
              <Heading<"p"> as="p" heading>
                Tweets
              </Heading>
              <Heading<"p"> as="p" heading>
                3,210
              </Heading>
            </div>
          </Level.Item>
          <Level.Item style={style}>
            <div>
              <Heading<"p"> as="p" heading>
                Following
              </Heading>
              <Heading<"p"> as="p" heading>
                210
              </Heading>
            </div>
          </Level.Item>
          <Level.Item style={style}>
            <div>
              <Heading<"p"> as="p" heading>
                Followers
              </Heading>
              <Heading<"p"> as="p" heading>
                321
              </Heading>
            </div>
          </Level.Item>
          <Level.Item style={style}>
            <div>
              <Heading<"p"> as="p" heading>
                Likes
              </Heading>
              <Heading<"p"> as="p" heading>
                321K
              </Heading>
            </div>
          </Level.Item>
        </Level>
      </Box>
    </Section>
  ))
  .add("With breakpoint", () =>
    ["Mobile", "Without breakpoint"].map(title => {
      const breakpoint = title === "Mobile" ? "mobile" : undefined;
      return (
        <Section key={title}>
          <Heading>{title}</Heading>
          <Box>
            <Level<"nav"> as="nav" breakpoint={breakpoint}>
              <Level.Item style={style}>
                <div>
                  <Heading<"p"> as="p" heading>
                    Tweets
                  </Heading>
                  <Heading<"p"> as="p" heading>
                    3,210
                  </Heading>
                </div>
              </Level.Item>
              <Level.Item style={style}>
                <div>
                  <Heading<"p"> as="p" heading>
                    Following
                  </Heading>
                  <Heading<"p"> as="p" heading>
                    210
                  </Heading>
                </div>
              </Level.Item>
              <Level.Item style={style}>
                <div>
                  <Heading<"p"> as="p" heading>
                    Followers
                  </Heading>
                  <Heading<"p"> as="p" heading>
                    321
                  </Heading>
                </div>
              </Level.Item>
              <Level.Item style={style}>
                <div>
                  <Heading<"p"> as="p" heading>
                    Likes
                  </Heading>
                  <Heading<"p"> as="p" heading>
                    321K
                  </Heading>
                </div>
              </Level.Item>
            </Level>
          </Box>
        </Section>
      );
    }),
  );
