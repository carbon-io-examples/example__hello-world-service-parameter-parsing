var carbon = require('carbon-io')
var __     = carbon.fibers.__(module)
var o      = carbon.atom.o(module).main // Note the .main here since this is the main application 

/***************************************************************************************************
 * HelloService
 *
 * Hello-world example. 
 */
__(function() {
  module.exports = o({

    /***************************************************************************
     * _type
     */
    _type: carbon.carbond.Service,

    /***************************************************************************
     * description
     */
    description: "Advanced hello-world service.",
    
    /***************************************************************************
     * port
     */
    port: 8888,

    /***************************************************************************
     * endpoints
     */
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
