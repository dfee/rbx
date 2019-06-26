import React, { PureComponent, ReactNode, CSSProperties } from "react";
import ReactDOM from "react-dom";
import {
  NotificationToastProps,
  NotificationToast,
} from "./notification-toast";
import { Prefer } from "../../types";

export const NOTIFICATION_TOAST_DEFAULTS = {
  positions: [
    "top-left",
    "top-right",
    "top-center",
    "bottom-left",
    "bottom-right",
    "bottom-center",
    "center",
  ] as const,
};

export interface NotificationToastVariablesOverrides {}
export interface NotificationToastVariablesDefaults {
  positions: (typeof NOTIFICATION_TOAST_DEFAULTS["positions"])[number];
}

export type NotificationToastVariables = Prefer<
  NotificationToastVariablesOverrides,
  NotificationToastVariablesDefaults
>;

export type NotificationToastContainerProps = {
  id: string;
  position:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center"
    | "center";
};

type UniqueNotificationToastProps = NotificationToastProps & { id: string };
type State = {
  notifications: UniqueNotificationToastProps[];
};

export class NotificationToastContainer extends PureComponent<
  NotificationToastContainerProps,
  State
> {
  public static displayName = "Notification.Toast.Container";

  state: State = {
    notifications: [],
  };

  public componentDidMount() {
    const element = ReactDOM.findDOMNode(this) as HTMLDivElement;
    element.addEventListener("notify", this.handleNotify as EventListener);
  }

  public componentWillUnmount() {
    const element = ReactDOM.findDOMNode(this) as HTMLDivElement;
    element.removeEventListener("notify", this.handleNotify as EventListener);
  }

  public render(): ReactNode {
    return (
      <div
        id={this.props.id}
        style={Object.assign(this.getPositionStyles(), {
          width: "100%",
          zIndex: 99999,
          position: "fixed",
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          padding: "15px",
        })}
      >
        {this.renderToastNotifications()}
      </div>
    );
  }

  public handleNotify = (evt: CustomEvent<NotificationToastProps>): void => {
    const id = this.uniqueId(evt.detail);
    const props: UniqueNotificationToastProps = Object.assign(
      { id },
      evt.detail,
    );
    this.setState({
      notifications: [...this.state.notifications, props],
    });
  };

  private getPositionStyles(): CSSProperties {
    switch (this.props.position) {
      case "top-left":
        return { left: 0, top: 0, textAlign: "left", alignItems: "flex-start" };
      case "top-right":
        return { right: 0, top: 0, textAlign: "right", alignItems: "flex-end" };
      case "top-center":
        return {
          top: 0,
          left: 0,
          right: 0,
          textAlign: "center",
          alignItems: "center",
        };
      case "bottom-left":
        return {
          left: 0,
          bottom: 0,
          textAlign: "left",
          alignItems: "flex-start",
        };
      case "bottom-right":
        return {
          right: 0,
          bottom: 0,
          textAlign: "right",
          alignItems: "flex-end",
        };
      case "bottom-center":
        return {
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: "center",
          alignItems: "center",
        };
      case "center":
        return {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          flexFlow: "column",
          justifyContent: "center",
          alignItems: "center",
        };
    }
  }

  private renderToastNotifications(): ReactNode[] {
    return this.state.notifications
      .map(props => {
        const originalOnClose = props.onClose;
        props.onClose = () => {
          if (originalOnClose) {
            originalOnClose();
          }
          this.setState({
            notifications: this.state.notifications.filter(
              tmp => tmp.id !== props.id,
            ),
          });
        };

        return <NotificationToast key={props.id} {...props} />;
      })
      .filter(value => value) as JSX.Element[];
  }

  private uniqueId(props: NotificationToastProps): string {
    const value = JSON.stringify(props);
    let hash = 0,
      i,
      chr;
    for (i = 0; i < value.length; i++) {
      chr = value.charCodeAt(i);
      hash = (hash << 5) - hash + chr;
      hash |= 0; // Convert to 32bit integer
    }

    return (
      "toast-notification-" +
      this.state.notifications.length +
      "-" +
      hash +
      "-" +
      new Date().valueOf()
    );
  }
}
