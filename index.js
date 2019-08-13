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



var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json()

var app = express();
app.use(bodyParser.json({
  type: function(req) {
    return 'json';
  }
}));
// app.use(jsonParser);
app.use(bodyParser.urlencoded({limit: '20mb', extended: true }));
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
    function getRndInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
    req.body.id = getRndInteger(1, 999);

    if(req.body.view_type) {
      req.body.local_filters = [
        {
          "infobox_type": req.body.view_type,
          "expanded": 0,
          "filters": [
            {
              "local_filter_id": getRndInteger(1000, 9999),
              "root_id": "",
              "set_account_id": 0,
              "filter_type": 0
            }
          ]
        }
      ]
      req.body.infobox_states = [
        {
          "infobox_type": req.body.view_type,
          "previewed": 0,
          "active": 0,
          "expanded": 0
        }
      ]
      req.body.created_date = Date.now();
      req.body.updated_date = Date.now();
    }
    res.send({
      data: [
        req.body
      ]
    });
    res.end();
});

var port = process.argv[2] || process.env.PORT

if (port) {
  app.listen(port)
} else {
  getPort({ port: 3000 }).then(function (port) {
    app.listen(port)
    console.log("Listening on port " + port );
  })
}

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
// })


// var port = process.argv[2] || process.env.PORT

// if (port) {
//   server.listen(port)
// } else {
//   getPort({ port: 3000 }).then(function (port) {
//     server.listen(port)
//   })
// }