# computation-client


## Environment
Environment variables are used only for testing purposes.

### About the environment variables:

`BROKER_ADDRESS` - The address of the broker to connect to

## CLI

### Commands

Examples:
`computation-client ping -a localhost:50051` - Pings the broker at the given address
`computation-client solve -a localhost:50051 solve -f <PATH TO JSON>` - Solves the given JSON file (task or optimization task) 

Run `computation-client help` for more information on the available commands.
Run `computation-client help <COMMAND>` for more information on a specific command.
