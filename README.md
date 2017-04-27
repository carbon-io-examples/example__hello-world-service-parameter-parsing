# Hello Service (advanced)

This example builds on our hello world examples:

* [Our simple hello-world example](https://github.com/carbon-io/example__hello-world-service)
* [Our advanced hello-world example](https://github.com/carbon-io/example__hello-world-service-advanced)

This example illustrates:
* how to build services with multiple endpoints using multiple modules / source files
* how to interact with MongoDB 
* the use of exceptions for communicating HTTP errors to the client
* the use of path parameters
* the use of environment variables

The code defining the top level service is located in ```lib/HelloService.js```. This service has two 
endpoints, each of which is defined in its own module. 

The top-level service:

```javascript
__(function() {
  module.exports = o({
    _type: carbon.carbond.Service,
    description: "Advanced hello-world service using MongoDB.",
    port: 8888,
    dbUri: _o('env:MONGODB_URI') || "mongodb://localhost:27017/hello-world",
    defaultLocale: _o('env:LOCALE') || "en",
    endpoints : {
      hello: _o('./HelloEndpoint'),
      greetings: _o('./GreetingsEndpoint')
    }
  })
})

```

## Installing the service

We encourage you to clone the git repository so you can play around
with the code. 

```
% git clone git@github.com:carbon-io/example__hello-world-service-advanced.git
% cd example__hello-world-service-advanced
% npm install
```

## Running the service

To run the service:

```sh
% node lib/HelloService
```

For cmdline help:

```sh
% node lib/HelloService -h
```

To access the ```/hello``` endpoint:

```
% curl localhost:888/hello 
{ msg: "Hello world!" }

% curl localhost:888/hello?locale=es
{ msg: "Hola mundo!" }
```
To access the ```/greetings``` endpoint:

```
% curl localhost:888/greetings 
{"en":"Hello world!","fr":"Bonjour le monde!","es":"Hola mundo!"}
```


## Running the unit tests

This example comes with a simple unit test written in Carbon.io's test framework called TestTube. It is located in the ```test``` directory. 

```
% node test/HelloServiceTest
```

or 

```
% npm test
```

