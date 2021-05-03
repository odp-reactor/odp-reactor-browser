import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import PatternFilter from "../PatternFilter";
import mockKGCtx from "./mockKGCtx";
import mockUseFilter from "./mockFilterCtx";

configure({ adapter: new Adapter() }); //enzyme - react 16 hooks support

describe("<PatternFilter />", () => {
    it("renders without explode", () => {
        mockKGCtx();
        mockUseFilter();
        shallow(<PatternFilter />);
    });
});
