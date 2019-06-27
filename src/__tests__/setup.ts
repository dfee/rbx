import * as Enzyme from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";

Enzyme.configure({
  adapter: new ReactSixteenAdapter(),
});
