# Hello Service (advanced)

This example illustrates the use of Carbon.io to implement
a more ellaborate version of [our hello-world example](https://github.com/carbon-io/example__hello-world-service). 

The code defining the service is located in ```lib/HelloService.js```
and uses a simple ```Endpoint``` object to implement an HTTP ```GET```
at the path ```/hello```. 

This example illustrates formally defining the parameters taken and responses returned by our ```hello``` endpoint.  

```javascript
__(function() {
  module.exports = o({
    _type: carbon.carbond.Service,
    port: 8888,
    endpoints : {
      hello: o({
        _type: carbon.carbond.Endpoint,

        get: {
          parameters: { 
            who: {
              location: 'query',
              required: false,
              default: 'world',
              schema: { type: 'string' }
            }
          },
          responses: [
            {
              statusCode: 200,
              description: "Success",
              schema: {
                type: 'object',
                properties: {
                  msg: { type: 'string' }
                },
                required: [ 'msg' ],
                additionalProperties: false
              }
            }
          ],
          
          service: function(req, res) {
            return { msg: `Hello ${req.parameters.who}!` }
          }
        }
      })
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

% curl localhost:888/hello?who=Addison
{ msg: "Hello Addison!" }
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

