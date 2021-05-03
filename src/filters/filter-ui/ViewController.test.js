import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import ViewController from "./ViewController";

configure({ adapter: new Adapter() }); //enzyme - react 16 hooks support

describe("<ViewController />", () => {
    it("renders without explode", () => {
        shallow(<ViewController />);
    });
});
