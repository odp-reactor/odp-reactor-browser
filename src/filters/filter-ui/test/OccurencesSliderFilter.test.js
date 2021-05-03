import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import OccurencesSliderFilter from "../OccurencesSliderFilter";
import mockKGCtx from "./mockKGCtx";

configure({ adapter: new Adapter() }); //enzyme - react 16 hooks support

describe("<OccurencesSliderFilter />", () => {
    it("renders without explode", () => {
        mockKGCtx();
        shallow(<OccurencesSliderFilter />);
    });
});
