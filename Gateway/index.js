
const Fastify = require('fastify')
const mercuriusGateway = require('@mercuriusjs/gateway')

const gateway = Fastify()
gateway.register(mercuriusGateway, {
    ide: true,
  gateway: {
    services: [
      {
        name: 'user',
        url: 'http://localhost:3001/graphql'
      },
      {
        name: 'friends',
        url: 'http://localhost:3002/graphql'
      }
    ]
  }
})

gateway.listen({ port: 3000 })