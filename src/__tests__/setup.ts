import * as Enzyme from "enzyme";
// tslint:disable-next-line:import-name
import ReactSixteenAdapter from "enzyme-adapter-react-16";

Enzyme.configure({
  adapter: new ReactSixteenAdapter(),
});
