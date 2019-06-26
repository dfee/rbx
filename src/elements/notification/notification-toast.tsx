import React, { PureComponent, ReactChild, ReactNode } from "react";
import { render } from "react-dom";
import { Delete } from "../other/delete";
import { Progress } from "../progress/progress";
import {
  NotificationToastContainer,
  NotificationToastVariables,
} from "./notification-toast-container";
import Timer from "./timer";
import { NotificationProps, Notification } from "./notification";

const defaultProps = Object.freeze({
  closeOnClick: true,
  pauseOnHover: true,
  duration: 2000,
  delete: true,
  progress: true,
  opacity: 1,
  color: "info",
});

export type NotificationToastProps = typeof defaultProps &
  NotificationProps & {
    children: ReactChild | string;
    onClose?: () => void;
  };
export interface State {
  progressValue: number;
}

export class NotificationToast extends PureComponent<
  NotificationToastProps,
  State
> {
  public static displayName = "Notification.Toast";
  static readonly defaultProps = defaultProps;

  state: State = {
    progressValue: 100,
  };

  timer: Timer = new Timer(
    this.props.duration,
    () => {
      this.close();
    },
    this.props.progress
      ? (progressValue: number) => {
          this.setState({ progressValue });
        }
      : undefined,
  );

  public render(): ReactNode {
    const notificationProps: NotificationProps = {};
    Object.keys(this.props).forEach(key => {
      if (!(key in defaultProps)) {
        notificationProps[key] = this.props[key];
      }
    });

    return (
      <Notification
        onClick={this.handleClick}
        onMouseEnter={this.timer.pause}
        onMouseLeave={this.timer.resume}
        style={{
          width: "auto",
          pointerEvents: "auto",
          display: "inline-flex",
          opacity: this.props.opacity,
        }}
        color={this.props.color}
        {...notificationProps}
      >
        {this.props.delete && <Delete as="button" />}
        {this.props.children}
        {this.props.progress && (
          <Progress
            value={this.state.progressValue}
            max={100}
            color={this.props.color}
            style={{
              height: "0.25rem",
              position: "absolute",
              bottom: "0.1rem",
              left: "2%",
              width: "96%",
            }}
          />
        )}
      </Notification>
    );
  }

  private close = () => {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  private handleClick = () => {
    if (this.props.closeOnClick) {
      this.timer.end();
      this.close();
    }
  };
}

export const notify = (
  props: Partial<NotificationToastProps> | ReactChild | string,
  position: NotificationToastVariables["positions"] = "top-right",
): void => {
  const notifyContainerId = "rbx-notification-toast-container-" + position;
  let notifyContainer = document.getElementById(notifyContainerId);

  if (!notifyContainer) {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const toastNotificationContainer = (
      <NotificationToastContainer id={notifyContainerId} position={position} />
    );

    render(toastNotificationContainer, container);
    notifyContainer = document.getElementById(
      notifyContainerId,
    ) as HTMLDivElement;
  }

  let finalProps: Partial<NotificationToastProps>;
  if (isNotificationToastProps(props)) {
    finalProps = props;
  } else {
    const children: ReactChild | string = props as ReactChild | string;
    finalProps = { children };
  }

  notifyContainer.dispatchEvent(
    new CustomEvent("notify", { detail: finalProps }),
  );
};

const isNotificationToastProps = (arg: any): arg is NotificationToastProps => {
  return arg.children !== undefined;
};
