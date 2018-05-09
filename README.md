#README
This is the frontend web server (express) project for Fight Club.

To run it:
```
npm install
cd public
npm install
cd ..
npm start
```

#Environment Variables
This frontend is a User Interface for the Fight Club application. Environment variables are used to direct this UI to communicate with a specified Fight Club application server using the following env vars:
- GAME_SERVER_HOST
- GAME_SERVER_PROTOCOL
- GAME_SERVER_PORT
- GAME_SERVER_CONNECTION_METHOD
Example
```
GAME_SERVER_HOST: url.to.my.host
GAME_SERVER_PROTOCOL: http
GAME_SERVER_PORT: 3000
GAME_SERVER_CONNECTION_METHOD: poll
```

Tip: If you are running a container to host this express server, you can use the -e option to inject these environment variables.