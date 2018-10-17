'use strict';

const Hapi=require('hapi');
const fs = require('fs')
const path = require('path')
const am = require('./am')

// Create a server with a host and port
const tls = {
  key: fs.readFileSync(path.join(__dirname, 'www.test.com.key')),
  cert: fs.readFileSync(path.join(__dirname, 'www.test.com.crt'))
}

const option = { host:'localhost', port:'8088' }
const server=Hapi.server(option);

// Add the route
server.route({
    method:'GET',
    path:'/hello',
    handler: async (request,h) => {
        console.log(await am.getConsumer())
        return { 'heel': '123' };
    }
});

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();