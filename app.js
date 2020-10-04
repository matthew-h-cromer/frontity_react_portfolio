// Found this in support article on how to deploy to Cpanel.
// The true server file is ./build/server.js
var frontity = require("./build/server").default;
var http = require("http");
var server = http.createServer(frontity);
server.listen();
