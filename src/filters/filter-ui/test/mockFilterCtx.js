import * as useFilter from "../../ctx/useFilter";

export default function mockUseFilter() {
    const mockedUseFilter = () => {
        return {
            filter: undefined,
            setFilterOptions: () => {},
            setInvertedFilterState: () => {},
            useResetFilter: () => {},
        };
    };
    jest.spyOn(useFilter, "default").mockImplementation(mockedUseFilter);
}
