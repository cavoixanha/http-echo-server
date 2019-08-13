#!/usr/bin/env node
'use strict'

var getPort = require('get-port')
// var server = require('net').createServer()

// var cid = 0

// module.exports = server // for testing

// onEmit(server, { ignore: ['connection', 'listening', 'error'] }, function (eventName) {
//   console.log('[server] event:', eventName)
// })

// server.on('connection', function (c) {
//   var gotData = false
//   var _cid = ++cid

//   console.log('[server] event: connection (socket#%d)', _cid)

//   onEmit(c, { ignore: ['lookup', 'error'] }, function (eventName) {
//     console.log('[socket#%d] event:', _cid, eventName)
//   })

//   c.on('lookup', function (err, address, family) {
//     if (err) {
//       console.log('[socket#%d] event: lookup (error: %s)', _cid, err.message)
//     } else {
//       console.log('[socket#%d] event: lookup (address: %s, family: %s)', _cid, address, family)
//     }
//   })

//   c.on('data', function (chunk) {
//     console.log('--> ' + chunk.toString().split('\n').join('\n--> '))
//     if (!gotData) {
//       gotData = true
//       // c.write('HTTP/1.1 200 OK\r\n')
//       // c.write('Date: ' + (new Date()).toString() + '\r\n')
//       // c.write('Connection: close\r\n')
//       // c.write('Content-Type: text/plain\r\n')
//       // c.write('Access-Control-Allow-Origin: *\r\n')
//       // c.write('Access-Control-Request-Headers: *\r\n')
//       // c.write('Access-Control-Allow-Methods: *\r\n')
//       // c.write('Access-Control-Allow-Headers: *\r\n')
//       // c.write('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE\r\n')
//       // c.write('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, keyapi, content-type\r\n')
//       // c.write('\r\n')
//       c.writeHead(200, { 'Content-Type': 'application/json' });
//       setTimeout(function () {
//         c.end()
//       }, 2000)
//     }
//     c.write(chunk.toString())
//   })

//   c.on('error', function (err) {
//     console.log('[socket#%d] event: error (msg: %s)', _cid, err.message)
//   })
// })

// server.on('listening', function () {
//   var port = server.address().port
//   console.log('[server] event: listening (port: %d)', port)
// })

// server.on('error', function (err) {
//   console.log('[server] event: error (msg: %s)', err.message)
// })

// var port = process.argv[2] || process.env.PORT

// if (port) {
//   server.listen(port)
// } else {
//   getPort({ port: 3000 }).then(function (port) {
//     server.listen(port)
//   })
// }

// function onEmit (emitter, opts, cb) {
//   var emitFn = emitter.emit
//   emitter.emit = function (eventName) {
//     if (opts.ignore.indexOf(eventName) === -1) cb.apply(null, arguments)
//     return emitFn.apply(emitter, arguments)
//   }
// }
/*
  Response header info:
  Access-Control-Allow-Origin:*
  Content-Type:text/json
  X-Powered-By:nodejs
*/

// var http  = require('http');
// var fs    = require('fs');
// var port  = "3000" ;
// const express = require('express')
//       // cors = require('cors'),
//       // morgan = require('morgan'),
//       // cookieParser = require('cookie-parser'),
//       bodyParser = require('body-parser'),

// http.createServer(function(request, response) {

//     response.writeHead(200, {
//         'Content-Type': 'text/json',
//         'Access-Control-Allow-Origin': '*',
//         'X-Powered-By':'nodejs'
//     });


//     // fs.readFile('data.json', function(err, content){
//     //     response.write(content);
//     //     response.end();
//     // });
//     console.log(request.body);
//     response.write(request.body);
//     response.end();

// }).listen(port);

// console.log("Listening on port " + port );



// var http = require('http');
// var express = require('express');
// var http = require('http');
// var bodyParser = require('body-parser');

// var app = express();
// var jsonParser = bodyParser.json()
// app.use(bodyParser.text({
//   type: function(req) {
//     return 'text';
//   }
// }));















var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json()

var app = express();
// app.use(bodyParser.text({
//   type: function(req) {
//     return 'text';
//   }
// }));
app.use(jsonParser);
// log info about ALL requests to ALL paths
app.all('*', function (req, res, next) {
    console.log('*** A request ***');
    console.log('method: ' + req.method);
    console.log('url: ' + req.url);
    console.log('*****************');

    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE');
    res.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, keyapi, content-type');
 
    // next();
    // res.writeHead(200, {
    //     'Content-Type': 'text/json',
    //     'Access-Control-Allow-Origin': '*',
    //     'X-Powered-By':'nodejs',
    //     'Access-Control-Allow-Methods': '*',
    //     'Access-Control-Allow-Headers': '*'
    // });
    // req.pipe(res);
    // console.log(res);
    res.send({
      data: req.body
    });
    res.end();
});

// var bodyParser = require('body-parser')
 
// create application/json parser
// var jsonParser = bodyParser.json()
 
// var server = http.createServer(function(request,response){
 
//   response.writeHead(200, {
//       'Content-Type': 'text/json',
//       'Access-Control-Allow-Origin': '*',
//       'X-Powered-By':'nodejs',
//       'Access-Control-Allow-Methods': '*',
//       'Access-Control-Allow-Headers': '*'
//   });
//   request.pipe(response);
//   console.log(response);
// })//.listen(port);


// var port = process.argv[2] || process.env.PORT

// if (port) {
//   server.listen(port)
// } else {
//   getPort({ port: 3000 }).then(function (port) {
//     server.listen(port)
//   })
// }

var port = process.argv[2] || process.env.PORT

if (port) {
  app.listen(port)
} else {
  getPort({ port: 3000 }).then(function (port) {
    app.listen(port)
  })
}