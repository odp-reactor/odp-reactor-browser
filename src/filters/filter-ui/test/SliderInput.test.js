import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {SliderInput} from "../SliderInput";

configure({ adapter: new Adapter() }); //enzyme - react 16 hooks support

describe("<SliderInput />", () => {
    it("renders without explode", () => {
        shallow(<SliderInput />);
    });
});
