import { ValidatingTransformFunction } from "src/base/helpers/factory";
import { withMockError } from "src/__tests__/testing";

const CNAME = "foo";
const LOC = "prop";

export const testItShouldPreserveUnknown = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tfunc: ValidatingTransformFunction<any, any>,
) => {
  it("should preserve unknown props", () => {
    const props = { foo: "bar" };
    expect(tfunc(props, CNAME, LOC)).toEqual({ className: "", ...props });
  });
};

export const testItShouldNotSetClassNameOnEmpty = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tfunc: ValidatingTransformFunction<any, any>,
) => {
  it("should not set className on empty", () => {
    expect(tfunc({}, CNAME, LOC)).toEqual({ className: "" });
  });
};

export const testItShouldPreserveCustomClassName = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tfunc: ValidatingTransformFunction<any, any>,
) => {
  it("should preserve custom className", () => {
    const className = "foo";
    expect(tfunc({ className }, CNAME, LOC)).toEqual({ className });
  });
};

export const testItShouldUseDefaultLocationProp = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tfunc: ValidatingTransformFunction<any, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any,
) => {
  it("should use propTypes location = 'prop' as default", () => {
    withMockError({}, ({ context: { error } }) => {
      tfunc(props, "foo");
      expect(error.mock.calls).toHaveLength(1);
      expect(error.mock.calls[0][0]).toMatch(/Warning: Failed prop type.+/);
    });
  });
};
