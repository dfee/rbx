import React from "react";

import { canUseDOM, combineRefs, noop } from "src/utils";

import { withWindow } from "./testing";

describe("Utils", () => {
  describe("canUseDOM", () => {
    it("should return true with createElement", () => {
      // tslint:disable-next-line:no-any
      expect((global as any).window).toBeDefined();
      expect(window.document).toBeTruthy();
      expect(window.document.createElement).toBeTruthy();
      expect(canUseDOM()).toBe(true);
    });

    it("should return false without window (SSR)", () => {
      const initialWindow = window;
      try {
        delete (global as any).window; // tslint:disable-line:no-any
        expect(() => window).toThrow(
          new ReferenceError("window is not defined"),
        );
        expect(canUseDOM()).toBe(false);
      } catch {
        (global as any).window = initialWindow; // tslint:disable-line:no-any
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

    // tslint:disable-next-line:no-null-keyword
    [undefined, null].map(refMissing => {
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
