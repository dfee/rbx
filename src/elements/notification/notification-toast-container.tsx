import React from "react";

import {
  NotificationToast,
  NotificationToastProps,
  NotificationToastVariables,
} from "./notification-toast";

export type NotificationToastContainerProps = {
  id: string;
  position: NotificationToastVariables["positions"];
};

type UniqueNotificationToastProps = NotificationToastProps & { id: string };
type State = {
  notifications: UniqueNotificationToastProps[];
};

export class NotificationToastContainer extends React.PureComponent<
  NotificationToastContainerProps,
  State
> {
  public static displayName = "Notification.Toast.Container";

  state: State = {
    notifications: [],
  };

  node?: HTMLDivElement | null;

  public componentDidMount() {
    this.node &&
      this.node.addEventListener("notify", this._handleNotify as EventListener);
  }

  public componentWillUnmount() {
    this.node &&
      this.node.removeEventListener("notify", this
        ._handleNotify as EventListener);
  }

  private _handleNotify = (evt: CustomEvent<NotificationToastProps>): void => {
    const id = this._uniqueId(evt.detail);
    const props: UniqueNotificationToastProps = {
      id,
      ...evt.detail,
    };
    this.setState(state => ({
      notifications: [...state.notifications, props],
    }));
  };

  // eslint-disable-next-line consistent-return
  private _getPositionStyles(): React.CSSProperties {
    const { position } = this.props;
    switch (position) {
      case "top-left":
        return {
          alignItems: "flex-start",
          left: 0,
          textAlign: "left",
          top: 0,
        };
      case "top-right":
        return {
          alignItems: "flex-end",
          right: 0,
          textAlign: "right",
          top: 0,
        };
      case "top-center":
        return {
          alignItems: "center",
          left: 0,
          right: 0,
          textAlign: "center",
          top: 0,
        };
      case "bottom-left":
        return {
          alignItems: "flex-start",
          bottom: 0,
          left: 0,
          textAlign: "left",
        };
      case "bottom-right":
        return {
          alignItems: "flex-end",
          bottom: 0,
          right: 0,
          textAlign: "right",
        };
      case "bottom-center":
        return {
          alignItems: "center",
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: "center",
        };
      case "center":
        return {
          alignItems: "center",
          bottom: 0,
          flexFlow: "column",
          justifyContent: "center",
          left: 0,
          right: 0,
          top: 0,
        };
    }
  }

  private _renderToastNotifications(): React.ReactNode[] {
    const { notifications } = this.state;
    const toastNotifications: React.ReactNode[] = [];

    for (const notificationProps of notifications) {
      const props = notificationProps;
      const originalOnClose = notificationProps.onClose;
      props.onClose = () => {
        if (originalOnClose) {
          originalOnClose();
        }
        this.setState(state => ({
          notifications: state.notifications.filter(
            tmp => tmp.id !== notificationProps.id,
          ),
        }));
      };

      toastNotifications.push(
        <NotificationToast key={notificationProps.id} {...props} />,
      );
    }
    return toastNotifications;
  }

  private _uniqueId(props: NotificationToastProps): string {
    const value = JSON.stringify(props);
    let hash = 0;
    let i;
    let chr;
    for (i = 0; i < value.length; i += 1) {
      chr = value.charCodeAt(i);
      // eslint-disable-next-line no-bitwise
      hash = (hash << 5) - hash + chr;
      // eslint-disable-next-line no-bitwise
      hash |= 0; // Convert to 32bit integer
    }

    const { notifications } = this.state;

    return `toast-notification-${
      notifications.length
    }-${hash}-${new Date().valueOf()}`;
  }

  public render(): React.ReactNode {
    const { id } = this.props;
    return (
      <div
        ref={node => {
          this.node = node;
        }}
        id={id}
        style={Object.assign(this._getPositionStyles(), {
          display: "flex",
          flexDirection: "column",
          padding: "15px",
          pointerEvents: "none",
          position: "fixed",
          width: "100%",
          zIndex: 99999,
        })}
      >
        {this._renderToastNotifications()}
      </div>
    );
  }
}
