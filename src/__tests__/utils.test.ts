import * as React from "react";

import { canUseDOM, combineRefs, noop, canReceiveRef } from "src/utils";

import { withWindow } from "./testing";

describe("Utils", () => {
  describe("canReceiveRef", () => {
    it("should return false for function components", () => {
      const FC = () => null;
      expect(canReceiveRef(FC)).toBe(false);
    });

    it("should return false for memo components", () => {
      const MC = React.memo(() => null);
      expect(canReceiveRef(MC)).toBe(false);
    });

    it("should return false for unknown components", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const UC = true as any;
      expect(canReceiveRef(UC)).toBe(false);
    });

    it("should return true for class components", () => {
      // eslint-disable-next-line react/prefer-stateless-function
      class CC extends React.Component {
        render() {
          return null;
        }
      }
      expect(canReceiveRef(CC)).toBe(true);
    });

    it("should return true for forwardRef components", () => {
      const FRC = React.forwardRef(() => null);
      expect(canReceiveRef(FRC)).toBe(true);
    });

    it("should return true for JSX elements", () => {
      const el: keyof JSX.IntrinsicElements = "div";
      expect(canReceiveRef(el)).toBe(true);
    });
  });

  describe("canUseDOM", () => {
    it("should return true with createElement", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((global as any).window).toBeDefined();
      expect(window.document).toBeTruthy();
      expect(window.document.createElement).toBeTruthy();
      expect(canUseDOM()).toBe(true);
    });

    it("should return false without window (SSR)", () => {
      const initialWindow = window;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (global as any).window;
        expect(() => window).toThrow(
          new ReferenceError("window is not defined"),
        );
        expect(canUseDOM()).toBe(false);
      } catch {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (global as any).window = initialWindow;
      }
    });

    it("should return false without document", () => {
      withWindow({ value: jest.fn() }, () => {
        expect(window.document).toBeFalsy();
        expect(canUseDOM()).toBe(false);
      });
    });

    it("should return false without document.createElement", () => {
      withWindow({ value: { document: jest.fn() } }, () => {
        expect(window.document).toBeTruthy();
        expect(window.document.createElement).toBeFalsy();
        expect(canUseDOM()).toBe(false);
      });
    });
  });

  describe("combineRefs", () => {
    it("should combine RefObject and ref callback", () => {
      const div = document.createElement("div");
      const refObj = React.createRef<HTMLDivElement>();
      const refCallback = jest.fn(e => undefined);
      const combined = combineRefs(refObj, refCallback);

      combined(div);
      expect(refCallback.mock.calls[0][0]).toBe(div);
      expect(refObj.current).toBe(div);
    });

    [undefined, null].forEach(refMissing => {
      it(`should handle ${
        refMissing === undefined ? "undefined" : "null"
      }`, () => {
        const div = document.createElement("div");
        const refObj = React.createRef<HTMLDivElement>();
        const combined = combineRefs(refObj, refMissing);

        combined(div);
        expect(refObj.current).toBe(div);
      });
    });
  });

  describe("noop", () => {
    it("should not error", () => {
      noop();
    });
  });
});
