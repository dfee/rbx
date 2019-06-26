import React from "react";

import { Button } from "src/elements/button/button";
import { notify } from "../notification-toast";
import { NotificationProps } from "../notification";
import { ToastPositions } from "../notification-toast-container";

export type SimpleNotificationToastManagerProps = NotificationProps & {
  button: React.ReactElement<React.ComponentProps<typeof Button>>;
  position: ToastPositions;
  document: Document;
};
export type SimpleNotificationToastManagerState = { active: boolean };

export class SimpleNotificationToastManager extends React.Component<
  SimpleNotificationToastManagerProps,
  SimpleNotificationToastManagerState
> {
  public render() {
    const { button } = this.props;

    const managedButton = React.cloneElement(button, {
      onClick: this.handleClick,
    });

    return <React.Fragment>{managedButton}</React.Fragment>;
  }

  private readonly handleClick = () => {
    notify(
      {
        children: (
          <>
            Sample toasted notification. Position: {this.props.position}, color:{" "}
            {this.props.color}
          </>
        ),
        color: this.props.color,
      },
      this.props.position,
    );
  };
}
