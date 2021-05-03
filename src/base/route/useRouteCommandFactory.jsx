import { RouteCommand } from "./RouteCommand"
import { useODPRouter } from "./useODPRouter"

export function useRouteCommandFactory(external = false) {
    const odpRouter = useODPRouter(external)
    return (route) => {
        console.log("[*] RouteCommandFactory for route:", route)
        return RouteCommand.create({ router:odpRouter , route: route })
    }    
}