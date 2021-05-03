import * as KGCtx from "../../../knowledgegraph/ctx/useKGCtx";
import { KnowledgeGraph } from "../../../knowledgegraph/KnowledgeGraph";

export default function mockKGCtx() {
    const mockedKGCtx = { knowledgeGraph: KnowledgeGraph.create() };
    jest.spyOn(KGCtx, "useKGCtx").mockImplementation(() => mockedKGCtx);
}
