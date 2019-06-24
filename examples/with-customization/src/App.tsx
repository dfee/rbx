import React, { useState } from "react";
import { Container, Notification } from "rbx";
import { Delete } from "rbx/elements/other/delete";
// import { ThemeContext } from "rbx/base/theme";

// import { themeValue } from "./theme";
import "./App.sass";

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

export const App = () => (
  // <ThemeContext.Provider value={themeValue}>
  <Container>
    <HelloWorldNotification />
  </Container>
  // </ThemeContext.Provider>
);
