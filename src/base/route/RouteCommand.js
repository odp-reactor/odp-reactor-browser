export class RouteCommand {
    constructor(router, route) {
        this.router = router;
        this.route = route;
    }
    static create({ router, route }) {
        return new RouteCommand(router, route);
    }
    execute() {
        this.router.navigateTo(this.route);
    }
}

/*
    Concrete command implementing ICommand interface

    ICommand : 
        +execute

    * Command has dependency (composition) Receiver, Receiver is the object receiving command
    e.g. a Light    

    sometimes Receiver method is name action e.g.
    Light.powerOnAction

    * Invoker helds Command object and knows when to execute, in web context is the GUI Button
    e.g. Switch
    
    * Client helds all and decodes which receivers assign to commands
    and commands assign to invoker 

    imagine a Remote (the client) which once one of the button is clicked (the invoker)
    calls a command SwitchOnTvCommand (the command) which trigger Television (the receiver)
    to turn on (the action)

    this decouple invoker from the receiver, client from server: Command pattern encapsulates
    a request

    you may also imagine a Receiver enqueing commands, or validating them, or an Adapter in front
    of your television implementing GenericRemoteInterface, a GenericCommand, and the Adapter 
    translating from GenericCommand into specific models commands
*/
