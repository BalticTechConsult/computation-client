# computation-client


## Environment
Environment variables are used only for testing purposes.
Copy the `.env.example` file to `.env` and fill in the values. Or set the environment variables manually.

### About the environment variables:

`SOCKET_PORT` - The port of the socket server

`SOCKET_PROTOCOL_VERSION` - 1 or 2, but protocols on the broker and the client must match, 2 is recommended

`SOCKET_PATH` - Socket broadcast path, must match the broker's path

`SOCKET_HOST` - The host of the broker to connect to
