import React, { useState } from "react";

import { Container, Delete, Notification } from "rbx";
import "rbx/index.css";

export const HelloWorldNotification = () => {
  const [active, setActive] = useState(true);

  if (!active) {
    return (
      <div>
        <span>You've closed the notification </span>
        <span role="img" aria-label="shoe">
          👟
        </span>
      </div>
    );
  }

  return (
    <Notification color="primary">
      Welcome to{" "}
      <span role="img" aria-label="shoe">
        👟
      </span>{" "}
      <strong>rbx</strong>
      <Delete onClick={() => setActive(false)} />
    </Notification>
  );
};

export default function Index() {
  return (
    <Container>
      <HelloWorldNotification />
    </Container>
  );
}
