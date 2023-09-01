import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {GeoAddressLookupBar} from "../GeoAddressLookupBar";

configure({ adapter: new Adapter() }); //enzyme - react 16 hooks support

describe("<GeoAddressLookupBar />", () => {
    it("renders without explode", () => {
        shallow(<GeoAddressLookupBar />);
    });
});
