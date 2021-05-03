import { useHistory } from "react-router-dom";
import { ODPRouter } from "./ODPRouter"
import { WindowAdapter } from "./WindowAdapter"

export function useODPRouter(external = false) {
    const history = useHistory();
    // we're committing to react router history interface, we should instead
    // create an history manager consuming history, implementing .push .back etc.
    // 
    // consider to change this if you need more history manipulation
    // here we're passing to history in one case 'history' in another case
    // 'window' adapter implementing history interface, but they are two slightly
    // different object. You should pass a HistoryManager, that calls push, in 
    // client side same origin navigation with reactor history, else with normal window 
    // browser object
    return ODPRouter.create({
        history: external ? new WindowAdapter() : history,
    });
}