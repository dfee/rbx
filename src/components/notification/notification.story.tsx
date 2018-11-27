import { storiesOf } from "@storybook/react";
import React from "react";

import { Button } from "@/components/button";
import { Notification } from "@/components/notification";
import { Section } from "@/components/section";

storiesOf("Notification", module).add("Default", () => (
  <Section>
    <Notification>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor.{" "}
      <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec
      nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus
      diam, et dictum <a href="/">felis venenatis</a> efficitur. Sit amet,
      consectetur adipiscing elit
      <Button remove />
    </Notification>
    <Notification color={"success" as "success"}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor.{" "}
      <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec
      nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus
      diam, et dictum <a href="/">felis venenatis</a> efficitur. Sit amet,
      consectetur adipiscing elit
      <Button remove />
    </Notification>
    <Notification color={"danger" as "danger"}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit lorem ipsum dolor.{" "}
      <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec
      nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus
      diam, et dictum <a href="/">felis venenatis</a> efficitur. Sit amet,
      consectetur adipiscing elit
      <Button remove />
    </Notification>
  </Section>
));
