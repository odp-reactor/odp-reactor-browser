import * as AlertCtx from "../../../base/alert/ctx/useAlertCtx";

export default function mockAlertCtx() {
    const mockedKGCtx = {};
    jest.spyOn(AlertCtx, "useAlertCtx").mockImplementation(() => mockedKGCtx);
}
