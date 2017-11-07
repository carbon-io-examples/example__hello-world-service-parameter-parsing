# Hello Service (parameter parsing)

This example is a more elaborate version of [our original hello-world example](https://github.com/carbon-io/example__hello-world-service)
that illustrates the use of parameter and response definitions. 

The code defining the service is located in ```lib/HelloService.js```
and uses a simple ```Endpoint``` object to implement an HTTP ```GET```
at the path ```/hello```. 

Recall that our [original, bare-bones hello-world service](https://github.com/carbon-io/example__hello-world-service) looked like this:

```node
__(function() {
  module.exports = o({
    _type: carbon.carbond.Service,
    port: 8888,
    endpoints : {
      hello: o({
        _type: carbon.carbond.Endpoint,
        get: function(req, res) {
          return { msg: "Hello world!" }
        }
      })
    }
  })
})
```

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
              location: 'query', // one of 'path', 'query', 'header', or 'body'
              required: false,
              default: 'world',
              schema: { type: 'string' } // drives parsing and validation (which can also help prevent injection attacks)
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
$ git clone -b carbon-0.7 -b carbon-0.7 git@github.com:carbon-io-examples/example__hello-world-service-parameter-parsing.git
$ cd example__hello-world-service-parameter-parsing
$ npm install
```

## Running the service

To run the service:

```sh
$ node lib/HelloService
```

For cmdline help:

```sh
$ node lib/HelloService -h
```

## Accessing the service

To access the ```/hello``` endpoint:

```
$ curl localhost:8888/hello 
{ msg: "Hello world!" }

$ curl localhost:8888/hello?who=Addison
{ msg: "Hello Addison!" }
```

## Running the unit tests

This example comes with a simple unit test written in Carbon.io's test framework called TestTube. It is located in the ```test``` directory. 

```
$ node test/HelloServiceTest
```

or 

```
$ npm test
```

## Generating API documentation (aglio flavor)

```sh
$ node lib/HelloService gen-static-docs --flavor aglio --out docs/index.html
```

* [View current documentation](
http://htmlpreview.github.io/?https://raw.githubusercontent.com/carbon-io/example__hello-world-service-parameter-parsing/master/docs/index.html)
