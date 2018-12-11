import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { storiesOf } from "@storybook/react";
import React from "react";

import { Card, Media } from "@/components";
import { Content, Icon, Image, Title } from "@/elements";
import { Section } from "@/layout";

storiesOf("Components/Card", module)
  .addDecorator(story => (
    <Section>
      <div style={{ width: 450 }}>{story()}</div>
    </Section>
  ))
  .add("Default", () => (
    <Card>
      <Card.Image>
        <Image
          size="4by3"
          src="http://bulma.io/images/placeholders/1280x960.png"
        />
      </Card.Image>
      <Card.Content>
        <Media>
          <Media.Item as="figure" position="left">
            <Image
              as="p"
              size={64}
              alt="64x64"
              src="http://bulma.io/images/placeholders/128x128.png"
            />
          </Media.Item>
          <Media.Item>
            <Title as="p" size={4}>
              John Smith
            </Title>
            <Title as="p" subtitle size={6}>
              @johnsmith
            </Title>
          </Media.Item>
        </Media>
        <Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris. <a>@bulmaio</a>. <a href="#1">#css</a>{" "}
          <a href="#2">#responsive</a>
          <br />
          <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </Content>
      </Card.Content>
    </Card>
  ))
  .add("Header and footer", () => (
    <Card>
      <Card.Header>
        <Card.Header.Title>Component</Card.Header.Title>
        <Card.Header.Icon as="a">
          <Icon>
            <FontAwesomeIcon icon={faAngleDown} />
          </Icon>
        </Card.Header.Icon>
      </Card.Header>
      <Card.Content>
        <Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris. <a>@bulmaio</a>. <a href="#1">#css</a>{" "}
          <a href="#2">#responsive</a>
          <br />
          <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </Content>
      </Card.Content>
      <Card.Footer>
        <Card.Footer.Item as="a" href="#">
          Save
        </Card.Footer.Item>
        <Card.Footer.Item as="a" href="#">
          Edit
        </Card.Footer.Item>
        <Card.Footer.Item as="a" href="#">
          Delete
        </Card.Footer.Item>
      </Card.Footer>
    </Card>
  ))
  .add("Footer", () => (
    <Card>
      <Card.Content>
        <Title>
          “There are two hard things in computer science: cache invalidation,
          naming things, and off-by-one errors.”
        </Title>
        <Title subtitle>Jeff Atwood</Title>
      </Card.Content>
      <Card.Footer as="footer">
        <Card.Footer.Item as="p">
          <span>
            View on{" "}
            <a href="https://twitter.com/codinghorror/status/506010907021828096">
              Twitter
            </a>
          </span>
        </Card.Footer.Item>
        <Card.Footer.Item as="p">
          <span>
            Share on <a href="#">Facebook</a>
          </span>
        </Card.Footer.Item>
      </Card.Footer>
    </Card>
  ));
