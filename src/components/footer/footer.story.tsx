import { storiesOf } from "@storybook/react";
import React from "react";

import { Container } from "@/components/container";
import { Content } from "@/components/content";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";

storiesOf("Footer", module).add("Default", () => (
  <Hero size={"fullheight" as "fullheignt"}>
    <Hero.Head renderAs="header" />
    <Hero.Body />
    <Hero.Footer>
      <Footer>
        <Container>
          <Content style={{ textAlign: "center" } as React.CSSProperties}>
            <p>
              <strong>Bulma</strong> by{" "}
              <a href="http://jgthms.com">Jeremy Thomas</a>. The source code is
              licensed{" "}
              <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
              The website content is licensed{" "}
              <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                {" "}
                CC BY NC SA 4.0
              </a>
              .
            </p>
          </Content>
        </Container>
      </Footer>
    </Hero.Footer>
  </Hero>
));
