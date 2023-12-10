const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');

app.use(cors());


const httpServer = http.createServer(app); // create a http server
const io = new Server(httpServer, { // create a socket io server
    cors: { // cors configuration
        origin: 'http://localhost:54321', // where the react app is hosted
        methods: ['GET', 'POST'] // allowed methods
    }
});

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('disconnect', () => {
        console.log(socket.id + ' disconnected');
    }); 
});

httpServer.listen(54321, () => {
    console.log('server started!')
});