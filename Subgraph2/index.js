const Fastify = require('fastify')
const { mercuriusFederationPlugin } = require('@mercuriusjs/federation')

const app = Fastify()
const schema = `
  extend type User @key(fields: "id") {
    id: ID! @external
    friends: PageOfUser
  }

  type PageOfUser {
    nodes: [User]
  }
`

const resolvers = {
  User: {
    __resolveReference: (source, args, context, info) => {
      return { id: source.id }
    },
    friends: () => {
        console.log("FRIENDS RESOLVER")
        return ({ nodes: [{ id: 0 }, { id: 1 }] } )
    }
  }
}

app.register(mercuriusFederationPlugin, {
  ide: true,
  schema,
  resolvers
})

app.get('/', async function (req, reply) {
  const query = '{ _service { sdl } }'
  return app.graphql(query)
})

app.listen({ port: 3002 })