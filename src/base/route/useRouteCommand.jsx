import { RouteCommand } from "./RouteCommand"
import { useODPRouter } from "./useODPRouter"

export function useRouteCommand(route) {
    const odpRouter = useODPRouter()
    return RouteCommand.create({ router:odpRouter , route: route })
}