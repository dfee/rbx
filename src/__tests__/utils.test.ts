import React from "react";

import { canUseDOM, combineRefs } from "../utils";

describe("Utils", () => {
  describe("canUseDOM", () => {
    let initWindow: Window;

    beforeEach(() => {
      initWindow = (global as any).window;
    });

    afterEach(() => {
      (global as any).window = initWindow;
    });

    it("should return true with createElement", () => {
      expect((global as any).window).toBeDefined();
      expect(window.document).toBeTruthy();
      expect(window.document.createElement).toBeTruthy();
      expect(canUseDOM()).toBe(true);
    });

    it("should return false without window", () => {
      delete (global as any).window;
      expect((global as any).window).toBeUndefined();
      expect(canUseDOM()).toBe(false);
    });

    it("should return false without document", () => {
      (global as any).window = jest.fn();
      expect((global as any).window).toBeDefined();
      expect(window.document).toBeFalsy();
      expect(canUseDOM()).toBe(false);
    });

    it("should return false without document.createElement", () => {
      (global as any).window = { document: jest.fn() };
      expect((global as any).window).toBeDefined();
      expect(window.document).toBeTruthy();
      expect(window.document.createElement).toBeFalsy();
      expect(canUseDOM()).toBe(false);
    });
  });

  describe("combineRefs", () => {
    it("should combine RefObject and ref callback", () => {
      const div = document.createElement("div");
      const refObj = React.createRef<HTMLDivElement>();
      const refCallback = jest.fn();
      const combined = combineRefs(refObj, refCallback);

      combined(div);
      expect(refCallback.mock.calls[0][0]).toBe(div);
      expect(refObj.current).toBe(div);
    });

    [undefined, null].map(refMissing =>
      it(`should handle ${
        refMissing === undefined ? "undefined" : "null"
      }`, () => {
        const div = document.createElement("div");
        const refObj = React.createRef<HTMLDivElement>();
        const combined = combineRefs(refObj, refMissing);

        combined(div);
        expect(refObj.current).toBe(div);
      }),
    );
  });
});
