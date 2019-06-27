import React from "react";

import { Prefer } from "../../types";
import { Delete } from "../other/delete";
import { Progress } from "../progress/progress";

import Timer from "./timer";
import { NotificationProps, Notification } from "./notification";

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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface NotificationToastVariablesOverrides {}
export interface NotificationToastVariablesDefaults {
  positions: (typeof NOTIFICATION_TOAST_DEFAULTS["positions"])[number];
}

export type NotificationToastVariables = Prefer<
  NotificationToastVariablesOverrides,
  NotificationToastVariablesDefaults
>;

export const defaultNotificationToastProps = Object.freeze({
  close: true,
  closeOnClick: true,
  color: "info",
  duration: 2000,
  opacity: 1,
  pauseOnHover: true,
  progress: true,
});

export type NotificationToastProps = typeof defaultNotificationToastProps &
  NotificationProps & {
    children: React.ReactChild | string;
    onClose?: () => void;
  };

export interface State {
  progressValue: number;
}

export class NotificationToast extends React.PureComponent<
  NotificationToastProps,
  State
> {
  public static displayName = "Notification.Toast";
  static readonly defaultProps = defaultNotificationToastProps;

  state: State = {
    progressValue: 100,
  };

  timer: Timer = new Timer(
    // eslint-disable-next-line react/destructuring-assignment
    this.props.duration,
    () => {
      this._close();
    },
    // eslint-disable-next-line react/destructuring-assignment
    this.props.progress
      ? (progressValue: number) => {
          this.setState({ progressValue });
        }
      : undefined,
  );

  private _close = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  };

  public handleClick = () => {
    const { closeOnClick } = this.props;
    if (closeOnClick) {
      this.timer.end();
      this._close();
    }
  };

  public handleMouseEnter = () => {
    this.timer.pause();
  };

  public handleMouseLeave = () => {
    this.timer.resume();
  };

  public render(): React.ReactNode {
    const notificationProps: NotificationProps = {};
    const { ...props } = this.props;
    Object.keys(this.props).forEach(key => {
      if (!(key in defaultNotificationToastProps)) {
        notificationProps[key] = props[key];
      }
    });

    const { color, opacity, close, progress, children } = this.props;
    const { progressValue } = this.state;

    return (
      <Notification
        color={color}
        style={{
          display: "inline-flex",
          opacity,
          pointerEvents: "auto",
          width: "auto",
        }}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        {...notificationProps}
      >
        {close && <Delete as="button" />}
        {children}
        {progress && (
          <Progress
            color={color}
            max={100}
            style={{
              bottom: "0.1rem",
              height: "0.25rem",
              left: "2%",
              position: "absolute",
              width: "96%",
            }}
            value={progressValue}
          />
        )}
      </Notification>
    );
  }
}
