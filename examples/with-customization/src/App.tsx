import * as React from "react";
import { Container, Delete, Notification, ThemeContext } from "rbx";

import { themeValue } from "./theme";
import "./App.sass";

export const HelloWorldNotification = () => {
  const [active, setActive] = React.useState(true);

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
    <Notification color="react">
      Welcome to{" "}
      <span role="img" aria-label="shoe">
        👟
      </span>{" "}
      <strong>rbx</strong>
      <Delete onClick={() => setActive(false)} />
    </Notification>
  );
};

export const App = () => (
  <ThemeContext.Provider value={themeValue}>
    <Container>
      <HelloWorldNotification />
    </Container>
  </ThemeContext.Provider>
);
