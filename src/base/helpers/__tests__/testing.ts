import { TransformFunc } from "src/base/helpers/types";

import { withMockError } from "src/__tests__/testing";

const CNAME = "foo";
const LOC = "prop";

// tslint:disable-next-line:no-any
export const testItShouldPreserveUnknown = (tfunc: TransformFunc<any>) => {
  it("should preserve unknown props", () => {
    const props = { foo: "bar" };
    expect(tfunc(props, CNAME, LOC)).toEqual({ className: "", ...props });
  });
};

export const testItShouldNotSetClassNameOnEmpty = (
  // tslint:disable-next-line:no-any
  tfunc: TransformFunc<any>,
) => {
  it("should not set className on empty", () => {
    expect(tfunc({}, CNAME, LOC)).toEqual({ className: "" });
  });
};

export const testItShouldPreserveCustomClassName = (
  // tslint:disable-next-line:no-any
  tfunc: TransformFunc<any>,
) => {
  it("should preserve custom className", () => {
    const className = "foo";
    expect(tfunc({ className }, CNAME, LOC)).toEqual({ className });
  });
};

export const testItShouldUseDefaultLocationProp = (
  tfunc: TransformFunc<any>, // tslint:disable-line:no-any
  props: any, // tslint:disable-line:no-any
) => {
  it("should use propTypes location = 'prop' as default", () => {
    withMockError({}, ({ context: { error } }) => {
      tfunc(props, "foo");
      expect(error.mock.calls).toHaveLength(1);
      expect(error.mock.calls[0][0]).toMatch(/Warning: Failed prop type.+/);
    });
  });
};
